// function reducer(state, action) {}

function createStore(reducer, enhancer) {
  let state = null
  let listeners = []

  if (typeof enhancer === 'function') {
    enhancer(createStore)(reducer)
  }

  function subscribe(listener) {
    listeners.push(listener)
  }

  function unSubscribe(params) {
    listeners.remove(listener)
  }

  function getState() {
    return state
  }

  function dispatch(action) {
    state = reducer(state, aciton)
    listeners.forEach(listener => listener())
  }

  dispatch({})

  return { getState, dispatch, subscribe, unSubscribe }
}

// let rootReducer = combineReducers({
//   userInfoReducer,
//   bannerDataReducer,
//   recordReducer,
//   clientInfoReducer
// }
// rootReducers(state, aciton)

function combineReducers(reducers) {
  let currentState = {}
  return function reducer({ state, aciton }) {
    Object.keys(reducers).forEach(
      key => (currentState[key] = reducers[key](state, action))
    )

    return currentState
  }
}

function compose(...funs) {
  return funs.reduce((acc, fn) => (...args) => fn(acc(...args)))
}

// const middleware = [thunk, logger]
// const store = createStore(rootReducer, applyMiddleware(...middleware))

// const loggerMiddleWare = ({ getState, dispatch }) => next => action => {
//   console.log(getState())
//   next(action)
//   console.log(getState())
// }

function applyMiddleWares(...middlewares) {
  return function(createStore) {
    return function(reducer) {
      const store = createStore(reducer)
      const { getState } = store
      let dispatch = store.dispatch
      let chain
      // 对dispatch进行包装
      const middlewareApi = {
        // 如果使用 dispatch: dispatch,则所有的 dispatch 都会引用一个，一个改变，则所有中间件的 dispatch 都改变
        dispatch: action => dispatch(aciton),
        getState,
      }

      // mid = next => action => {}
      // const mid = middleware[middlewareApi]

      chain = middlewares.map(middleware => middleware[middlewareApi])

      dispatch = compose(...middlewares)(store.dispatch)

      // dispatch = aciton => {}
      // next 就是包装后的 dispatch
      // dispatch = mid(store.dispatch)
      return {
        ...store,
        dispatch,
      }
    }
  }
}
