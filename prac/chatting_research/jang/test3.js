import http from "http"

http.createServer((req,rep) => {
  rep.writeHead(200,{'Content-Type' : 'text/html;'})
  rep.end()
}).listen(8080,()=> {
  console.log("정상 연결 됨")
})