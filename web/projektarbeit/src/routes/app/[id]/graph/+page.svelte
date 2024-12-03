<script>
    // @ts-nocheck
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { Graph } from "$lib/graph";

    let { data } = $props();
    let project = data.sidebarData?.projects.find((p) => `${p.id}` == $page.params.id);
    
    let graphData = $state(null);
    let svgContainer = $state(null);
    let activeNode = $state(null);

    onMount(async () => {
        if (project?.graph) {
            const graph = Graph.fromJSON(project.graph);
            
            const nodes = Array.from(graph.graph.keys()).map(id => ({
                id,
                group: graph.coloring.get(id)?.getTime() || 0
            }));

            const links = [];
            graph.graph.forEach((neighbors, source) => {
                neighbors.forEach(target => {
                    links.push({
                        source,
                        target,
                        value: 1
                    });
                });
            });

            graphData = { nodes, links };
            createChart();
        }
    });
  
    function createChart() {
      const width = window.innerWidth;
      const height = window.innerHeight;
  
      const color = d3.scaleOrdinal(d3.schemeCategory10);
  
      const links = graphData?.links.map((d) => ({ ...d }));
      const nodes = graphData?.nodes.map((d) => ({ ...d }));
  
      d3.select(svgContainer).selectAll("*").remove();
  
      const svg = d3
        .select(svgContainer)
        .attr("viewBox", [0, 0, width, height])
        .attr("width", "100%")
        .attr("height", "100%");
  
      const g = svg.append("g");
  
      const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        });
  
      svg.call(zoom);
  
      const zoomControls = svg
        .append("g")
        .attr("class", "zoom-controls flex flex-col items-center justify-center")
        .attr("transform", `translate(${width - 100}, 20)`);
  
      zoomControls
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 80)
        .attr("height", 60)
        .attr("fill", "white")
        .attr("rx", "6")
  
      zoomControls
        .append("text")
        .attr("x", 40)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("class", "text-3xl cursor-pointer text-gray-700 select-none")
        .text("+")
        .on("click", () => {
          svg.transition().call(zoom.scaleBy, 1.3);
        });
  
      zoomControls
        .append("text")
        .attr("x", 40)
        .attr("y", 45)
        .attr("text-anchor", "middle")
        .attr("class", "text-3xl cursor-pointer text-gray-700 select-none")
        .text("-")
        .on("click", () => {
          svg.transition().call(zoom.scaleBy, 0.7);
        });
  
      const simulation = d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink(links)
          .id((d) => d.id)
          .distance(d => d.value * 300)
        )
        .force("charge", d3.forceManyBody().strength(-500))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);
  
      const link = g
        .append("g")
        .selectAll("line")
        .data(links ?? [])
        .join("line")
        .attr("class", "graph-link")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", (d) => Math.sqrt(d.value));
  
      const nodeGroup = g
        .append("g")
        .selectAll("g")
        .data(nodes ?? [])
        .join("g")
        .attr("class", "node-group")
        .on("click", (event, d) => highlightNeighbors(event, d));

      nodeGroup
        .append("circle")
        .attr("r", 40)
        .attr("fill", (d) => color(d.group))
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5);

      nodeGroup
        .append("text")
        .text(d => d.id.replace(/\$\$(1|2)/g, ''))
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .attr("fill", "black")
        .attr("font-size", "12px");

      nodeGroup.call(
        d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );
  
      function ticked() {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
      }
  
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
  
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
  
      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      function highlightNeighbors(event, d) {
        if (activeNode === d.id) {
          removeHighlight();
          activeNode = null;
          return;
        }

        activeNode = d.id;

        d3.selectAll(".node-group")
          .classed("node-highlight", false)
          .classed("node-dimmed", true);

        d3.selectAll(".graph-link")
          .classed("link-highlight", false)
          .classed("link-dimmed", true);

        const clickedNode = d3.select(event.currentTarget)
          .classed("node-highlight", true)
          .classed("node-dimmed", false);

        links.forEach(link => {
          if (link.source.id === d.id || link.target.id === d.id) {
            const neighborId = link.source.id === d.id ? link.target.id : link.source.id;
            
            d3.selectAll(".node-group")
              .filter(n => n.id === neighborId)
              .classed("node-highlight", true)
              .classed("node-dimmed", false);

            d3.selectAll(".graph-link")
              .filter(l => (l.source.id === d.id && l.target.id === neighborId) || 
                          (l.target.id === d.id && l.source.id === neighborId))
              .classed("link-highlight", true)
              .classed("link-dimmed", false);
          }
        });
      }

      function removeHighlight() {
        d3.selectAll(".node-group")
          .classed("node-highlight", false)
          .classed("node-dimmed", false);

        d3.selectAll(".graph-link")
          .classed("link-highlight", false)
          .classed("link-dimmed", false);
      }
    }
  </script>
  
  <div class="w-full h-[80vh] flex justify-center items-center">
      <svg bind:this={svgContainer}></svg>
  </div>
  
  <style>
    svg {
      display: block;
      margin: auto;
    }

    :global(.node-highlight circle) {
      stroke: #000;
      stroke-width: 2px;
    }

    :global(.node-dimmed circle) {
      opacity: 0.3;
    }

    :global(.node-dimmed text) {
      opacity: 0.3;
    }

    :global(.link-highlight) {
      stroke: #000 !important;
      stroke-opacity: 1 !important;
      stroke-width: 2px !important;
    }

    :global(.link-dimmed) {
      opacity: 0.1;
    }

    :global(.node-group) {
      cursor: pointer;
    }
  </style>
  