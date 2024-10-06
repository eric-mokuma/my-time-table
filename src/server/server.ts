import * as Path from 'node:path'
import express from 'express'
import router from './routes/routers'

const server = express()
server.use(express.json())

server.use('/api/v1/users', router)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

// Correctly exporting the server
export default server
