import http from 'http'
import {Server} from 'socket.io'
import fs from 'fs'

const server = http.createServer((req,res)=>{
  if(req.method==='GET'){
    if(req.url==='/'){
      const page = fs.readFileSync('./index.html')
      res.writeHead(200, {'Content-Type':'text/html'})
      res.write(page)
      res.end()
    }
  }
  if(req.method==='POST'){
    if(req.url==='/chatting'){
      let names=''
      req.on('data',(data)=>{
        names +=data
      })
      req.on('end',()=>{
        // console.log(decodeURIComponent(names))
        const page = fs.readFileSync('./chatting.html')
        
        res.writeHead(200,{'Content-Type':'text/html','Set-Cookie':`${decodeURIComponent(names)}; `})
        res.write(page)
        res.end()
      })
    }
  }
}).listen(2080)

const io = new Server(server);

io.on('connection',(socket)=>{
  io.emit('connectted',socket.id)

  socket.on("disconnect",()=>{
    console.log("잘가~")
    io.emit("disconnected",socket.id)
  })

  socket.on("chat",(data)=>{
    console.log(data)
    socket.broadcast.emit("chat",data)
  })

})