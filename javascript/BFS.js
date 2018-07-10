function BFS(node, callback) {
  const result = [];
  if (node !== null) {
    const queue = [];
    queue.push(node);
    while (queue.length !== 0) {
      const item = queue.shift();
      callback(item);
      result.push(item)
      if (item.children.length !== 0) {
        item.children.forEach(item => queue.push(item));
      }
    }
  }

  return result;
}
