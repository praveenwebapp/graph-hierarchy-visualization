<script setup lang="ts">
import * as d3 from "d3";
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import type { TreeNode } from "../types";

const props = defineProps<{
  data: TreeNode | null;
  selectedName: string | null;
}>();

const emit = defineEmits<{ (e: "select", name: string | null): void }>();
const svgRef = ref<SVGSVGElement | null>(null);
let resizeObserver: ResizeObserver | null = null;

function render() {
  if (!svgRef.value || !props.data) return;

  const root = d3.hierarchy(props.data);
  const tree = d3
    .tree<TreeNode>()
    .nodeSize([70, 160])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.4));

  tree(root);

  const nodes = root.descendants();
  const links = root.links();

  const x0 = d3.min(nodes, (d) => d.x)!;
  const x1 = d3.max(nodes, (d) => d.x)!;
  const y0 = d3.min(nodes, (d) => d.y)!;
  const y1 = d3.max(nodes, (d) => d.y)!;

  const pad = 48;
  const width = y1 - y0 + pad * 2;
  const height = x1 - x0 + pad * 2;

  const svg = d3
    .select(svgRef.value)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("width", "100%")
    .attr("height", height);

  svg.selectAll("*").remove();

  const g = svg.append("g").attr("transform", `translate(${pad - y0}, ${pad - x0})`);

  g.selectAll("path.link")
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#c4c7cb")
    .attr("stroke-width", 2)
    .attr(
      "d",
      d3
        .linkHorizontal<any, any>()
        .x((d: any) => d.y)
        .y((d: any) => d.x)
    );

  const node = g
    .selectAll("g.node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${d.y! - 48}, ${d.x! - 20})`)
    .style("cursor", "pointer")
    .on("click", (_e, d) => emit("select", d.data.name));

  node
    .append("rect")
    .attr("width", 96)
    .attr("height", 40)
    .attr("rx", 8)
    .attr("ry", 8)
    .attr("fill", (d) => (props.selectedName === d.data.name ? "#e6f0fb" : "#ffffff"))
    .attr("stroke", (d) => (props.selectedName === d.data.name ? "#2b6cb0" : "#8a8f98"))
    .attr("stroke-width", (d) => (props.selectedName === d.data.name ? 2.2 : 1.4))
    .attr("filter", "url(#nodeShadow)");

  node
    .append("text")
    .attr("x", 48)
    .attr("y", 22)
    .attr("text-anchor", "middle")
    .style("font", "13px system-ui, -apple-system, Segoe UI, Roboto, sans-serif")
    .style("fill", "#262b32")
    .text((d) => d.data.name);

  const defs = svg.append("defs");
  const filter = defs.append("filter").attr("id", "nodeShadow").attr("height", "150%");
  filter
    .append("feDropShadow")
    .attr("dx", 0)
    .attr("dy", 1.2)
    .attr("stdDeviation", 1.6)
    .attr("flood-opacity", 0.25);
}

onMounted(() => {
  render();
  const el = svgRef.value?.parentElement;
  if (el && "ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(() => render());
    resizeObserver.observe(el);
  }
});

watch(() => [props.data, props.selectedName], async () => {
  await nextTick();
  render();
});

onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<template>
  <div class="graph-wrap" @click.self="$emit('select', null)">
    <svg ref="svgRef"></svg>
  </div>
</template>

<style scoped>
.graph-wrap {
  width: 100%;
  min-height: 560px;
  background: #f6f7f9;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}
</style>
