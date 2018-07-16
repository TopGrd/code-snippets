const http = require('http')
const Emitter = require('events')
const compose = require('../javascript/koa-middleware')

const context = {
  _body: null,

  get body() {
    return this._body
  },

  set body(val) {
    this._body = val
    this.res.end(this._body)
  }
}

class Koa extends Emitter {
  constructor() {
    super()
    this.middlewares = []
    this.context = Object.create(context)
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    return server.listen(...args)
  }

  onerror(err) {
    console.log(err)
  }

  use(fn) {
    if (typeof fn === 'function') {
      this.middlewares.push(fn)
    }
  }

  callback() {
    if (this.listeners('error').length === 0) {
      this.on('error', this.onerror)
    }

    const that = this

    function handleRequest(req, res) {
      const context = that.createContext(req, res)
      const middlewares = that.middlewares
      compose(middlewares)(context).catch(err => that.onerror(err))
    }

    return handleRequest
  }

  createContext(req, res) {
    const context = Object.create(this.context)
    context.req = req
    context.res = res
    return context
  }
}

// a middleware logger
const logger = async (ctx, next) => {
  let res = ctx.res
  console.log(`<-- ${ctx.req.method} ${ctx.req.url}`)
  await next()
  res.on('finish', () =>  console.log(`--> ${ctx.req.method} ${ctx.req.url}`))
}

module.exports = Koa
