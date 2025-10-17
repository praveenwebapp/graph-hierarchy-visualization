// Each node from data has a name, description, and optional parent
type Item = {
  name: string;
  description: string;
  parent: string;
};

// Final tree structure with name, description, and child nodes
type Tree = {
  name: string;
  description: string;
  children: Tree[];
};

// Function to build a tree structure from a flat list
export function makeTree(list: Item[]): Tree | null {
  const allNodes = new Map<string, Tree>(); // stores all nodes by their name
  let mainRoot: Tree | null = null;         // keeps track of the top node

  // Step 1: Create a map of all nodes
  list.forEach((item) => {
    allNodes.set(item.name, {
      name: item.name,
      description: item.description,
      children: [],
    });
  });

  // Step 2: Connect each node to its parent
  list.forEach((item) => {
    const current = allNodes.get(item.name)!;

    // If parent is empty → this is the root node
    if (item.parent === "") {
      mainRoot = current;
    } else {
      const parentNode = allNodes.get(item.parent);
      if (parentNode) {
        parentNode.children.push(current);
      }
    }
  });

  // Return the complete tree starting from root
  return mainRoot;
}
