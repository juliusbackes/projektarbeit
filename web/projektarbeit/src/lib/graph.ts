import { convertDayIndex, createColorToWeek, createWeekLoad, getCourseType } from '$lib/utils';

/**
 * @class Graph class
 * @description The Graph class for the "projektarbeit" is a simple implementation of a graph using an adjacency list.
 */
export class Graph {
	graph: Map<string, string[]> = new Map();
	coloring: Map<string, Date> = new Map();
	colors: Set<Date> = new Set();
	colorToWeekday: Map<Date, number> = new Map();
	vertexToWeekdays: Map<string, number[]> = new Map();
	colorToWeek: Map<Date, number> = new Map();
	weekLoad: Map<number, number> = new Map();

	getAllVertices(): string[] {
		return Array.from(this.graph.keys());
	}

	addVertex(v: string): void {
		if (this.graph.has(v)) {
			throw new Error('Vertex already exists in the graph');
		}
		this.graph.set(v, []);
	}

	addMultipleVertices(vertices: string[]): void {
		vertices.forEach((v) => this.addVertex(v));
	}

	removeVertex(v: string): void {
		if (!this.graph.has(v)) {
			throw new Error('Vertex not found in the graph');
		}
		this.graph.forEach((_, vertex) => {
			this.removeEdge(vertex, v);
		});
		this.graph.delete(v);
	}

	removeMultipleVertices(vertices: string[]): void {
		vertices.forEach((v) => this.removeVertex(v));
	}

	addEdge(v1: string, v2: string): void {
		if (!this.graph.has(v1) || !this.graph.has(v2)) {
			throw new Error(`One or both vertices not found in the graph: ${v1} ${v2}`);
		}
		this.graph.get(v1)?.push(v2);
		this.graph.get(v2)?.push(v1);
	}

	addMultipleEdges(edges: [string, string][]): void {
		edges.forEach(([v1, v2]) => this.addEdge(v1, v2));
	}

	addMultipleEdgesToVertex(v: string, edges: string[]): void {
		edges.forEach((v2) => this.addEdge(v, v2));
	}

	removeEdge(v1: string, v2: string): void {
		if (!this.graph.has(v1) || !this.graph.has(v2)) {
			throw new Error(`One or both vertices not found in the graph`);
		}
		this.graph.get(v1)?.splice(this.graph.get(v1)?.indexOf(v2) ?? 0, 1);
		this.graph.get(v2)?.splice(this.graph.get(v2)?.indexOf(v1) ?? 0, 1);
	}

	removeMultipleEdges(edges: [string, string][]): void {
		edges.forEach(([v1, v2]) => this.removeEdge(v1, v2));
	}

	addColor(color: Date): void {
		this.colors.add(color);
	}

	addMultipleColors(colors: Date[]): void {
		colors.forEach((color) => this.addColor(color));
	}

	private allVerticesColored(): boolean {
		return this.graph.size === this.coloring.size;
	}

	private getUncoloredVertices(): string[] {
		return Array.from(this.graph.keys()).filter((v) => !this.coloring.has(v));
	}

	private getNeighbors(v: string): string[] {
		return this.graph.get(v) ?? [];
	}

	private getSaturation(v: string): number {
		const neighbors = this.getNeighbors(v);
		const neighborColors = new Set<Date>();

		neighbors.forEach((neighbor) => {
			const color = this.coloring.get(neighbor);
			if (color) {
				neighborColors.add(color);
			}
		});

		return neighborColors.size;
	}

	private getMaxSaturationVertex(vertices: string[]): string[] {
		const saturations = vertices.map((v) => ({ vertex: v, saturation: this.getSaturation(v) }));
		const maxSaturation = Math.max(...saturations.map(({ saturation }) => saturation));
		return saturations
			.filter(({ saturation }) => saturation === maxSaturation)
			.map(({ vertex }) => vertex);
	}

	private getMaxDegreeVertex(vertices: string[]): string[] {
		const degrees = vertices.map((v) => ({ vertex: v, degree: this.getNeighbors(v).length }));
		const maxDegree = Math.max(...degrees.map(({ degree }) => degree));
		return degrees.filter(({ degree }) => degree === maxDegree).map(({ vertex }) => vertex);
	}

	private getRandomVertex(vertices: string[]): string {
		if (vertices.length === 0) {
			throw new Error('The vertices array is empty');
		}
		return vertices[Math.floor(Math.random() * vertices.length)];
	}

	private getNeighborColors(vertex: string): Set<Date> {
		const neighborColors = new Set<Date>();
		this.getNeighbors(vertex).forEach((neighbor) => {
			const color = this.coloring.get(neighbor);
			if (color !== undefined) {
				neighborColors.add(color);
			}
		});
		return neighborColors;
	}

	private filterValidColors(availableColors: Date[], vertex: string): Date[] {
		return availableColors.filter((color) => {
			const colorWeekday = this.colorToWeekday.get(color) || convertDayIndex(color.getDay());
			const vertexWeekdays = this.vertexToWeekdays.get(vertex);

			if (colorWeekday === undefined || vertexWeekdays === undefined) {
				return false;
			}

			return vertexWeekdays.includes(colorWeekday);
		});
	}

	private getBestAvailableColor(vertex: string): Date {
		if (this.colors.size === 0) {
			throw new Error('No colors available');
		}

		const neighborColors = this.getNeighborColors(vertex);
		const availableColors = Array.from(this.colors.difference(neighborColors));
		const validColors = this.filterValidColors(availableColors, vertex);

		if (validColors.length === 0) {
			throw new Error(`No valid colors available for vertex ${vertex}`);
		}

		// Find the color with the lowest score
		let bestColor = validColors[0];
		let bestScore = Infinity;

		const is2xHJFirst = vertex.endsWith('$$1');
		const is2xHJSecond = vertex.endsWith('$$2');

		for (const color of validColors) {
			const week = this.colorToWeek.get(color);
			if (week === undefined) continue;

			const weekLoad = this.weekLoad.get(week) || 0;
			const conflicts = this.countAdjacentConflictsInWeek(vertex, week);

			let score: number;
			if (is2xHJFirst) {
				const WEEK_WEIGHT = 1000;
				score = weekLoad * 10 + conflicts * 100 + week * WEEK_WEIGHT;
			} else if (is2xHJSecond) {
				const WEEK_WEIGHT = 1000;
				score = weekLoad * 10 + conflicts * 100 - week * WEEK_WEIGHT;
			} else {
				score = weekLoad * 10 + conflicts * 100;
			}

			if (score < bestScore) {
				bestScore = score;
				bestColor = color;
			}
		}

		const chosenWeek = this.colorToWeek.get(bestColor);
		if (chosenWeek !== undefined) {
			const currentLoad = this.weekLoad.get(chosenWeek) || 0;
			this.weekLoad.set(chosenWeek, currentLoad + 1);
		}

		return bestColor;
	}

	private countAdjacentConflictsInWeek(vertex: string, week: number): number {
		let conflicts = 0;
		const neighbors = this.getNeighbors(vertex);

		for (const neighbor of neighbors) {
			const neighborColor = this.coloring.get(neighbor);
			if (neighborColor && this.colorToWeek.get(neighborColor) === week) {
				conflicts++;
			}
		}

		return conflicts;
	}

	/**
	 * Colors the graph using the dsatur (degree saturation) algorithm.
	 */
	private color(): void {
		this.colorToWeek = createColorToWeek(this.colors);
		this.weekLoad = createWeekLoad(this.colorToWeek);

		const phases = [
			() => this.getUncoloredVertices().filter((v) => getCourseType(v) === 1),
			() => this.getUncoloredVertices().filter((v) => getCourseType(v) === 2),
			() => this.getUncoloredVertices().filter((v) => getCourseType(v) === 0)
		];

		for (const getPhaseVertices of phases) {
			let vertices = getPhaseVertices();

			while (vertices.length > 0) {
				let chosenVertex: string | string[] = this.getMaxSaturationVertex(vertices);

				if (chosenVertex.length > 1) {
					chosenVertex = this.getMaxDegreeVertex(vertices);

					if (chosenVertex.length > 1) {
						chosenVertex = this.getRandomVertex(vertices);
					}
				}

				if (Array.isArray(chosenVertex)) {
					chosenVertex = chosenVertex[0];
				}

				const bestColor = this.getBestAvailableColor(chosenVertex);
				this.coloring.set(chosenVertex, bestColor);

				// Update vertices for next iteration
				vertices = getPhaseVertices();
			}
		}
	}

	/**
	 * Runs the coloring algorithm and returns the coloring of the graph.
	 */
	getColoring(): Map<string, Date> {
		this.color();
		return this.coloring;
	}

	toJSON() {
		return {
			graph: Array.from(this.graph.entries()),
			coloring: Array.from(this.coloring.entries()).map(([key, date]) => [key, date.getTime()]),
			colors: Array.from(this.colors).map((date) => date.getTime()),
			colorToWeekday: Array.from(this.colorToWeekday.entries()).map(([date, weekday]) => [
				date.getTime(),
				weekday
			]),
			vertexToWeekdays: Array.from(this.vertexToWeekdays.entries())
		};
	}

	static fromJSON(json: any): Graph {
		const graph = new Graph();

		graph.graph = new Map(json.graph);

		graph.coloring = new Map(
			json.coloring.map(([key, timestamp]: [string, number]) => [key, new Date(timestamp)])
		);

		graph.colors = new Set(json.colors.map((timestamp: number) => new Date(timestamp)));

		graph.colorToWeekday = new Map(
			json.colorToWeekday.map(([timestamp, weekday]: [number, number]) => [
				new Date(timestamp),
				weekday
			])
		);

		graph.vertexToWeekdays = new Map(json.vertexToWeekdays);

		return graph;
	}
}
