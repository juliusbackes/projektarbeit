class Graph: 
    def __init__(self) -> None:
        self.graph = {}

    def __str__(self) -> str:
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
        
        self.graph[a].append(b)
        self.graph[b].append(a)

    def remove_edge(self, a: str, b: str) -> None:
        if a not in self.graph or b not in self.graph:
            raise ValueError(f"One or two vertices were not found in the graph | a: {a}, b: {b}")
        
        self.graph[a].remove(b)
        self.graph[b].remove(a)

    def calc_chromatic_num(self):
        return 42

g = Graph()

g.add_vertex("A")
g.add_vertex("B")
g.add_edge("A", "B")

print(g.calc_chromatic_num())