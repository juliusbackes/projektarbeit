/**
 * @class Graph class
 * @description The Graph class for the "projektarbeit" is a simple implementation of a graph using an adjacency list.
 */
export class Graph {
	graph: Map<string, string[]> = new Map();
	coloring: Map<string, Date> = new Map();
	colors: Set<Date> = new Set(); // Set of dates representing the colors (format: Unix timestamp in milliseconds)
	colorToWeekday: Map<Date, number> = new Map(); // Map of colors to weekdays (0 = Monday, 6 = Sunday)
	vertexToWeekdays: Map<string, number[]> = new Map(); // Map of vertices to weekdays (0 = Monday, 6 = Sunday)
	
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
		
		neighbors.forEach(neighbor => {
			const color = this.coloring.get(neighbor);
			if (color) {
				neighborColors.add(color);
			}
		});
		
		return neighborColors.size;
	}

	private getMaxSaturationVertex(vertices: string[]): string[] {
		const saturations = vertices.map(v => ({ vertex: v, saturation: this.getSaturation(v) }));
		const maxSaturation = Math.max(...saturations.map(({ saturation }) => saturation));
		return saturations
			.filter(({ saturation }) => saturation === maxSaturation)
			.map(({ vertex }) => vertex);
	}

	private getMaxDegreeVertex(vertices: string[]): string[] {
		const degrees = vertices.map(v => ({ vertex: v, degree: this.getNeighbors(v).length }));
		const maxDegree = Math.max(...degrees.map(({ degree }) => degree));
		return degrees
			.filter(({ degree }) => degree === maxDegree)
			.map(({ vertex }) => vertex);
	}

	private getRandomVertex(vertices: string[]): string {
		if (vertices.length === 0) {
			throw new Error("The vertices array is empty");
		}
		return vertices[Math.floor(Math.random() * vertices.length)];
	}

	private getLowestAvailableColor(vertex: string): Date {
		if (this.colors.size === 0) {
			throw new Error("No colors available");
		}
		
		const neighborColors = new Set<Date>();
		this.getNeighbors(vertex).forEach(neighbor => {
			const color = this.coloring.get(neighbor);
			if (color !== undefined) {
				neighborColors.add(color);
			}
		});
		
		const availableColors = this.colors.difference(neighborColors);

		for (const color of availableColors) {
			const colorWeekday = this.colorToWeekday.get(color);
			const vertexWeekdays = this.vertexToWeekdays.get(vertex);

			if (colorWeekday === undefined || vertexWeekdays === undefined) {
				throw new Error(`Color or vertex weekdays not found: ${colorWeekday} ${vertexWeekdays} ${vertex}`);
			}

			if (!vertexWeekdays.includes(colorWeekday)) {
				availableColors.delete(color);
			}
		}

		return availableColors.values().next().value; // Return earliest date
	}

	/**
	 * Colors the graph using the dsatur (degree saturation) algorithm.
	 */
	private color(): void {
    	while (!this.allVerticesColored()) {
        	const uncolored = this.getUncoloredVertices();
        
			let chosenVertex: string | string[] = this.getMaxSaturationVertex(uncolored);
        
			if (chosenVertex.length > 1) {
				chosenVertex = this.getMaxDegreeVertex(uncolored);

				if (chosenVertex.length > 1) {
					chosenVertex = this.getRandomVertex(uncolored);

				};
			};

			if (Array.isArray(chosenVertex)) {
				chosenVertex = chosenVertex[0];
			};

			const lowestColor = this.getLowestAvailableColor(chosenVertex);

			this.coloring.set(chosenVertex, lowestColor);
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
			colors: Array.from(this.colors).map(date => date.getTime()),
			colorToWeekday: Array.from(this.colorToWeekday.entries()).map(([date, weekday]) => [date.getTime(), weekday]),
			vertexToWeekdays: Array.from(this.vertexToWeekdays.entries())
		};
	}

	static fromJSON(json: any): Graph {
		const graph = new Graph();
		
		// Restore graph
		graph.graph = new Map(json.graph);
		
		// Restore coloring
		graph.coloring = new Map(
			json.coloring.map(([key, timestamp]: [string, number]) => [key, new Date(timestamp)])
		);
		
		// Restore colors
		graph.colors = new Set(
			json.colors.map((timestamp: number) => new Date(timestamp))
		);
		
		// Restore colorToWeekday
		graph.colorToWeekday = new Map(
			json.colorToWeekday.map(([timestamp, weekday]: [number, number]) => [new Date(timestamp), weekday])
		);
		
		// Restore vertexToWeekdays
		graph.vertexToWeekdays = new Map(json.vertexToWeekdays);
		
		return graph;
	}
}
