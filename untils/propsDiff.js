/*  
    计算 Props 分以下三步骤：(增、删、改)
        1. 遍历 oldProps 查看是否存在删除的属性
        2. 遍历 newProps 查看是否有属性值被修改
        3. 查看是否有属性新增 
*/
export function propsDiff(oldProps, newProps) {

    // 存放差异属性
    let propsChange = [];

    // 1. 遍历 oldProps 查看是否存在删除的属性；（删除只需要记录需要删除的属性key）
    for (const key in oldProps) {
      if (oldProps.hasOwnProperty(key) && !newProps[key]) {
        propsChange.push({
          prop: key
        })
      }
    }

    // 遍历newProps属性
    for (const key in newProps) {
      if (newProps.hasOwnProperty(key)) {

        // 2. 如果属性有修改，将修改的属性key-value存入差异队列(修改需要保存key和修改后的value)
        if (oldProps[key] && oldProps[key] !== newProps[key]) {
          propsChange.push({
            prop: key,
            value: newProps[key]
          });
          //  3. 如果有属性新增，则存入差异队列(新增需要保存新增的key和value)
        } else if (!oldProps[key]) {
          propsChange.push({
            prop: key,
            value: newProps[key]
          })
        }
      }
    }
    return propsChange
  }