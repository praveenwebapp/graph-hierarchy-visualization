import type { TreeNode } from "../types";

type Props = {
  node: TreeNode | null;
  onClear: () => void;
};

export default function NodeSidebar({ node, onClear }: Props) {
  if (!node) {
    return (
      <aside style={boxStyle}>
        <p style={{ color: "#6b7280", textAlign: "center" }}>
          Select a node to view details.
        </p>
      </aside>
    );
  }

  return (
    <aside style={boxStyle}>
      <div style={hdrStyle}>
        <h2 style={{ margin: 0 }}>{node.name}</h2>
        <button
          aria-label="Deselect"
          onClick={onClear}
          style={closeBtnStyle}
        >
          ✕
        </button>
      </div>
      <p style={{ marginTop: 8, lineHeight: 1.4 }}>{node.description}</p>
    </aside>
  );
}

const boxStyle: React.CSSProperties = {
  position: "sticky",
  top: 16,
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 14,
  color: "#1f2937",
};

const hdrStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const closeBtnStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  fontSize: 18,
  cursor: "pointer",
  color: "#374151",
  lineHeight: 1,
};
