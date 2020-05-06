/*
输入两棵二叉树A，B，判断B是不是A的子结构。
（ps：我们约定空树不是任意一个树的子结构）
*/

function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}



function isEqual(num1, num2) {
    return Math.abs(num1 - num2) < Number.EPSILON;
}
//主树的遍历
function HasSubtree(pRoot1, pRoot2) {
    if (pRoot1 === null || pRoot2 === null) {
        return false
    }
    let result = false
    //前序遍历树
    if (isEqual(pRoot1.val, pRoot2.val)) {
        //当前根节点相同，有可能是子结构，去判断
        result = isTree2EqTree1(pRoot1, pRoot2)
    }
    //从根节点出发不相同，继续遍历左子树做判断
    if (!result) {
        result = HasSubtree(pRoot1.left, pRoot2)
    }
    //在根节点和左子树都不存在，继续遍历右子树做判断
    if (!result) {
        result = HasSubtree(pRoot1.right, pRoot2)
    }
    return result
}

//节点相同时树的遍历比较
function isTree2EqTree1(root1, root2) {
    // root2 为空 
    if (root2 === null) {
        return true
    }
    // root2 不为空，root1为空，不匹配 
    // 或者root1，root2都不为空且val不相等
    if (root1 === null || !isEqual(root1.val, root2.val)) {
        return false
    }
    return isTree2EqTree1(root1.left, root2.left) && isTree2EqTree1(root1.right, root2.right)
}