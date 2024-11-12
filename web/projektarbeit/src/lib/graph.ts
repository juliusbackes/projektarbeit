/**
 * @class Graph class
 * @description The Graph class is a simple implementation of a graph using an adjacency list.
 */
export class Graph {
    graph: Map<string, string[]> = new Map();
    coloring: Map<string, number> = new Map();
    colors: number[] = [];

    addVertex(v: string): void {
        if (this.graph.has(v)) {
            throw new Error("Vertex already exists in the graph");
        };
        this.graph.set(v, []);
    };

    addMultipleVertices(vertices: string[]): void {
        vertices.forEach(v => this.addVertex(v));
    };

    removeVertex(v: string): void {
        if (!this.graph.has(v)) {
            throw new Error("Vertex not found in the graph");
        };
        this.graph.forEach((_, vertex) => {
            this.removeEdge(vertex, v);
        });
        this.graph.delete(v);
    };

    removeMultipleVertices(vertices: string[]): void {
        vertices.forEach(v => this.removeVertex(v));
    };

    addEdge(v1: string, v2: string): void {
        if (!this.graph.has(v1) || !this.graph.has(v2)) {
            throw new Error(`One or both vertices not found in the graph`);
        };
        this.graph.get(v1)?.push(v2);
        this.graph.get(v2)?.push(v1);
    };

    addMultipleEdges(edges: [string, string][]): void {
        edges.forEach(([v1, v2]) => this.addEdge(v1, v2));
    };

    removeEdge(v1: string, v2: string): void {
        if (!this.graph.has(v1) || !this.graph.has(v2)) {
            throw new Error(`One or both vertices not found in the graph`);
        };
        this.graph.get(v1)?.splice(this.graph.get(v1)?.indexOf(v2) ?? 0, 1);
        this.graph.get(v2)?.splice(this.graph.get(v2)?.indexOf(v1) ?? 0, 1);
    };

    removeMultipleEdges(edges: [string, string][]): void {
        edges.forEach(([v1, v2]) => this.removeEdge(v1, v2));
    };

    /**
     * Colors the graph using the dsatur (degree saturation) algorithm.
    */
    private color(): void {
        /*
    while (!this.allVerticesColored()) {
        const uncolored = this.getUncoloredVertices();
        
        let chosenVertex = this.getMaxSaturationVertex(uncolored);
        
        if (chosenVertex.length > 1) {
            chosenVertex = this.getMaxDegreeVertex(uncolored);
            
            if (chosenVertex.length > 1) {
                chosenVertex = this.getRandomVertex(uncolored);
            };
        }:

        const lowestColor = this.getLowestAvailableColor(this.colors);
        
        this.coloring.set(chosenVertex, lowestColor);
    }
        **/
    };

    /**
     * Runs the coloring algorithm and returns the coloring of the graph.
     */
    getColoring(): Map<string, number> {
        this.color();
        return this.coloring;
    };
};
