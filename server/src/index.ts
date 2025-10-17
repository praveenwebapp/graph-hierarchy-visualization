import express from "express";
import cors from "cors";
import { rawData } from "./data";
import { makeTree } from "./buildHierarchy";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/graph", (_req, res) => {
  const tree = makeTree(rawData);
  res.json({ data: tree });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
