/**
 * 有一P层高的楼，每一层都有n*m个工位，有些工位上放了一些材料，这些材料坐标为list，
 * 我们从第一层开始（0，0，0）
 * 要求：
 * 1.必须一层处理完成后，走到底后（最后一行的最左边或者最右边），
 * 然后回到（0，0）位置，才能上下一层，最后完成后也要回到（0，0）
 * 2.上下层不算距离
 * 3.每一层的收集，必须收集完当前行的材料，才能走向下一行
 * 4.如果要走向下一行，必须先返回这行的最左端或者最右端
 * 5.如果这一层都没有数据，直接跳过这一层
 * 求收集完材料最短距离
 * n<=100,m<=100,p<=100
 * 特殊节点数量<1000
*/

var input = ['3,10,3','0,0,1;0,9,1;1,8,1']
var nmp = input[0].split(',')
// n, m, p 坐标也是(n, m, p)
var n = parseInt(nmp[0]),
    m = parseInt(nmp[1]),
    p = parseInt(nmp[2])

let list = input[1].split(';')

list = list.map((i) => {
    let j = i.split(',')
    j = j.map((i) => parseInt(i))
    return j
})

list = 

function minDistance(n, m, p, list) {
    let count = 0
    
    return 2 * count
}