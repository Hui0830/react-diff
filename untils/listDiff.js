import getKeys from './getKeys';
import { changeType, isString } from './until';
export function listDiff(oldList, newList, index, patches) {
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
    oldList &&
      oldList.forEach((item, i) => {
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
          type: changeType.DELETE,
          index: i
        })
      }
    }
    // 遍历新的 list，判断是否有节点新增或移动
    // 同时也对 `list` 做节点新增和移动节点的操作
    newList &&
      newList.forEach((item, i) => {
        let key = item.key
        if (isString(item)) {
          key = item
        }
        // 寻找旧的 children 中是否含有当前节点
        let index = list.indexOf(key)
        // 没找到代表新节点，需要插入
        if (index === -1 || key == null) {
          changes.push({
            type: changeType.INSERT,
            node: item,
            index: i
          })
          list.splice(i, 0, key)
        } else {
          // 找到了，需要判断是否需要移动
          console.log(key)
          if (index !== i) {
            changes.push({
              type: changeType.MOVE,
              from: index,
              to: i
            })
            move(list, index, i)
          }
        }
      })
    return { changes, list }
  }