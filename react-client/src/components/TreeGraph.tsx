import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { TreeNode } from "../types";

type Props = {
  data: TreeNode | null;
  selectedName: string | null;
  onSelect: (name: string | null) => void;
};

export default function TreeGraph({ data, selectedName, onSelect }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    // 1) Build hierarchy and layout
    const root = d3.hierarchy<TreeNode>(data);
    const tree = d3
      .tree<TreeNode>()
      .nodeSize([70, 160]) // [vertical, horizontal]
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.4));
    tree(root);

    // 2) Compute bounds so nothing is clipped
    const nodes = root.descendants();
    const links = root.links();
    const x0 = d3.min(nodes, (d) => d.x)!;
    const x1 = d3.max(nodes, (d) => d.x)!;
    const y0 = d3.min(nodes, (d) => d.y)!;
    const y1 = d3.max(nodes, (d) => d.y)!;

    const pad = 48;
    const width = (y1 - y0) + pad * 2;
    const height = (x1 - x0) + pad * 2;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", height);

    svg.selectAll("*").remove();

    // 3) Group shifted so min x/y starts at padding
    const g = svg
      .append("g")
      .attr("transform", `translate(${pad - y0}, ${pad - x0})`);

    // 4) Links
    g.selectAll("path.link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#c4c7cb")
      .attr("stroke-width", 2)
      .attr("d",
        d3.linkHorizontal<any, any>()
          .x((d: any) => d.y)
          .y((d: any) => d.x)
      );

    // 5) Nodes (rounded rectangles with label)
    const node = g
      .selectAll("g.node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.y - 48}, ${d.x - 20})`)
      .style("cursor", "pointer")
      .on("click", (_e, d) => onSelect(d.data.name));

    node
      .append("rect")
      .attr("width", 96)
      .attr("height", 40)
      .attr("rx", 8)
      .attr("ry", 8)
      .attr("fill", (d) => (selectedName === d.data.name ? "#e6f0fb" : "#ffffff"))
      .attr("stroke", (d) => (selectedName === d.data.name ? "#2b6cb0" : "#8a8f98"))
      .attr("stroke-width", (d) => (selectedName === d.data.name ? 2.2 : 1.4))
      .attr("filter", "url(#nodeShadow)");

    node
      .append("text")
      .attr("x", 48)
      .attr("y", 22)
      .attr("text-anchor", "middle")
      .style("font", "13px system-ui, -apple-system, Segoe UI, Roboto, sans-serif")
      .style("fill", "#262b32")
      .text((d) => d.data.name);

    // 6) Soft shadow
    const defs = svg.append("defs");
    const filter = defs.append("filter").attr("id", "nodeShadow").attr("height", "150%");
    filter
      .append("feDropShadow")
      .attr("dx", 0)
      .attr("dy", 1.2)
      .attr("stdDeviation", 1.6)
      .attr("flood-opacity", 0.25);

    // background click (outside nodes) clears selection
    const wrapEl = wrapRef.current;
    const onBgClick = (e: MouseEvent) => {
      if (e.target === wrapEl) onSelect(null);
    };
    wrapEl?.addEventListener("click", onBgClick);
    return () => wrapEl?.removeEventListener("click", onBgClick);
  }, [data, selectedName, onSelect]);

  return (
    <div
      ref={wrapRef}
      style={{
        width: "100%",
        minHeight: 560,
        background: "#f6f7f9",
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
      }}
      // clicking directly on the empty wrapper clears selection
      onClick={(e) => {
        if (e.target === e.currentTarget) onSelect(null);
      }}
    >
      <svg ref={svgRef} />
    </div>
  );
}
