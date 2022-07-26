/**
 * 经过N个星球， 在 Ti事件到达地i个星球，该星球的坐标为(Xi, Yi, Zi)
 * 第i个星球到第i+1个星球是匀速前进，且忽略在星球停留的时间。
 * 求哪一段路程速度最快
 * 输入 N 
 * 输入第i个星球Ti Xi Yi Zi
 * 输出整数i 表示第i个星球到第i+1个星球速度最快
*/

let N = 3
let positions = [
    [2, -9, 2, 3],
    [4, 9, 9, 8],
    [9, 2, 3, 4]
]
const fastest = (positions, N) => {
    let speed = 0,
        res = 0;
    for (let i = 0; i < N - 1; i++) {
        let A = positions[i].slice(1),
            B = positions[i+1].slice(1),
            Ta = positions[i][0],
            Tb = positions[i+1][0];
        let curSpeed = distance(A, B) / (Tb - Ta);
        if (curSpeed > speed) {
            res = i + 1
            speed = curSpeed
        }
    }
    return res;
}

// 求两个星球之间的距离
const distance = (A, B) => {
    return Math.sqrt((A[0] - B[0])**2 + (A[1] - B[1])**2 + (A[2] - B[2])**2) 
}

console.log(fastest(positions, N))