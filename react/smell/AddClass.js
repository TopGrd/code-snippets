function addClass(Comp) {
  return class WrapperComponent extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return <Comp className={`${this.props.className}`} />
    }
  }
}
