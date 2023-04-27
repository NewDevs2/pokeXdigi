import http from "http"
import {Server} from "socket.io"

const server = http.createServer((req,rep) => {
  rep.writeHead(200,{'Content-Type' : 'text/html;'})
  rep.end()
});
// Server 클래스를 가져와서 안에 있는 메서드로 무언가를 하는 듯
const io = new Server(server);
console.log(io)

io.on("connection", (socket) => {
  console.log("유저가 연결 됐습니다");

  socket.on("disconnect", () => {
    console.log("유저가 연결에 실패했습니다");
  });

  socket.on("chatMessage", (msg) => {
    console.log("message:" + msg);
    io.emit("chat message",msg);
  });
});


server.listen(8080,()=> {
  console.log("정상 연결 됨")
})