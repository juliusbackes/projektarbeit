import { Graph } from "$lib/graph";

const graph = new Graph();

graph.addMultipleVertices(["A", "B", "C", "D", "E"]);

graph.addMultipleEdges([["A", "B"], ["A", "C"], ["B", "C"], ["C", "D"], ["C", "E"]]);

graph.removeMultipleVertices(["A", "E"]);




console.log(graph.graph);