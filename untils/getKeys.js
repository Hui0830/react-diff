import {isString} from './until';
export default function getKeys(list) {
    let keys = []
    let text
    list &&
      list.forEach(item => {
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