import http from "http";
import fs from "fs";
import { error } from "console";
import { WebSocketServer } from "ws";

const server = http.createServer((req, rep) => {
  if ((req.url = "/")) {
    const page = fs.readFileSync("./index.html");
    rep.writeHead(200, { "Content-Type": "text/html; UTF-8;" });
    rep.write(page);
    rep.end();
  }
});

const wss = new WebSocketServer({ port: 3030 });

wss.on("connection", function connection(ws) {
  console.log("클라이언트가 연결되었습니다");

  ws.on("message", function incoming(message) {
    console.log(`수신받음: ${message}`);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.send("안녕하세요.");
});

server.listen(5050, (err) => {
  console.log("server is runnig . . .");
  if (err) {
    throw error;
  }
});
