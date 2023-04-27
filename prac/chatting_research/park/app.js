import http from "http";
import fs from "fs";

const server = http.createServer(function (req, rep) {
  if (req.method === "GET") {
    const page = fs.readFileSync("./index.html");
    rep.writeHead(200, { "Content-Type": "text/html; UTF-8" });
    rep.write(page);
    rep.end();
  }
});

server.listen(5050, function (error) {
  console.log("server is on");
  if (error) {
    throw error;
  }
});
