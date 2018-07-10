import React, { Component } from 'react'

class Toggle extends React.Component {
  static defaultProps = {
    onToggle() {
      console.log('object')
    },
  }

  state = { on: true }

  toggle = () =>
    this.setState({ on: !this.state.on }, this.props.onToggle(this.state.on))

  render() {
    return this.props.renderToggle({
      on: this.state.on,
      toggle: this.state.toggle,
    })
  }
}

export const ToggleApp = (
  <Toggle
    onToggle={on => console.log('toggle', on)}
    renderToggle={({ on, toggle }) => (
      <div>
        {on ? 'on' : 'off'}
        <ht />
        <button onClick={toggle}>toggle</button>
      </div>
    )}
  />
)

export default Toggle
