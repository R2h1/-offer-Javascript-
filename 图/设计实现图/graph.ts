interface GraphNode {
    a: any;
    b: any;
    weight: any;
}
  
interface AnyObj {
[key: string]: any;
}
class Graph {
    directed: boolean;
    nodes: any[];
    edges: Map<string, AnyObj>;
    constructor(directed = true) {
        this.directed = directed;
        this.nodes = [];
        this.edges = new Map();
    }

    addNode(key: string, value = key) {
        this.nodes.push({ key, value });
    }

    addEdge(a: AnyObj, b: any, weight: any) {
        this.edges.set(JSON.stringify([a, b]), { a, b, weight });
        if (!this.directed) this.edges.set(JSON.stringify([b, a]), { a: b, b: a, weight });
    }

    removeNode(key: any) {
        this.nodes = this.nodes.filter((n: { key: any; }) => n.key !== key);
        [...this.edges.values()].forEach(({ a, b }) => {
        if (a === key || b === key) this.edges.delete(JSON.stringify([a, b]));
        });
    }

    removeEdge(a: any, b: any) {
        this.edges.delete(JSON.stringify([a, b]));
        if (!this.directed) this.edges.delete(JSON.stringify([b, a]));
    }

    findNode(key: any) {
        return this.nodes.find((x: { key: any; }) => x.key === key);
    }

    hasEdge(a: any, b: any) {
        return this.edges.has(JSON.stringify([a, b]));
    }

    setEdgeWeight(a: any, b: any, weight: any) {
        this.edges.set(JSON.stringify([a, b]), { a, b, weight });
        if (!this.directed) this.edges.set(JSON.stringify([b, a]), { a: b, b: a, weight });
    }

    getEdgeWeight(a: any, b: any) {
        return this.edges.get(JSON.stringify([a, b]))?.weight;
    }

    adjacent(key: any) {
        return [...this.edges.values()].reduce((acc, { a, b }) => {
        if (a === key) acc.push(b);
        return acc;
        }, []);
    }

    inDegree(key: any) {
        return [...this.edges.values()].reduce((acc, { _, b }) => (b === key ? acc + 1 : acc), 0);
    }

    outDegree(key: any) {
        return [...this.edges.values()].reduce((acc, { a, _ }) => (a === key ? acc + 1 : acc), 0);
    }
}

const graph = new Graph();

export default Graph;