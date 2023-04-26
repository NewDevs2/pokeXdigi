import http from "http"
// ws 설치
import WebSocket from "ws"

const server = http.createServer((req,res)=> {
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'})
  res.end()
});

// const wss = new WebSocket.Server({server});
// // 이것만으로 확인하긴 어렵고 연결을 시도할 수 있는 클라이언트를 작성하지 않아서 정상동작 확인이 어려움?
// wss.on("connection", (ws) => {
//   console.log("클라이언트가 연결 됐습니다")


// ws.on("message", (message) => {
//   console.log(`전달 받은 메시지는 ${message}`);
//   wss.clients.forEach((client) => {
//     // 만약 클라이언트의 준비 상태가 웹소켓이 오픈 된 상태라면
//     if(client.readyState === WebSocket.OPEN) {
//       client.send(message);
//     }
//   })
// })

// ws.on("close",()=> {
//   console.log("클라이언트가 접속을 종료했습니다.")
// })});
console.log(server)
server.listen(8080,()=> {
  console.log("웹소켓 서버가 8080포트에서 실행됐습니다")
})