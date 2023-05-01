import http from "http";
// ? socket.io의 Server 클래스 가져오기
import { Server } from "socket.io";
import fs from "fs";
import { Console } from "console";
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(fs.readFileSync("./test.html", "utf-8"));
});

// ? Server 클래스 새 인스턴스 생성
const io = new Server(server);
// 내장 이벤트 connection
io.on("connection", (socket) => {
  // send info라는 이벤트가 실행 되면 넘겨 받은 데이터
  //  다시 클라이언트로 전송
  socket.on("send info", (data) => {
    // 트래픽을 줄이기 위해 JSON 데이터로 교환
    const beforeJsonData = JSON.parse(data)
    const jsonData = JSON.stringify(beforeJsonData);
    // 클라이언트에게 받은 데이터 다시 보내줌
    io.emit("send info", jsonData);
  });
  // 연결이 끊겼을 때
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(8080, (err) => {
  if (err) {
    return console.log("연결이 원할하지 않습니다.", err);
  }
  console.log("성공");
});