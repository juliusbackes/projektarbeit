class Graph:
    """
        A graph is a set of vertices and edges.
        G = (V, E)
    """

    coloring = {}

    def __init__(self) -> None:
        self.graph = {}

    def __str__(self) -> str:
        if self.graph == {}:
            return "Empty Graph"
        
        result = ""
        for v in self.graph:
            result += f"{v}: {self.graph[v]}\n"
        return result

    def add_vertex(self, v: str) -> None:
        if v in self.graph:
            raise ValueError("Vertex already in graph")
        
        self.graph[v] = []

    def remove_vertex(self, v: str) -> None:
        if v not in self.graph:
            raise ValueError("Vertex not found in graph")
        
        del self.graph[v]

    def add_edge(self, a: str, b: str) -> None:
        if a not in self.graph or b not in self.graph:
            raise ValueError(f"One or two vertices were not found in the graph | a: {a}, b: {b}")
        
        if a == b:
            raise ValueError(f"The given vertices cannot be the same.")
        
        self.graph[a].append(b)
        self.graph[b].append(a)

    def remove_edge(self, a: str, b: str) -> None:
        if a not in self.graph or b not in self.graph:
            raise ValueError(f"One or two vertices were not found in the graph | a: {a}, b: {b}")
        
        self.graph[a].remove(b)
        self.graph[b].remove(a)

    def color(self, v: str, c: str) -> None:
        self.coloring[v] = c

    def calc_chromatic_num(self) -> int:
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
    
    def sort_graph(self) -> dict:
        return dict(sorted(self.graph.items(), key=lambda item: len(item[1]), reverse=True))