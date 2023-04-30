// import { Socket } from 'dgram'
import http from 'http'
import { Server } from 'socket.io'
import fs, { readFileSync, unlinkSync, writeFileSync } from 'fs'
import qs from 'querystring'
import { writeFile } from 'fs/promises'
// import  {socket}  from './seongsockettest.js'

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      const page = fs.readFileSync('./chatstart.html')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(page)
      res.end()
    }
    if (req.url.includes('seongsocketclient.js')) {
      const page = fs.readFileSync('./seongsocketclient.js')
      res.writeHead(200, { 'Content-Type': 'text/javascript' })
      res.write(page)
      res.end()
    }
    if (req.url.includes('tagMaker.js')) {
      const page = fs.readFileSync('../../src/models/tag/tagMaker.js')
      res.writeHead(200, { 'Content-Type': 'text/javascript' })
      res.write(page)
      res.end()
    }
  } else if (req.method === 'POST') {
    if (req.url === '/chat') {
      let datas = ""
      req.on('data', (data) => {
        datas += data
      })
      req.on('end', () => {
        writeFileSync('./userid.json', JSON.stringify(qs.parse(datas)))
        const page = fs.readFileSync('./seongtest.html')
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(page)
        res.end()
      })
    }
  }
}).listen(8080)

const io = new Server(server)
// 서버 정보를 소캣 io에게 넘겨주고 구동을 한다.
// 경로는 해당 경로를 통해 통신을 수행하며, 생략 시 디폴트는 /socket.io

io.on('connection', (socket) => {
  // console.log(socket)
  let userinfo = JSON.parse(fs.readFileSync('./userid.json'))
  fs.unlinkSync('./userid.json');
  socket.userid = userinfo.Nicname;

  console.log('새로운 호구 등장', socket.userid)

  io.emit('userid', socket.userid)

  socket.on('chat', data => {
    io.emit('chat', data)
  })

  socket.on('disconnect', () => {
    console.log(`${socket.userid} 안뇽 또와`)
    io.emit('disconnected', () => {
    })
  })
})