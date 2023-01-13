function bfs(root) {
  if (root === null) return []
  const res = [];
  const queue = [root];
  while (queue.length !== 0) {
    const cur = queue.shift();
    res.push(cur.value);
    const leftChild = cur.left;
    const rightChild = cur.right;
    if (leftChild !== null) {
      queue.push(leftChild);
    }
    if (rightChild !== null) {
      queue.push(rightChild);
    }
  }
  return res;
}