const router = require('koa-router')
const fs = require('fs')

const Router = new router()

// 扫描 routes 文件夹
const scanDir = () => {
  const path = './routes'
  const dir = fs.readdirSync(path)
  dir.forEach(file => {
    const routes = require(`${path}/${file}`)
    Object.keys(routes).forEach(key => {
      const route = key.split(' ')
      const [method, path] = route
      Router[method.toLowerCase()](path, routes[key])
    })
  })
}

// 返回 router 中间件
const routerLoader = () => {
  scanDir()
  return Router.routes()
}

module.exports = routerLoader

// index.js
app.use(routerLoader())
