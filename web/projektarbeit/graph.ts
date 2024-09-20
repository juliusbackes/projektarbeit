export class Graph {
    graph = new Map<string | number, (number | string)[]>()

    addVertex(v: string | number) {
        this.graph.set(v, [])
    };

    removeVertex(v: string | number) {
        this.graph.delete(v);
    }

    addEdge(a: string | number, b: string | number) {
        this.graph.set(a, )
        this.graph[b].push(a)
    }
}

const g = new Graph();
g.addVertex("a")
g.addVertex("b")

console.log(g.graph)