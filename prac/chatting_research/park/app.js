import http from "http";
import fs from "fs";
import { error } from "console";

const server = http.createServer((req, rep) => {
  if ((req.url = "/")) {
    const page = fs.readFileSync("./index.html");
    rep.writeHead(200, { "Content-Type": "text/html; UTF-8;" });
    rep.write(page);
    rep.end();
  }
});

server.listen(5050, (err) => {
  console.log("server is runnig . . .");
  if (err) {
    throw error;
  }
});
