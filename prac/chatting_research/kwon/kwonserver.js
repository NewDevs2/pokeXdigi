import http from "http";
import fs from "fs";
import { Server } from "socket.io";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(fs.readFileSync("./kwonclient.html", "utf-8"));
});
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    // try{
    //   if(msg !== ""){
    //     console.log("message: " + msg);
    //     io.emit("chat message", msg);
    //   }
    // }
    // catch(error){

    // }

    try {
      if (msg !== "") {
        const asdf = JSON.stringify(msg);
        JSON.parse(asdf);
        console.log( asdf.id );
        io.emit("chat message", asdf);
      } else {
        alert("공백을 입력 하셨습니다.");
      }
    } catch (error) {}
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
