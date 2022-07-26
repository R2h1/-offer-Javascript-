



const isConditionNode = (nodes) => {
    let node_num = nodes.length;
    for (let i = 0; (i + 1) * 2 < node_num; i++) {
        if (getSumOfNodes(i+1, nodes, node_num) === getSumOfNodes(i+2, nodes, node_num)) {
            return 'Yes';
        }
    }
    return 'No';
}

const getSumOfNodes = (index, nodes, node_num) => {
    // 计算满二叉树的权值和
    if ((index + 1) * 2 >= node_num) {
        return parseInt(nodes[index])
    }
    let res = parseInt(nodes[index]);
    res += getSumOfNodes(2* index + 1, nodes, node_num);
    res += getSumOfNodes(2* index + 2, nodes, node_num);
    return res;
}
let nodes = ['1', '2', '2', '1', '2', '1', '3']
let result = isConditionNode(nodes);


console.log(result);

