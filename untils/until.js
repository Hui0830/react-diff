export  function isString(str) {
        return typeof str === 'string';
}
export const changeType = {
    TEXT : 0,       // text更改
    PROPS : 1,      // 属性更改
    INSERT: 2,      // 插入操作
    MOVE: 3,        // 移动操作
    DELETE: 4,      // 删除操作
    REPLACE: 5     // 替换操作
  }
  
export function move(arr, oldIndex, newIndex) {
    while (oldIndex < 0) {
      oldIndex += arr.length
    }
    while (newIndex < 0) {
      newIndex += arr.length
    }
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length
      while (k-- + 1) {
        arr.push(undefined)
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
    return arr
}