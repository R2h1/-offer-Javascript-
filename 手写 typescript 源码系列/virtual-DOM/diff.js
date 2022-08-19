var el = require('./element.js')

var StateEnums = {
    REPLACE: 0, // 替换原先的节点
    REORDER : 1, // 重新排序
    PROPS:  2, // 修改了节点的属性
    TEXT: 3 
}

function diff(oldVDomTree, newVDomTree) {
    // 记录节点差异的对象
    let patches = {}
    let index = 0
    dfsNode(oldVDomTree, newVDomTree, index, patches)
    return patches
}

function dfsNode(oldNode, newNode, index, patches) {
    // 保存当前子树的更改
    let curPatches = []
    // 文本内容更改
    if (typeof oldNode === 'string' && typeof newNode === 'string') {
        if (newNode !== oldNode) {
            curPatches.push({type: StateEnums.TXT, content: newNode})
        }
    } else if (newNode != null && oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
        //相同节点，比较属性
        let propsPatches = diffProps(oldNode.props, newNode.props)
        if (propsPatches.length) {
            curPatches.push({type: StateEnums.PROPS, props: propsPatches})
        }
        // 子节点没有ignore属性，比较子节点 
        if (!isIgnoreChildren(newNode)) {
            diffChildren( oldNode.children, newNode.children, index, patches, currentPatch)
        }
    } else if(newNode !== null) {
        // 新旧节点不同，替换
        curPatches.push({type: StateEnums.REPLACE, node: newNode})
    }
    if (curPatches.length) {
        patches[index] = curPatches
    }
}

function diffProps(oldProps, newProps) {
    let propsChange = []
    // 属性被删除
    for (const key in oldNode) {
        if (oldProps.hasOwnProperty(key) && !newProps[key]) {
            propsChange.push({
                prop: key
            })
        }
    }
    // 属性被修改和新增
    for (const key in newProps) {
        if (newProps.hasOwnProperty(key)) {
            const prop = newProps[key]
            // 属性被修改
            if (oldProps[key] && oldProps[key] !== newProps[key]) {
                propsChange.push({
                    prop: key,
                    value: newProps[key]
                })
            } else if(!oldProps[key]) { //属性新增
                propsChange.push({
                    prop: key,
                    value: newProps[key]
                })
            }
        }
    }
    return propsChange

}

function diffChildren(oldChild, newChild, index, patches) {
    let { changes, list } = listDiff(oldChild, newChild, index, patches)
    if (changes.length) {
      if (patches[index]) {
        patches[index] = patches[index].concat(changes)
      } else {
        patches[index] = changes
      }
    }
    // 记录上一个遍历过的节点
    let last = null
    oldChild && oldChild.forEach((item, i) => {
        let child = item && item.children
        if (child) {
          index = last && last.children ? index + last.children.length + 1 : index + 1
          let keyIndex = list.indexOf(item.key)
          let node = newChild[keyIndex]
          // 只遍历新旧中都存在的节点，其他新增或者删除的没必要遍历
          if (node) {
            dfs(item, node, index, patches)
          }
        } else index += 1
        last = item
      })
  }

function listDiff(oldList, newList, index, patches) {
    // 为了遍历方便，先取出两个 list 的所有 keys
    let oldKeys = getKeys(oldList)
    let newKeys = getKeys(newList)
    let changes = []
  
    // 用于保存变更后的节点数据
    // 使用该数组保存有以下好处
    // 1.可以正确获得被删除节点索引
    // 2.交换节点位置只需要操作一遍 DOM
    // 3.用于 `diffChildren` 函数中的判断，只需要遍历
    // 两个树中都存在的节点，而对于新增或者删除的节点来说，完全没必要
    // 再去判断一遍
    let list = []
    oldList && oldList.forEach(item => {
        let key = item.key
        if (isString(item)) {
          key = item
        }
        // 寻找新的 children 中是否含有当前节点
        // 没有的话需要删除
        let index = newKeys.indexOf(key)
        if (index === -1) {
          list.push(null)
        } else list.push(key)
      })
    // 遍历变更后的数组
    let length = list.length
    // 因为删除数组元素是会更改索引的
    // 所有从后往前删可以保证索引不变
    for (let i = length - 1; i >= 0; i--) {
      // 判断当前元素是否为空，为空表示需要删除
      if (!list[i]) {
        list.splice(i, 1)
        changes.push({
          type: StateEnums.Remove,
          index: i
        })
      }
    }
    // 遍历新的 list，判断是否有节点新增或移动
    // 同时也对 `list` 做节点新增和移动节点的操作
    newList && newList.forEach((item, i) => {
        let key = item.key
        if (isString(item)) {
          key = item
        }
        // 寻找旧的 children 中是否含有当前节点
        let index = list.indexOf(key)
        // 没找到代表新节点，需要插入
        if (index === -1 || key == null) {
          changes.push({
            type: StateEnums.Insert,
            node: item,
            index: i
          })
          list.splice(i, 0, key)
        } else {
          // 找到了，需要判断是否需要移动
          if (index !== i) {
            changes.push({
              type: StateEnums.Move,
              from: index,
              to: i
            })
            move(list, index, i)
          }
        }
      })
    return { changes, list }
  }
  
  function getKeys(list) {
    let keys = []
    list && list.forEach(item => {
        let key
        if (isString(item)) {
          key = [item]
        } else if (item instanceof Element) {
          key = item.key
        }
        keys.push(key)
      })
    return keys
}

function isString(s) {
    return typeof s === 'string'
}
module.export = diff