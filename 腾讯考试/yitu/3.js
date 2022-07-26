const isSucess = (things, N, K1, K2, XYZ) => {

}

// 将钱转换为纳特
const moneyTurn = (XYZ) => {
    return XYZ[0] * 17 * 29 + XYZ[1] * 29 + XYZ[2]
}

let T = parseInt(readline());

for (let i = 0; i < T; i++) {
    let line = readline.split(' '),
        N = parseInt(line1[0]),
        K = parseInt(line1[1]),
        W = parseInt(line1[2]);
    let Li = readline.split(' ');
    Li = Li.map((item) => {
        return parseInt(item)
    })
    let Labcd = readline.split(' ');
    Labcd = Labcd .map((item) => {
        return parseInt(item)
    })
    let Hi = readline.split(' ');
    Hi = Hi.map((item) => {
        return parseInt(item)
    })
    let Habcd = readline.split(' ');
    Habcd = Habcd.map((item) => {
        return parseInt(item)
    })
    let C = new Array(N); // 周长
    let P = new Array(N);
    for (let j = 0; j < N; j++) {
        C[j] = (Hi[j] + W) * 2
        if (j == 0) P[j] = C[j]
    }
    let res = P[0]
    for (let j = 1; j < N; j++) {
        P[j] = P[j-1] + C[j]
        res *= P[j]
    }
    print('Case #1: ', res)
}