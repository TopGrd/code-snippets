function runAsync(asyncFn) {
  const iterator = asyncFn()
  ;(function nextHandle(value) {
    const next = iterator.next(value)
    if (next.done) {
      return next.value
    } else {
      return Promise.resolve(next.value).then(nextHandle, err =>
        Promise.resolve(iterator.throw(err).then(nextHandle))
      )
    }
  })()
}

/* function getOne() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 0)
  })
}

function getTwo(params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 0)
  })
}

runAsync(function*() {
  try {
    const user = yield getOne()
    const ss = yield getTwo()
    console.log(user + ss)
  } catch (error) {
    console.error(error)
  }
}) */
