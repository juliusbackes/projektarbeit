import { Graph } from "$lib/graph";

const graph = new Graph();

graph.addMultipleVertices(["A", "B", "C", "D", "E"]);

graph.addMultipleEdges([["A", "B"], ["A", "C"], ["B", "C"], ["C", "D"], ["C", "E"]]);

graph.addMultipleColors([0, 1, 2, 3, 4]);

console.log(graph.getColoring());

