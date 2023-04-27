import http from "http";
import WebSocket from "ws";

const server = http.createServer((req, res) => {
let socket = new WebSocket("ws://localhost:8080")

socket.onopen = function(e) {
  console.log("open커넥션이 만들어 졌음");
  console.log("데이터를 서버에 전송해보세요");
  // 메시지를 보낸다
  socket.send("내 이름은 코난 탐정이죠");
};
// 메시지가 오면 함수 실행 
socket.onmessage = function(event) {
  console.log(`${event.data}`);
};

socket.onclose = function(event) {
  if(event.wasClean) {
    console.log("close 커넥션이 정상 종료 됨");
  } else {
    // 프로세스가 죽거나 네트워크 장애가 있으면 envent.code가 1006이 됨
    console.log("close 커넥션이 죽었음")
  }
};
// 에러 무한 반복ㄷㄷ
socket.onerror = function(error) {
  console.log('에러');
}

  
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end();
});
``


server.listen(8080, (err) => {
  if(err) {console.log(err)}
  console.log("웹소켓 서버가 8080포트에서 실행됐습니다");
});