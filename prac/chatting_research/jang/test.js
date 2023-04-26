import http from "http"

http.createServer((req,rep)=> {
  rep.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'})
  rep.end(console.log("하이"))
}).listen(8080,(err)=> {
  if(err) {console.log(err)}
  console.log("정상 연결 됨")
})