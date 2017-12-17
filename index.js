const http = require('http')
const app = require('./app')

const port = process.env.PORT || 6666

const server = http.createServer(app)

server.listen(port)
