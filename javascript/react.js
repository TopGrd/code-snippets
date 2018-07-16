const constants = {
  TextElement: '$$text',
}

const element = {
  type: 'div',
  props: {
    children: [
      {
        type: constants.TextElement,
        props: {
          nodeValue: 'Foo',
        },
      },
    ],
  },
}

function render(element, parentDOM) {
  const { type, props } = element

  const isTextElemnt = type === '$$Text'
  const dom = isTextElemnt
    ? document.createTextNode('')
    : document.createElement(type)

  const isListener = name => name.startsWith('on')
  Object.keys(props)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substr(2)
      dom.addEventListener(eventType, props[name])
    })

  const isAttribte = name => !isListener(name) && name !== 'children'
  Object.keys(props)
    .filters(isAttribte)
    .forEach(name => (dom[name] = props[name]))

  const children = props.children || []
  children.forEach(child => render(child, dom))
  parentDOM.appendChild(dom)
}

function createElement(type, config, ...args) {
  const props = Object.assign({}, config)
  const hasChildren = args.length > 0
  const children = hasChildren ? [].concat(args) : []
  props.children = children
    .filter(child => child !== null && c !== false)
    .map(c => (c instanceof Object ? c : createTextElement(c)))

  return { type, props }
}

function createTextElement(value) {
  return createElement(constants.TextElement, { nodeValue: value })
}

/** @jsx createElement */
// const element = (
//   <div id="container">
//     <input value="foo" type="text" />
//     <a href="/bar">bar</a>
//     <span onClick={e => alert('Hi')}>click me</span>
//   </div>
// )

// // after transform
// const element = createElement(
//   "div",
//   { id: "container" },
//   createElement("input", { value: "foo", type: "text" }),
//   createElement(
//     "a",
//     { href: "/bar" },
//     "bar"
//   ),
//   createElement(
//     "span",
//     { onClick: e => alert("Hi") },
//     "click me"
//   )
// );
