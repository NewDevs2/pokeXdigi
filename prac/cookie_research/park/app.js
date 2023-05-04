import http from "http";
import fs from "fs";
import qs from "querystring";
import { ChildProcess } from "child_process";
import { parse } from "path";

const httpServer = http.createServer((req, rep) => {
  if (req.url === "/" && req.method === "GET") {
    const page = fs.readFileSync("./index.html");
    rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    rep.write(page);
    rep.end();
  }
  if (req.url === "/checker.html" && req.method === "GET") {
    const page = fs.readFileSync("./checker.html");
    rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    rep.write(page);
    rep.end();
  }
  if (req.url === "/login" && req.method === "POST") {
    let loginID = "";
    req.on("data", (chunk) => {
      loginID += chunk;
    });
    req.on("end", () => {
      let parsedCookie = qs.parse(loginID);
      console.log(parsedCookie);
      rep.writeHead(200, {
        "Content-Type": "text/html; charset=UTF-8",
        "Set-Cookie": `name=${parsedCookie.username}`,
        "Set-Cookie": `name=${parsedCookie.password}`,
      });
      const page = fs.readFileSync("./login.html");
      rep.write(page);
      rep.end();
    });
  }
});

httpServer.listen(2080, (err) => {
  if (err) {
    throw console.error();
  }
  console.log("server is running");
});
