import http from "http";
// ? socket.io의 Server 클래스 가져오기
import { Server } from "socket.io";
import fs from "fs";
import { Console } from "console";
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(fs.readFileSync("./test.html", "utf-8"));
});
// console.log(Server)

// !소켓 서버 생성
// 웹 서버와 소켓 서버
// ? Server 클래스 새 인스턴스 생성
const io = new Server(server);
// 내장 이벤트 connection을 실행
io.on("connection", (socket) => {
  // console.log("a user connected");
  // 메시지가 왔을 때
  // console.log(socket)
  socket.on("send info", (data) => {
    // console.log(data.msg);
    // JSON.parse(data);
    // console.log(data);
    const beforeJsonData = JSON.parse(data)
    // console.log(jsonData)
    const jsonData = JSON.stringify(beforeJsonData);
    // console.log(jsonData);
    // 클라이언트에게 받은 데이터 다시 보내줌
    io.emit("send info", jsonData);
    // JSON.parse(msg)
    // console.log("sendInfo: " + data);
    // io.emit("sendInfo", msg);
  });
  // 아이디가 들어왔을 때
  // socket.on("user id", (userId) => {
  //   JSON.parse(userId);
  //   console.log("user id" + userId);
  //   io.emit("user id", userId);
  // });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(2222, (err) => {
  if (err) {
    return console.log("연결이 원할하지 않습니다.", err);
  }
  console.log("성공");
});
// import http from 'http';
// import { Server } from 'socket.io';
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.end('Hello World\n');
// });
// const io = new Server(server);
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
// server.listen(2222, () => {
//   console.log('Server is listening on port 2222');
// });

// import http from "http";
// import {Server} from "socket.io";
// import fs from "fs";

// const server = http.createServer((req,rep) => {
 
//   if(req.url === '/') {
//     rep.writeHead(200,{'Content-Type' : 'text/html;'})
//     rep.write(fs.readFileSync("./test.html"))
//     rep.end()
//   }
//   if(req.url.includes("/test3.js")) {
//     rep.writeHead(200,{'Content-Type' : 'text/javascript;'})
//     rep.write(fs.readFileSync("./test3.js"))
//     rep.end()
//   }
// });
// // // Server 클래스를 가져와서 안에 있는 메서드로 무언가를 하는 듯
// // const io = new Server(server);
// // // console.log(io)

// // io.on("connection", (socket) => {
// //   console.log("유저가 연결 됐습니다");

// //   socket.on("disconnect", () => {
// //     console.log("유저가 연결에 실패했습니다");
// //   });

// //   socket.on("chatMessage", (msg) => {
// //     console.log("message:" + msg);
// //     io.emit("chat message",msg);
// //   });
// // });
// const io = new Server(server);

// io.on("connection", (socket) => {
//   console.log("유저가 연결 됐습니다");

//   socket.on("disconnect", () => {
//     console.log("유저가 연결을 종료했습니다");
//   });

//   socket.on("chat message", (msg) => {
//     console.log("message:" + msg);
//     io.emit("chat message",msg);
//   });
// });


// server.listen(8080,()=> {
//   console.log("정상 연결 됨")
// })