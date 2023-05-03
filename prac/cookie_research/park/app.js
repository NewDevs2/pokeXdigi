import http from "http";
import fs from "fs";

const httpServer = http.createServer((req, rep) => {
  if (req.url === "/" && req.method === "GET") {
    const page = fs.readFileSync("./index.html");
    rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    rep.write(page);
    rep.end();
  }
  if (req.url === "/login" && req.method === "POST") {
    const page = fs.readFileSync("./login.html");
    const cookies = req.headers.cookie;
    console.log(cookies);
    if (cookies) {
      console.log(cookies);
    } else {
      rep.writeHead(200, {
        "Content-Type": "text/html; charset=UTF-8",
        "Set-Cookie": ["username = park"],
      });
    }
    rep.write(page);
    rep.end();
  }
});

httpServer.listen(2080, (err) => {
  if (err) {
    throw console.error();
  }
  console.log("server is running");
});
