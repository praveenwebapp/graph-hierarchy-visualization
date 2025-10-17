<script setup lang="ts">
import type { TreeNode } from "../types"

const props = defineProps<{ node: TreeNode | null }>()
const emit = defineEmits(["clear"])
</script>

<template>
  <aside class="sidebar">
    <div v-if="props.node">
      <div class="header">
        <h2>{{ props.node.name }}</h2>
        <button @click="emit('clear')" class="close">✕</button>
      </div>
      <p class="desc">{{ props.node.description }}</p>
    </div>
    <div v-else class="empty">
      <p>Select a node to view details.</p>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 14px;
  background: #ffffff;
  color: #111111; 
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600; 
  color: #111111;
}

.desc {
  margin-top: 6px;
  line-height: 1.5;
  color: #222222; 
}

.close {
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  color: #444444; 
}

.empty {
  text-align: center;
  color: #666666;
}
</style>
