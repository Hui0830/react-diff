import { changeType } from '../untils/until';
import { listDiff } from '../untils/listDiff';
import { propsDiff } from '../untils/propsDiff';

/* 
React 虚拟DOM的三个策略：
1. Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
    - 即对tree的差异比较只进行同一层次的比较，实现了从时间复杂度O（n^3）到O(n)的优化；

2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。

3. 对于同一层级的一组子节点，它们可以通过唯一id进行区分。



*/

export default function diff(oldDomTree, newDomTree) {

    // 用于记录差异
    let pathchs = {}

    // 一开始的索引为 0，采用递归进行逐层比较
    diffWalking(oldDomTree, newDomTree, 0, pathchs)
    return pathchs
}

/**
* @param oldNode 旧DOM树
* @param newNode 新DOM树
* @param index 记录对比层次
* @param patches 差异队列
**/

function diffWalking(oldNode, newNode, index, patches) {
  // 用于保存子树的更改
  let curPatches = []
  
  // 1.没有新的节点，那么什么都不用做
  if (!newNode) {

  } else if (newNode.tagName === oldNode.tagName && newNode.key === oldNode.key) { // 3.新的节点的 tagNameName 和 key（可能都没有） 和旧的相同，开始遍历子树

    // 判断属性是否变更
    let props = propsDiff(oldNode.props, newNode.props)
    
    if (props.length){
        curPatches.push({ type: changeType.PROPS, props })
    }
    
    // 遍历子树，计算子树差异
    diffChildren(oldNode.children, newNode.children, index, patches)

  } else {   // 2.新的节点的 tagNameName 和 `key` 和旧的不同，就替换

    // 节点不同，需要替换
    curPatches.push({ type: changeType.REPLACE, node: newNode })

  }
  // 记录
  if (curPatches.length) {
    if (patches[index]) {
      patches[index] = patches[index].concat(curPatches)
    } else {
      patches[index] = curPatches
    }
  }
}

function diffChildren(oldChild, newChild, index, patches) {
  let { changes, list } = listDiff(oldChild, newChild, index, patches)
  console.log(changes,list);
  if (changes.length) {
    if (patches[index]) {
      patches[index] = patches[index].concat(changes)
    } else {
      patches[index] = changes
    }
  }
  // 记录上一个遍历过的节点
  let last = null
  oldChild &&
    oldChild.forEach((item, i) => {
      let child = item && item.children
      if (child) {
        index =
          last && last.children ? index + last.children.length + 1 : index + 1
        let keyIndex = list.indexOf(item.key)
        let node = newChild[keyIndex]
        // 只遍历新旧中都存在的节点，其他新增或者删除的没必要遍历
        if (node) {
          diffWalking(item, node, index, patches)
        }
      } else index += 1
      last = item
    })
}