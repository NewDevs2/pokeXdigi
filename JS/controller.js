import http from "http";
import fs from "fs";
const jsFile = fs.readFileSync("../JS/index.js", "UTF-8");
const server = http.createServer((req, rep) => {
  try {
    if (req.method === "GET") {
      // 메인 페이지 호출
      if (req.url === "/") {
        const page = fs.readFileSync("../HTML/index.html", "UTF-8");
        rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
        rep.write(page);
        rep.end();
      }
      // 메인페이지 JS 파일
      else if (req.url === "/JS/index.js") {
        const jsPage = fs.readFileSync("./index.js", "UTF-8");
        rep.writeHead(200, {
          "Content-Type": "text/javascript; charset=UTF-8;",
        });
        rep.write(jsPage);
        rep.end();
      }
      // 회원가입 성공 페이지
      if (req.url === "/accountSuccess.html") {
        const page = fs.readFileSync("../HTML/accountSuccess.html", "UTF-8");
        rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
        rep.write(page);
        rep.end();
      } else if (req.url == "/JS/accountSuccess.js") {
        const jsPage = fs.readFileSync("./accountSuccess.js", "UTF-8");
        rep.writeHead(200, {
          "Content-Type": "text/javascript; charset=UTF-8;",
        });
        rep.write(jsPage);
        rep.end();
      }
    }
    if (req.method === "POST") {
    }
  } catch {}
});
server.listen(8080, (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("서버 접속 성공");
});
