import React, { Component } from 'react'

class Toggle extends React.Component {
  static On = ({ on, children }) => on && children
  static Off = ({ on, children }) => !on && children
  static Button = ({ on, toggle, children }) => (
    <button onClick={toggle}>{children}</button>
  )
  static defaultProps = {
    onToggle() {
      console.log('object')
    },
  }
  state = { on: true }

  toggle = () =>
    this.setState({ on: !this.state.on }, this.props.onToggle(this.state.on))

  render() {
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle,
      })
    )

    console.log(children)

    return <div>{children}</div>
  }
}

export const toggleApp = (
  <Toggle onToggle={on => console.log('toggle', on)}>
    <Toggle.On>ON</Toggle.On>
    <Toggle.Off>OFF</Toggle.Off>
    <Toggle.Button>Toggle</Toggle.Button>
  </Toggle>
)

export default Toggle
