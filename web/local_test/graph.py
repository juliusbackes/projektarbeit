from __future__ import annotations
from typing import Self

class Vertex: 
    label: str | int

    def __init__(self: Self, label: str | int, **kwargs) -> None:
        self.label = label
        self.connections: list[Vertex] = []
        _connections = kwargs.get("connections")
        if _connections and isinstance(_connections, type(self.connections)):
            if self.label in [c.label for c in _connections]:
                raise ValueError("Cannot connect a vertex to itself")
            self.connections = _connections
            print(self.connections, self.label)

    def __str__(self) -> str:
        if len(self.connections) == 0:
            return "1 (No connections)"
    
        result = f"{self.label}:\n"
        for v in self.connections:
            result += f"{v.label}\n"
        return result

    def add_connection(self: Self, v: Vertex) -> None:
        if v.label in [c.label for c in self.connections]:
            raise ValueError("Cannot connect a vertex to itself")
        self.connections.append(v)

    def remove_connection(self: Self, v: Vertex | str | int) -> None:
        if isinstance(v, Vertex):
            if v.label not in [c.label for c in self.connections]:
                raise ValueError("The given vertex is not connected to this vertex")
            self.connections.remove(v)
        else:
            vertex_to_remove = None
            for conn in self.connections:
                if (isinstance(v, str) and conn.label == v) or (isinstance(v, int) and conn.label == str(v)):
                    vertex_to_remove = conn
                    break
            if vertex_to_remove:
                self.connections.remove(vertex_to_remove)
            else:
                raise ValueError("The given vertex is not connected to this vertex")

    def set_connections(self: Self, connections: list[Vertex] ) -> None:
        self.connections = connections

class Graph:
    """
        A graph is a set of vertices and edges. \n
        G = (V, E)
    """

    coloring: dict[str, str | int] = {}
    graph: dict[str , list[str]] = {}

    def __str__(self: Self) -> str:
        if self.graph == {}:
            return "Empty Graph"
        
        result = ""
        for v in self.graph:
            result += f"{v}: {self.graph[v]}\n"
        return result

    def add_vertex(self: Self, v: str) -> None:
        if v in self.graph:
            raise ValueError("Vertex already in graph")
        
        self.graph[v] = []



    def remove_vertex(self: Self, v: str) -> None:
        if v not in self.graph:
            raise ValueError("Vertex not found in graph")

        del self.graph[v]

    def add_edge(self: Self, a: str, b: str) -> None:
        if a not in self.graph or b not in self.graph:
            raise ValueError(f"One or two vertices were not found in the graph | a: {a}, b: {b}")
        
        if a == b:
            raise ValueError(f"The given vertices cannot be the same.")
        
        self.graph[a].append(b)
        self.graph[b].append(a)

    def remove_edge(self: Self, a: str, b: str) -> None:
        if a not in self.graph or b not in self.graph:
            raise ValueError(f"One or two vertices were not found in the graph | a: {a}, b: {b}")
        
        self.graph[a].remove(b)
        self.graph[b].remove(a)

    def color(self: Self, v: str, c: str | int) -> None:
        self.coloring[v] = c

    def calc_chromatic_num(self: Self) -> int:
        """
            sequential algorithm
        """
        sorted_graph = self.sort_graph()
    
        colors = {v: list(range(1, len(sorted_graph) + 1)) for v in sorted_graph}

        for v in sorted_graph:
            c = min(colors[v])
            self.color(v, c)

            for a in sorted_graph[v]: 
                if colors[a] == colors[v]:
                    colors[a].remove(c)

        chromatic_number = 0
        used_colors = []

        for v in self.coloring:
            if self.coloring[v] not in used_colors:
                chromatic_number += 1
                used_colors.append(self.coloring[v])

        return chromatic_number
    
    def sort_graph(self: Self) -> dict:
        return dict(sorted(self.graph.items(), key=lambda item: len(item[1]), reverse=True))