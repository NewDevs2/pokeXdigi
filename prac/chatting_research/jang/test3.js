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

import http from "http";
import { Server } from "socket.io";
import fs from "fs";
import { Console } from "console";
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(fs.readFileSync("./test.html", "utf-8"));
});
// !소켓 서버 생성
// 웹 서버와 소켓 서버를 구축
const io = new Server(server);
// 내장 이벤트 connection을 실행
io.on("connection", (socket) => {
  console.log("a user connected");
  // 메시지가 왔을 때
  socket.on("chat message", (msg) => {
    JSON.parse(msg);
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
  // 아이디가 들어왔을 때
  socket.on("user id", (inputUserId) => {
    // const parsedinputUserId = JSON.parse(inputUserId);
    JSON.parse(inputUserId);
    // console.log("user id" + parsedinputUserId);
    // io.emit("user id", parsedinputUserId);
    io.emit("chat message", inputUserId);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(2222, (err) => {
  if (err) {
    return console.log("something bad happened", err);
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