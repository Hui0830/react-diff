import {isString} from '../untils/until'

// 元素构造函数html的DOM表示程JavaScript对象

export default class Element {

    constructor(tagName, props, children, key) {
      this.tagName = tagName
      this.props = props

      if (Array.isArray(children)) {

        this.children = children

      } else if (isString(children)) {

        this.key = children
        this.children = null

      }
      if (key) this.key = key
    }
    // 渲染
    render(container) {
      let root = this._createElement(
        this.tagName,
        this.props,
        this.children,
        this.key
      )
      container.appendChild(root)
      return root
    }
    create() {
      return this._createElement(this.tagName, this.props, this.children, this.key)
    }
    // 创建节点
    _createElement(tagName, props, child, key) {
      // 通过 tagName 创建节点
      let el = document.createElement(tagName)
      // 设置节点属性
      for (const key in props) {
        if (props.hasOwnProperty(key)) {
          const value = props[key]
          el.setAttribute(key, value)
        }
      }
      if (key) {
        el.setAttribute('key', key)
      }
      // 递归添加子节点
      if (child) {
        child.forEach(element => {
          let child
          if (element instanceof Element) {
            child = this._createElement(
              element.tagName,
              element.props,
              element.children,
              element.key
            )
          } else {
            child = document.createTextNode(element)
          }
          el.appendChild(child)
        })
      }
      return el
    }
  }