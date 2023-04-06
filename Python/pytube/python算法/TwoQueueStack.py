# -*- coding:utf-8 -*-
'''
两个队列模拟一个栈的入栈和出栈操作
author: rrh_tk
'''
class TwoQueueStack(object):

    def __init__(self):
        '''初始化两个队列'''
        self.queueA = []
        self.queueB = []
    def push(self,item):
        '''直接使用队列A 入栈'''
        self.queueA.append(item)

    def pop(self):
        #队列A为空，返回None
        if not len(self.queueA):
           return None
        #将队列 A 中的元素除了最后一个元素全部 入 队列 B 中
        while len(self.queueA) > 1:
            self.queueB.append(self.queueA.pop(0))
        #将队列 A B 交换
        self.queueA,self.queueB = self.queueB,self.queueA
        # 队列 B 中元素直接出队
        return self.queueB.pop(0)
 
 
if __name__ == '__main__':
    stack = TwoQueueStack()

