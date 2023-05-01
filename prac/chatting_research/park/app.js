import http from "http";
import fs from "fs";

const httpServer = http.createServer(function (req, rep) {
  if (req.url === "/") {
    const page = fs.readFileSync("./index.html");
    rep.writeHead(200, { "Content-Type": "text/html; charset:utf-8" });
    rep.write(page);
    rep.end();
  }
});

httpServer.listen(2080, (err) => {
  if (err) {
    throw err;
  }
  console.log("server is runnig");
});
