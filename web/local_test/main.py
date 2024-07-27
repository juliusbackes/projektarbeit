from graph import Graph, Vertex

g = Graph()

g.add_vertex("x_1")
g.add_vertex("x_2")
g.add_vertex("x_3")
g.add_vertex("x_4")
g.add_vertex("x_5")
g.add_vertex("x_6")

g.add_edge("x_1", "x_4")
g.add_edge("x_2", "x_3")
g.add_edge("x_3", "x_6")
g.add_edge("x_3", "x_4")
g.add_edge("x_4", "x_5")


c = g.calc_chromatic_num()


v1 = Vertex(1, x=2)

print(c)

