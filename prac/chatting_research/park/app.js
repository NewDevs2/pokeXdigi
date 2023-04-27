import { createServer } from "http";
import fs from "fs";
import { Server } from "socket.io";
import { Socket } from "dgram";

const httpServer = createServer((req, rep) => {
  if (req.url === "/") {
    const page = fs.readFileSync("./index.html");
    rep.writeHead(200, { "Content-Type": "text/html; UTF-8" });
    rep.write(page);
    rep.end();
  }
});

const io = new Server(httpServer);

io.on("connection", (Socket) => {
  console.log("유저가 접속했네요.");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

httpServer.listen(5050, function (error) {
  console.log("server is runnig");
  if (error) {
    throw error;
  }
});
