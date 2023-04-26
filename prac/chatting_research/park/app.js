import http from "http";
import fs from "fs";

const server = http.createServer(function (req, rep) {
  if (req.method === "GET") {
    const page = fs.readFileSync("./index.html");
    rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
    rep.write(page);
    rep.end();
  }
  if (req.method === "CONNECT") {
    console.log("클라이언트가 요청했다.");
    rep.writeHead(200);
    rep.end();
  }
});

server.listen(5050, function (error) {
  if (error) {
    throw error;
  }
  console.log("server is running at localhost:5050");
});
