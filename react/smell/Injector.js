/**
 * React 使用高阶组件实现 依赖注入
 */

function inject(props) {
  return function(Comp) {
    class Injector extends React.Component {
      render() {
        return <Comp {...props} {...this.props} />
      }
    }

    return Injector
  }
}

const Title = ({ title }) => <h2>{title}</h2>

const HOCTitle = inject(props)(Title)
