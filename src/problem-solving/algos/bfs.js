const graph2 = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F", "G"],
  D: [],
  E: [],
  F: [],
  G: [],
};

const breadthFirstSearch = (graph, start) => {
  const queue = [start];
  const visited = new Set();
  const result = [];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!visited.has(current)) {
      visited.add(current);
      result.push(current);
      if (graph[current]) {
        queue.push(...graph[current]);
      }
    }
  }

  return result;
};

console.log(breadthFirstSearch(graph2, "C"));

