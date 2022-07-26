function rotatePassword( s1 ,  s2 ) {
    let res = '';
    let N = s1.length;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < N; j++) {
            for (let k = 0; k < N; k++) {
                if (s1[j][k] === '0') {
                    res += s2[j][k];
                }
            }
        }
        s1 = rotate(s1, N);
    }
    return res;
    // write code here
}
function rotate(s, N) {
    let res = [];
    for (let i = 0; i < N; i++) {
        let tmp = ''
        for (let j = 0; j < N; j++) {
            tmp += s[N - j - 1][i]
        }
        res.push(tmp)
    }
    return res;
}

let s1 = ['1101', '1010', '1111', '1110']

let s2 = ['ABCD', 'EFGH', 'IJKL', 'MNPQ']

console.log(rotatePassword(s1, s2))