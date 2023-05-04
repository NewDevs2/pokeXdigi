import http from 'http'
import {Server} from 'socket.io'
import fs from 'fs'
import qs from 'querystring'

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
        const user=decodeURIComponent(names);
        // qs.parse(names)
        console.log(user)
        // console.log(Object.keys(user))

        const page = fs.readFileSync('./chatting.html')
        
        // 쿠키에는 ASCII 코드 외에 넣을 수 없음. 넣고 싶으면 encode 해서 넣어야 한다. = 한글안됨
        res.writeHead(200,{'Content-Type':'text/html','Set-Cookie':`${encodeURI(user)}; HttpOnly`})

        console.log(decodeURIComponent(req.headers.cookie))
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