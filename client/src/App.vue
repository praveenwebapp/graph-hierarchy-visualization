<script setup lang="ts">
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import type { TreeNode } from "./types";
import TreeGraph from "./components/TreeGraph.vue";
import NodeSidebar from "./components/NodeSidebar.vue";

const apiBase = import.meta.env.VITE_API_BASE as string;

const root = ref<TreeNode | null>(null);
const selectedName = ref<string | null>(null);

function bfsFind(rootNode: TreeNode | null, name: string | null): TreeNode | null {
  if (!rootNode || !name) return null;
  const q: TreeNode[] = [rootNode];
  while (q.length) {
    const n = q.shift()!;
    if (n.name === name) return n;
    q.push(...n.children);
  }
  return null;
}
const selectedNode = computed(() => bfsFind(root.value, selectedName.value));

async function load() {
  const { data } = await axios.get(`${apiBase}/api/graph`);
  root.value = data.data; // backend returns { data: <hierarchy> }
}

function onSelect(name: string | null) {
  selectedName.value = name;
}
function clearSelection() {
  selectedName.value = null;
}

onMounted(load);
</script>

<template>
  <div class="page">
    <header class="topbar">
      <h1>Graph Hierarchy</h1>
    </header>

    <div class="layout">
      <section class="canvas">
        <TreeGraph :data="root" :selectedName="selectedName" @select="onSelect" />
      </section>

      <NodeSidebar :node="selectedNode" @clear="clearSelection" />
    </div>
  </div>
</template>

<style scoped>
.page { padding: 16px; color: #e5e7eb; }
.topbar h1 { margin: 0 0 12px; font-weight: 600; }

.layout {
  display: grid;
  grid-template-columns: minmax(720px, 1fr) 360px;  /* ensure canvas wide enough */
  gap: 16px;
  align-items: start;
}

.canvas { padding: 0; }  /* TreeGraph already has its own padding/background */
</style>
