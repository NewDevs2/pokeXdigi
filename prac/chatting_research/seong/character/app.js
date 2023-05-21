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

io.on('connection', (socket)=>{
  console.log('connected')
  console.log(socket.id)

  socket.emit('connected',socket.id)
  socket.broadcast.emit('anotherUserConnected',socket.id)

  socket.on('moving',(data)=>{
    console.log(data)
    socket.broadcast.emit('movingAnotherUser',[socket.id,data])
  })
})

