import React from 'react'

const ToggleContext = React.createContext({
  on: false,
  toggle: () => {},
})

class Toggle extends React.Component {
  static On = ({ children }) => (
    <ToggleContext.Consumer>
      {contextValue => contextValue.on && children}
    </ToggleContext.Consumer>
  )

  static Off = ({ children }) => (
    <ToggleContext.Consumer>
      {contextValue => !contextValue.on && children}
    </ToggleContext.Consumer>
  )

  static Button = ({ children }) => (
    <ToggleContext.Consumer>
      {contextValue => (
        <button onClick={contextValue.toggle}>
          {console.log(contextValue)}
          {children}
        </button>
      )}
    </ToggleContext.Consumer>
  )

  static defaultProps = {
    onToggle() {
      console.log('object')
    },
  }

  state = {
    on: false,
    // toggle 写进来 则 ToggleContext.Provider 的 value 不会每次重新生成新的对象，避免子组件没必要的重渲染
    toggle: () =>
      this.setState({ on: !this.state.on }, () =>
        this.props.onToggle(this.state.on)
      ),
  }

  render() {
    return (
      <ToggleContext.Provider value={this.state}>
        {this.props.children}
      </ToggleContext.Provider>
    )
  }
}

export default Toggle
