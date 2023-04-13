import http from "http";
import fs from "fs";

const server = http.createServer((req, rep) => {
  try {
    if (req.method === "GET") {
      if (req.url === "/") {
        const page = fs.readFileSync("../HTML/index.html", "UTF-8");
        rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
        rep.write(page);
        rep.end();
      }
       else if (req.url === "/JS/index.js") { 
        const script = fs.readFileSync("./index.js", "UTF-8");
        rep.writeHead(200, { "Content-Type": "text/javascript; charset=UTF-8;" });
        rep.write(script);
        rep.end();
      }
      else if (req.url === "/findAccount.html") { 
        const page = fs.readFileSync("../HTML/findAccount.html", "UTF-8");
        rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
        rep.write(page);
        rep.end();
      }
      else if (req.url === "/JS/findAccount.js") { 
        const script = fs.readFileSync("./findAccount.js", "UTF-8");
        rep.writeHead(200, { "Content-Type": "text/javascript; charset=UTF-8;" });
        rep.write(script);
        rep.end();
      }
    }
  } catch {
    // 예외 처리
  }
});
server.listen(8080,(err)=> {
  if(err) {console.log(err);throw err;}
  console.log("서버 접속 성공")
})
