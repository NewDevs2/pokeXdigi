// import { Socket } from 'dgram'
import http from 'http'
import {Server} from 'socket.io'
import fs from 'fs'
// import  {socket}  from './seongsockettest.js'

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      const page = fs.readFileSync('./seongtest.html')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(page)
      res.end()
    }
    if(req.url.includes('seongsocketclient.js')){
      const page = fs.readFileSync('./seongsocketclient.js')
      res.writeHead(200, { 'Content-Type': 'text/javascript' })
      res.write(page)
      res.end()
    }
    if(req.url.includes('tagMaker.js')){
      const page = fs.readFileSync('../../src/models/tag/tagMaker.js')
      res.writeHead(200, { 'Content-Type': 'text/javascript' })
      res.write(page)
      res.end()
    }
  }
}).listen(2080)

const io = new Server(server)
// 서버 정보를 소캣 io에게 넘겨주고 구동을 한다.
// 경로는 해당 경로를 통해 통신을 수행하며, 생략 시 디폴트는 /socket.io

io.on('connection', (socket) => {

  console.log('새로운 호구 등장',socket.id)

  socket.emit('userid', `${socket.id}`)
  socket.emit('text', `${socket.text}`)
})


// io.on('disconnection', (socket) => {
//   console.log('잘가', socket.id);
//   console.log(socket.interval)
//   clearInterval(socket.interval)
// })