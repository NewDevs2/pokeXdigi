import http from "http";
import fs from "fs";
import { Server } from "socket.io";

const httpServer = http.createServer((req, rep) => {
  const page = fs.readFileSync("./index.html");
  rep.writeHead(200, { "Content-Type": "text/html; charset:UTF-8;" });
  rep.write(page);
  rep.end();
});

const io = new Server(httpServer);

httpServer.listen(2080, (err) => {
  if (err) {
    throw err;
  }
  console.log("server is runnig...");
});

io.on("connection", (socket) => {
  console.log("유저가 접속했습니다");
  socket.on("disconnect", () => {
    console.log("유저가 나갔습니다.");
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});
