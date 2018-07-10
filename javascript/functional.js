// 局部应用 偏函数
function partial(fn,...presetArgs) {
	return function partiallyApplied(...laterArgs){
		return fn( ...presetArgs, ...laterArgs )
	}
}

// 柯理化
function curry(fn) {
  const len = fn.length
  return function curried() {
    var args = [].slice.call(arguments)
    if (args.length < len) {
      return function () {
        return curried.apply(null, args.concat([].slice.call(arguments)))
      }
    } else {
      return fn.apply(null, args)
    }
  }
}

// 只接收一个参数
function unary(fn) {
  return function onlyOneArg(arg) {
    return fn(arg)
  }
}

// 特定的函数只允许输入函数， exp: Promise.
function constant(v) {
  return function () {
    return v
  }
}


p1.then(foo).then(() => p2).then(bar)
p1.then(foo).then(constant(p2)).then(bar)

// 将数组参数分散
function spreadArgs(fn) {
  return function(args) {
    return fn(...args)
  }
}

// 将参数聚合为数组
function getherArgs(fn) {
  return function(...args) {
    return fn(args)
  }
}


function not(fn) {
  return function negated(...args) {
    return !fn(...args)
  }
}

function when(predicate, fn) {
  return function contional(...args) {
    if (predicate(...args)) {
      return fn(...args)
    }
  }
}

// 2个函数组合
function compose2(fn1, fn2) {
  return function composeFn(originValue) {
    return fn2(fn1(originValue))
  }
}

// 函数组合，从右至左
function composeES5() {
  const list = Array.prototype.slice.apply(arguments)
  return function composed(result) {
    while (list.length > 0) {
      result = list.pop()(result)
    }
    return result
  }
}

// 第一次传递参数只能为1个
function composeFirstOne() {
  const fns = Array.prototype.slice.apply(arguments)
  return function composed(result) {
    return fns.reverse().reduce(function reducer(result, fn) {
      return fn(result)
    }, result)
  }
}

function compose() {
  const fns = Array.prototype.slice.apply(arguments)
  return fns.reverse().reduce(function reducer(fn1, fn2) {
    return function composed(...args) {
      return fn2(fn1(...args))
    }
  })
}
