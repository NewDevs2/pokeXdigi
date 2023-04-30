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

// 소캣에 연결되면
io.on('connection', (socket) => {
  // console.log(socket)

  // 위에서 post로 전송받아서 json화한 파일을 stringify 함
  let userinfo = JSON.parse(fs.readFileSync('./userid.json'))

  // 불필요해서 자료만 빼고 파일삭제
  fs.unlinkSync('./userid.json');

  // socket.userid 를 가져온 닉네임으로 변경
  socket.userid = userinfo.Nicname;

  // 콘솔에 호구 등장 문구
  console.log('새로운 호구 등장', socket.userid)

  // 모든 클라이언트에게 전달할 유저의 아이디.
  io.emit('userid', socket.userid)

  // 클라이언트에게 받아온 데이터
  socket.on('chat', data => {
    console.log(data)

    // 보낸 클라이언트를 제외한 모든 클라이언트에게 해당 자료 보내주기.
    socket.broadcast.emit('chat', data)
  })

  // 퇴장 했을 경우에 대한 이벤트
  socket.on('disconnect', () => {
    console.log(`${socket.userid} 안뇽 또와`)

    // 모든 클라이언트에게 해당 이벤트 전달.
    io.emit('disconnected', () => {
    })
  })

})

// 문제점 : 클라이언트가 새로 들어오면 이름이 바뀐다. 이건 원인은 알듯말듯함
// 스크롤이 안생긴다. 대화가 그냥 사라져버려
// 대화를 db 저장은 아직 안한 부분임.