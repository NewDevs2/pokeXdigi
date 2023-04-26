import http, { Server } from "http";
import WebSocket from "ws";

const server = http.createServer((req, res) => {
  // 안에서 직접 포트 번호를 지정해주면 동작은 됨
  // 포트로 지정해줘도 되고 내부에서는 server도 담김
  const wss = new Server({server})
  wss.on("connection", () => {
  console.log("클라이언트가 연결 됐습니다");
  
})
  
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end();
});



server.listen(8080, (err) => {
  if(err) {console.log(err)}
  console.log("웹소켓 서버가 8080포트에서 실행됐습니다");
});