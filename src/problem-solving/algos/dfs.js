const graph2 = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F", "G"],
  D: [],
  E: [],
  F: [],
  G: [],
};
const DFS = (graph, start) => {
  const stack = [start]; 
  const visited = new Set();
  const result = [];

  while (stack.length > 0) {
    const current = stack.pop(); 

    if (!visited.has(current)) {
      visited.add(current);
      result.push(current);
      stack.push(...graph[current]); 
    }
  }
  return result;
};

DFS(graph2, "A");
