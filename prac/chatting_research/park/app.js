import http from "http";
import fs from "fs";

const server = http.createServer((req, rep) => {
  const page = fs.readFileSync("./index.html");
  rep.writeHead(200, { "Content-Type": "text/html; charset:UTF-8;" });
  rep.write(page);
  rep.end();
});

server.listen(2080, (err) => {
  if (err) {
    throw err;
  }
  console.log("server is runnig...");
});
