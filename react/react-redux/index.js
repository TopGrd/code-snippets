import React from 'react'
import connect from './connect'

class Provider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store,
    }
  }

  render() {
    return this.props.children
  }
}

export { Provider, connect }
