import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import type { TreeNode } from "./types";
import TreeGraph from "./components/TreeGraph";
import NodeSidebar from "./components/NodeSidebar";

function findByName(root: TreeNode | null, name: string | null): TreeNode | null {
  if (!root || !name) return null;
  const q: TreeNode[] = [root];
  while (q.length) {
    const n = q.shift()!;
    if (n.name === name) return n;
    q.push(...n.children);
  }
  return null;
}

export default function App() {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const apiBase = import.meta.env.VITE_API_BASE as string;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${apiBase}/api/graph`);
      // backend returns { data: <hierarchy> }
      setRoot(data.data);
    })();
  }, [apiBase]);

  const selectedNode = useMemo(
    () => findByName(root, selectedName),
    [root, selectedName]
  );

  return (
    <div style={{ padding: 16 }}>
      <header>
        <h1 style={{ margin: "0 0 12px" }}>Graph Hierarchy</h1>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(720px, 1fr) 360px",
          gap: 16,
          alignItems: "start",
        }}
      >
        <section>
          <TreeGraph
            data={root}
            selectedName={selectedName}
            onSelect={setSelectedName}
          />
        </section>

        <NodeSidebar node={selectedNode} onClear={() => setSelectedName(null)} />
      </div>
    </div>
  );
}
