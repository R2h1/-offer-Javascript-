/*
如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。
如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。
我们使用Insert()方法读取数据流，使用GetMedian()方法获取当前读取数据的中位数。
*/
// 暴力法，时间复杂度为 
const arr = []
function Insert(num)
{
    
    arr.push(num)
    for (let i = arr.length - 2;arr[i] > num;i--) {
        [arr[i],arr[i+1]] = [arr[i+1],arr[i]]
    }
    // write code here
}
// 二分查找插入位置
function Insert(num) {
    if (!arr.length) {
        arr.push(num);
        return;
    }
    let left = 0,
        right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === num) {
            arr.splice(mid, 0, num);
            return;
        } else if (arr[mid] < num) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    arr.splice(right + 1, 0, num);
}
function GetMedian(){
	// write code here
    let len = arr.length,
        mid = Math.floor(len / 2),
        res
    if (len % 2 === 0) {
        res = (arr[mid - 1] + arr[mid]) / 2
    } else {
        res = arr[mid]
    }
    return res
}


//自己实现大顶堆和小顶堆
var defaultCmp = (x, y) => x > y; // 默认是最大堆

var swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

class Heap {
    /**
     * 默认是最大堆
     * @param {Function} cmp
     */
    constructor(cmp = defaultCmp) {
        this.container = [];
        this.cmp = cmp;
    }
    insert(data) {
        this.container.push(data);
        let index = this.container.length - 1;
        while (index) {
            let parent = Math.floor((index - 1) / 2);
            if (!this.cmp(this.container[index], this.container[parent])) {
                return;
            }
            swap(this.container, index, parent);
            index = parent;
        }
    }
    extract() {
        if (!this.container.length) {
            return null;
        }
        swap(this.container, 0, this.container.length - 1)
        this.container.pop()
        let length = this.container.length,
            index = 0,
            exchange = index * 2 + 1
        while (exchange < length) {
            // 以最大堆的情况来说：如果有右节点，并且右节点的值大于左节点的值
            let right = index * 2 + 2
            if (right < length && this.cmp(this.container[right], this.container[exchange])) {
                exchange = right
            }
            if (!this.cmp(this.container[exchange], this.container[index])) {
                break
            }
            swap(this.container, exchange, index)
            index = exchange
            exchange = index * 2 + 1
        }
    }
    top() {
        if (this.container.length) return this.container[0];
        return null;
    }
}
var MedianFinder = function() {
    this.maxHeap = new Heap()
    this.minHeap = new Heap((x, y) => x < y)
};

MedianFinder.prototype.addNum = function(num) {
    this.maxHeap.insert(num)
    this.minHeap.insert(this.maxHeap.top())
    this.maxHeap.extract()

    if (this.maxHeap.container.length < this.minHeap.container.length) {
        this.maxHeap.insert(this.minHeap.top())
        this.minHeap.extract()
    }
};

MedianFinder.prototype.findMedian = function() {
    return this.maxHeap.container.length > this.minHeap.container.length
        ? this.maxHeap.top()
        : (this.maxHeap.top() + this.minHeap.top()) / 2
};