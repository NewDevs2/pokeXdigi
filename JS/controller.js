import http from "http";
import fs from "fs";

export default http.createServer((req, rep) => {
  try {
    if (req.method === "GET") {
      if (req.url === "./HTML/loginFail.html") {
        const page = fs.readFileSync("../HTML/loginFail.html",'UTF-8')
        rep.writeHead(200, {'Content-Type':'text/html; charset=UTF-8;'});
        rep.write(page);
        rep.end();
      }
      else if (req.url === "./JS/loginFail.js") {
        const page = fs.readFileSync("../JS/loginFail.js",'UTF-8')
        rep.writeHead(200, {'Content-Type':'text/javascript; charset=UTF-8;'});
        rep.write(page);
        rep.end();
      }
    }
  } catch {

  }
});
server.listen(8080,(err)=> {
  if(err) {console.log(err);throw err;}
  console.log("서버 접속 성공")
})