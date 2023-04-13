import http from "http";
import fs from "fs";

export default http.createServer((req, rep) => {
  try {
    if (req.method === "GET") {
      if (req.url === "/") {
        const page = fs.readFileSync("./HTML/index.html",'UTF-8')
        rep.writeHead(200, {'Content-Type':'text/html; charset=UTF-8;'});
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