
function getMinOfWay(n, m, s, t, node_edge) {
    let pathes = []
    let path = []
    getWay(m, s, t, node_edge, pathes, path)
    return pathes;
}

function getWay(m, start, end, node_edge, pathes, path) {
    for (let i = 0; i < m; i++) {
        if (node_edge[i]['0'] = start) {
            path.push(node_edge[i]['val'])
            if (node_edge[i]['0'] = end) {
                pathes.push(path)
                return
            }
            start = node[i]['1'];
            getWay(m - 1, start, t, node_edge.split(i, 1), pathes, path)
        }
    }
}

let n = 5, 
    m = 6, 
    s = 1, 
    t = 5, 
    node_edge = [
        {
            '0': 1,
            '1': 5,
            'val':100},
        {
            '0': 1,
            '1': 2,
            'val':10},
        {
            '0': 2,
            '1': 5,
            'val':5},
        {
            '0': 1,
            '1': 3,
            'val':3},
        {
            '0': 3,
            '1': 4,
            'val':2},
        {
        '0': 4,
        '1': 5,
        'val':1},
    ]
console.log(getMinOfWay(n, m, s, t, node_edge));