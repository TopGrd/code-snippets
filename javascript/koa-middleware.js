function compose(middlewares) {
  if (!Array.isArray(middlewares)) {
    throw new TypeError('Middlewares is must be an array')
  }
  // next() is dispatch(i + 1)
  return function(ctx, next) {
    let index = -1
    // execute first midwares
    return dispatch(0)

    function dispatch(i) {
      if (i < index) {
        return Promise.reject(new Error('next() is called multiple times'))
      }

      index = i
      let fn = middlewares[i]
      if (i === middlewares.length) {
        fn = next // fn = undefined
      }

      if (!fn) {
        return Promise.resolve() // end
      }

      try {
        return Promise.resolve(fn(ctx, () => dispatch(i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

// test case
/* const mids = [
  (ctx, next) => {
    console.log(`${ctx.data} 1 start`)
    ctx.data += 1
    next()
    console.log('1 end')
  },
  (ctx, next) => {
    console.log(`${ctx.data} 2 start`)
    next()
    console.log('2 end')
  },
]

compose(mids)({ data: 1 }) */ // this function result is dispatch(0)

// 1 1 start
// 2 2 start
// 2 end
// 1 end

module.exports = compose
