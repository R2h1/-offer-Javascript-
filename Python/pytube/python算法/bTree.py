from collections import deque
'''
class of Node
'''
class Node():
    def __init__(self, data, left = None, right = None):
        self.data = data
        self.left = left
        self.right = right

'''
class of Tree
'''
class binaryTree:
    def __init__(self, root = None):
        self._root = root
        self._depth = 0   # the depth of the tree
        self._node_num = 0

    def get_tree(self):
        if self._root is not None:
            return self._root
    def get_depth(self):
        self.cal_depth(self._root)
        return self._depth
    def get_node_num(self):
        return self._node_num
    
    def add_node(self,data):
        node = Node(data)
        if self._root is None:
            # root node is None
            self._root = node
            self._node_num += 1
            return 
        # root node is exist
        # begin with the root node , loop to adjust to ensure new node’s position inserted
        node_queue = deque([self._root])
        while node_queue:
            cur_node = node_queue.popleft()
            if  cur_node.left is None:
                # not have left node
                cur_node.left = node
                self._node_num += 1
                return
            elif cur_node.right is None:
                #  the right child node of cur_node is not exist 
                cur_node.right = node
                self._node_num += 1
                return
            else:
                # both right child node and left child node are exist
                node_queue.append(cur_node.left)
                node_queue.append(cur_node.right)

    def preorder_traversal(self,root,res=[]):
        '''preorder traversal of binaryTree'''
        ''' recursive'''
        # if root is None:
        #   return 
        # else:
        #   cur_node = root
        #   res.append(cur_node.data)
        #   # print(cur_node.data)
        #   leftChild =  cur_node.left
        #   rightChild = cur_node.right
        #   if  leftChild is not None:
        #       self.preorder_traversal(leftChild,res)
        #   if  rightChild is not None:
        #       self.preorder_traversal(rightChild,res)
        ''' non-recursive '''
        if root is None:
            return 
        else:
            stack = [root]
            while stack:
                cur_node = stack.pop()
                if cur_node is not None:
                    res.append(cur_node.data)
                    # stack LIFO, so right child push into before the left child
                    stack.append(cur_node.right)
                    stack.append(cur_node.left)
        return res
        


    def inorder_traversal(self,root,res=[]):
        '''in-order traversal of b-tree'''
        ''' recursive'''
        # if root is None:
        #   return 
        # else:
        #   cur_node = root
        #   leftChild =  cur_node.left
        #   rightChild = cur_node.right
        #   if not leftChild is None:
        #       self.inorder_traversal(leftChild,res)
        #   res.append(cur_node.data)
        #   # print(cur_node.data)
        #   if not rightChild is None:
        #       self.inorder_traversal(rightChild,res)
        ''' non-recursive '''
        if root is None:
            return
        else:
            stack = []
            cur_node = root
            while stack or cur_node is not None:
                while cur_node is not None:
                    # let all left child into stack
                    stack.append(cur_node)
                    cur_node = cur_node.left
                if stack:
                    # let most left child out stack first
                    cur_node = stack.pop()
                    res.append(cur_node.data)
                    # if right child is exist , do same thing for it
                    cur_node = cur_node.right
        return res
        


    def postorder_traversal(self,root,res=[]):
        '''Postorder traversal of b-tree'''
        ''' recursive '''
        # if root is None:
        #   return 
        # else:
        #   cur_node = root
        #   leftChild =  cur_node.left
        #   rightChild = cur_node.right
        #   if not leftChild is None:
        #       self.postorder_traversal(leftChild,res)
        #   # print(cur_node.data)
        #   if not rightChild is None:
        #       self.postorder_traversal(rightChild,res)
        #   res.append(cur_node.data)
        ''' non-recursive '''
        if root is None:
            return
        else:
            stack = [root]
            while stack:
                # reserve traversal : first -- root then -- right last-- left
                cur_node = stack.pop()
                leftChild = cur_node.left
                rightChild = cur_node.right
                # so root out stack first then right child out , left child out last
                if leftChild is not None:
                    stack.append(leftChild)
                if rightChild is not None:
                    stack.append(rightChild)
                res.append(cur_node.data)
        # finally reverse output is ok
        return res[::-1]
    def layerorder_traversal(self,root,res=[]):
        '''layer order traversal of the tree'''
        if root is None:
            return
        else:
            que = deque([root])
            while que:
                node = que.popleft()
                res.append(node.data)
                leftChild = node.left
                rightChild = node.right
                if leftChild is not None:
                    que.append(leftChild)
                if rightChild is not None:
                    que.append(rightChild)
        return res


    def cal_depth(self,root):
        '''compute the depth of the b-tree'''
        if root is None:
            return 0
        else:
            '''the implement way of recursive'''
            # depth_left = self.get_depth(root.left)
            # depth_right = self.get_depth(root.right)
            # self._depth = max(depth_left, depth_right) + 1
            que = deque([(root,1)])
            while que:
                node, depth = que.popleft()
                leftChild = node.left
                rightChild = node.right
                if leftChild is not None:
                    que.append((leftChild, depth + 1))
                if rightChild is not None:
                    que.append((rightChild, depth + 1))
            self._depth = depth

        

if __name__ == '__main__':
    bTree = binaryTree()
    bTree.add_node(1)
    bTree.add_node(2)
    bTree.add_node(3)
    bTree.add_node(4)
    bTree.add_node(5)
    bTree.add_node(6)
    bTree.add_node(7)
    root = bTree.get_tree()
    print('先序遍历：\n',bTree.preorder_traversal(root,res=[]))
    print('中序遍历：\n',bTree.inorder_traversal(root,res=[]))
    print('后序遍历：\n',bTree.postorder_traversal(root,res=[]))
    print('二叉树的深度：\n',bTree.get_depth())
    print('层序遍历：\n',bTree.layerorder_traversal(root,res=[]))
    print('二叉树的节点数：\n',bTree.get_node_num())




