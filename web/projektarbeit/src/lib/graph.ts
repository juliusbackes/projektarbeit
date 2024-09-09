export class Vertex {
    label: string | number;
    connections: Vertex[] = [];

    constructor(label: string | number, connections?: Vertex[]) {
        this.label = label;
        if (connections) {
            if (connections.some(conn => conn.label === this.label)) {
                throw new Error("Cannot connect a vertex to itself");
            }
            this.connections = connections;
        }
    }

    toString(): string {
        if (this.connections.length === 0) {
            return `${this.label} (No connections)`;
        }

        const connectionsStr = this.connections.map(v => v.label).join(", ");
        return `${this.label}: ${connectionsStr}`;
    }

    addConnection(vertex: Vertex): void {
        if (this.connections.some(conn => conn.label === vertex.label)) {
            throw new Error("Cannot connect a vertex to itself or duplicate connection");
        }
        this.connections.push(vertex);
    }

    removeConnection(vertexOrLabel: Vertex | string | number): void {
        const labelToRemove = vertexOrLabel instanceof Vertex ? vertexOrLabel.label : vertexOrLabel;
        const index = this.connections.findIndex(conn => conn.label === labelToRemove);
        
        if (index === -1) {
            throw new Error("The given vertex is not connected to this vertex");
        }
        
        this.connections.splice(index, 1);
    }

    setConnections(connections: Vertex[]): void {
        if (connections.some(conn => conn.label === this.label)) {
            throw new Error("Cannot connect a vertex to itself");
        }
        this.connections = connections;
    }
}

export class Graph {
    graph: Map<string, string[]> = new Map();
    coloring: Map<string, string | number> = new Map();

    toString(): string {
        if (this.graph.size === 0) {
            return "Empty Graph";
        }

        return Array.from(this.graph.entries())
            .map(([vertex, edges]) => `${vertex}: ${edges.join(", ")}`)
            .join("\n");
    }

    addVertex(vertex: string): void {
        if (this.graph.has(vertex)) {
            throw new Error("Vertex already exists in the graph");
        }
        this.graph.set(vertex, []);
    }

    removeVertex(vertex: string): void {
        if (!this.graph.has(vertex)) {
            throw new Error("Vertex not found in the graph");
        }
        this.graph.delete(vertex);
        for (const [v, edges] of this.graph) {
            this.graph.set(v, edges.filter(edge => edge !== vertex));
        }
    }

    addEdge(a: string, b: string): void {
        if (!this.graph.has(a) || !this.graph.has(b)) {
            throw new Error(`One or both vertices not found in the graph | a: ${a}, b: ${b}`);
        }
        if (a === b) {
            throw new Error("Cannot connect a vertex to itself");
        }
        this.graph.get(a)?.push(b);
        this.graph.get(b)?.push(a);
    }

    removeEdge(a: string, b: string): void {
        if (!this.graph.has(a) || !this.graph.has(b)) {
            throw new Error(`One or both vertices not found in the graph | a: ${a}, b: ${b}`);
        }
        this.graph.set(a, this.graph.get(a)?.filter(edge => edge !== b) || []);
        this.graph.set(b, this.graph.get(b)?.filter(edge => edge !== a) || []);
    }

    color(vertex: string, color: string | number): void {
        this.coloring.set(vertex, color);
    };

    calculateChromaticNumber(): number {
        const sortedGraph = this.sortGraph();
        const availableColors = new Map<string, number[]>(
            Array.from(sortedGraph.keys()).map(vertex => [vertex, Array.from({ length: sortedGraph.size }, (_, i) => i + 1)])
        );

        for (const [vertex, neighbors] of sortedGraph) {
            const color = Math.min(...(availableColors.get(vertex) || []));
            this.color(vertex, color);

            neighbors.forEach(neighbor => {
                const neighborColors = availableColors.get(neighbor) || [];
                const index = neighborColors.indexOf(color);
                if (index !== -1) {
                    neighborColors.splice(index, 1);
                }
            });
        }

        const usedColors = new Set(this.coloring.values());
        return usedColors.size;
    }

    private sortGraph(): Map<string, string[]> {
        return new Map(
            Array.from(this.graph.entries())
                .sort((a, b) => b[1].length - a[1].length)
        );
    }
}
