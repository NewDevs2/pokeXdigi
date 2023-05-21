// import  express  from "express";
import { Server } from "socket.io";
import http from 'http'
import fs from 'fs'
// import path from 'path'
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)


// const app = express()
// const server = http.createServer(app)

// app.get('/',(req,res)=>{
//   res.sendFile(__dirname+'/chat.html')
// })

// app.get('/socketcharactor.js',(req,res)=>{
//   res.sendFile(__dirname+'/socketcharactor.js')
// })

const server = http.createServer((req,res)=>{
  if(req.method==='GET'){
    if(req.url==='/'){
      res.writeHead(200,{'Content-Type':'text/html'})
      res.write(fs.readFileSync('./chat.html'))
      res.end()
    }else if(req.url==='/socketcharactor.js'){
      res.writeHead(200,{'Content-Type':'text/javascript'})
      res.write(fs.readFileSync('./socketcharactor.js'))
      res.end()
    }
  }
}).listen(2080)

const io = new Server(server)

const users = []

io.on('connection', (socket)=>{
  console.log(socket.id+'connected')

  // 유저 접속 시, 본인에게 유저 아이디랑 사전 접속된 아이디 전송
  socket.emit('connected',[socket.id, users])
  console.log(users)
  
  // 유저 접속 시, 본인 제외 기존 접속 유저들에게 유저 아이디 전송
  socket.broadcast.emit('anotherUserConnected',socket.id)
  
  users.push({id:socket.id,position:[0,0]})
  // ! io로 안하고 나눈 이유 : 생성될 div 의 이름을 구분 주려고

  // 움직일 경우 이동정보 데이터 수신(배열로)
  socket.on('moving',(data)=>{
    console.log(data+'moving')

    let moveUser = users.find(user=>user.id===socket.id)

    moveUser.position = data

    console.log(users+'moving')

    // 본인 외의 다른 유저들에게 움직인 사람의 유저아이디와 움직인 정보 전송
    socket.broadcast.emit('movingAnotherUser', moveUser)
  })

  socket.on('disconnect',()=>{
    console.log(socket.id)
    
    io.emit('disconnected',socket.id)

    users = users.filter(user=>user.id===socket.id)
    console.log(users+'remove')


  })

})

