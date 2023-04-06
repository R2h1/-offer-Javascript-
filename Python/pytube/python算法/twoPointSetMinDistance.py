# -*- coding:utf-8 -*-
import random
import math

def cal_distance(seq):
	return math.sqrt((seq[0][0]-seq[1][0])**2+(seq[0][1]-seq[1][1])**2)

def solver(setA,setB):
	n_A,n_B = len(setA),len(setB)
	# ����һ���㼯Ϊ��
	if n_A == 0 or n_B == 0:
		return float('inf')
	#������һ���㼯��Ϊ����
	if n_A < n_B:
		#ʼ��ѡ��ϴ�ĵ㼯����
		setA, setB = setB, setA
		n_A, n_B = n_B, n_A
	if n_A == n_B == 1:
		#�������㼯
		minDis = cal_distance(setA+setB)
	else:
		minDis = float('inf')
		leftSet,rightSet = setA[:n_A//2], setA[n_A//2:]
		leftMin = solver(leftSet,setB)
		rightMin = solver(rightSet,setB)
		if  leftMin < minDis:
			minDis = leftMin
		if  rightMin < minDis:
			minDis = rightMin
	return minDis


if __name__ == "__main__":
	n = 10
	point_setA = [(random.randint(0,50),random.randint(0,50)) for _ in range(n)]
	point_setB = [(random.randint(0,50),random.randint(0,50)) for _ in range(n)]
	print(solver(point_setA,point_setB))


