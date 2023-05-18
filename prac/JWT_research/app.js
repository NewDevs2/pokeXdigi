import http from 'http'
import jwt  from 'jsonwebtoken'

const server = http.createServer((req,res)=>{
  if(req.method==='GET'){
    if(req.url==='/'){
      const accessToken = jwt.sign('Hello',{expiresIn:'3s'},function(err,token){
        console.log(token)
      })

      res.writeHead(200, {'Content-Type':'text/html', 'Set-Cookie':'id='+accessToken})
      res.write('hihi')
      res.end()
    }
  }
}).listen(2080)