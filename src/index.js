
import Element from '../virtual/element'
import diff from '../virtual/diff'
import patch from '../virtual/patch'

// 有key时
const li_1 = new Element(
      'li',
      {
        class: 'item',
        id: 'item_1',
      },
      ['item_1']
);
const li_2 = new Element(
  'li',
  {
    class: 'item',
    id: 'item_2',
  },
  ['item_2']
)
const li_3 = new Element(
  'li',
  {
    class: 'item',
    id: 'item_3',
  },
  ['item_3']
)
const li_4 = new Element(
  'li',
  {
    class: 'item',
    id: 'item_4',
  },
  ['item_4']
)

const ul_1 = new Element(
  'ul',  // tagName
  {       // props
    class: 'my-ul',
  },
  [li_1, li_2, li_3, li_4],  // children
  'ul'     // key
);
const ul_2 = new Element(
  'ul',  // tagName
  {       // props
    class: 'my-ul',
  },
  [li_1, li_3, li_2, li_4],  // children
  'ul'     // key
);


const button = new Element(
  'button',
  {
    id: 'btn',
  },
  ['删除item2']
)

// const container = new Element(
//   'div',
//   {
//     class: 'contaier',
//   },
//   [ul_1, button]
// )
const app = document.getElementById('app')
let root = ul_1.render(app);

let pathchs = diff(ul_1, ul_2);

// let pathchs = diff(test1, test2)
console.log(pathchs)

setTimeout(() => {
  console.log('开始更新')
  patch(root, pathchs)
  console.log('结束更新')
}, 1000)