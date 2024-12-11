// import { Graph } from "$lib/graph";

// const graph = new Graph();




// graph.addMultipleVertices(["MAT", "PHY", "CHE", "BIO", "ENG", "DEU", "GEO", "SPA"]);

// graph.addMultipleEdges([["MAT", "PHY"], ["MAT", "CHE"], ["PHY", "CHE"], ["CHE", "BIO"], ["ENG", "DEU"], ["GEO", "MAT"], ["MAT", "SPA"]]);

// graph.addMultipleColors([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

// // Set weekdays for colors (0 = Monday, 1 = Tuesday, etc)
// graph.colorToWeekday.set(0, 0); // Monday
// graph.colorToWeekday.set(1, 1); // Tuesday  
// graph.colorToWeekday.set(2, 2); // Wednesday
// graph.colorToWeekday.set(3, 3); // Thursday
// graph.colorToWeekday.set(4, 4); // Friday
// graph.colorToWeekday.set(5, 0); // Monday
// graph.colorToWeekday.set(6, 1); // Tuesday
// graph.colorToWeekday.set(7, 2); // Wednesday
// graph.colorToWeekday.set(8, 3); // Thursday
// graph.colorToWeekday.set(9, 4); // Friday
// graph.colorToWeekday.set(10, 0); // Monday
// graph.colorToWeekday.set(11, 1); // Tuesday
// graph.colorToWeekday.set(12, 2); // Wednesday
// graph.colorToWeekday.set(13, 3); // Thursday
// graph.colorToWeekday.set(14, 4); // Friday
// graph.colorToWeekday.set(15, 0); // Monday



// // Set available weekdays for vertices
// graph.vertexToWeekdays.set("MAT", [0, 2]);
// graph.vertexToWeekdays.set("PHY", [3]);
// graph.vertexToWeekdays.set("CHE", [2]);
// graph.vertexToWeekdays.set("BIO", [0]);
// graph.vertexToWeekdays.set("ENG", [1]);
// graph.vertexToWeekdays.set("DEU", [4]);
// graph.vertexToWeekdays.set("GEO", [0]);
// graph.vertexToWeekdays.set("SPA", [1]);

// console.log(graph.getColoring());
// console.log(graph.graph)

import { parseCourseName } from "$lib/utils";

parseCourseName("bio526-Q1-1-2");
parseCourseName("geg826-Q2");
parseCourseName("eng826-E-4-0-3");
