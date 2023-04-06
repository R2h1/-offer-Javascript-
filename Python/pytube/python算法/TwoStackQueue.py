# -*- coding:utf-8 -*-
'''
两个栈模拟一个队列的入队和出队操作
author: rrh_tk
'''
class TwoStackQueue():
    def __init__(self):
        # 初始化两个栈，栈A用来入队，栈B用来出队
        self._stackA = []
        self._stackB = []
    def put(self, node):
        # 直接入队
        self._stackA.append(node)
    def get(self):
        # 如果出队栈 B 非空，直接出队
        if self._stackB:
            return self._stackB.pop()
        # 出队栈 B 空
        else:
            if self._stackA:
               # 将所有的入队栈 A 中的元素依次放到出队 B 栈中（满足后入的后出）
               while self._stackA:
                   self._stackB.append(self._stackA.pop())
               # 然后从出队栈 B 中 出队
               return self._stackB.pop()
            else:
                return None
                
if __name__ == '__main__':
  queue = TwoStackQueue()