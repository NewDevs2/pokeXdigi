import http from 'http'
import jwt  from 'jsonwebtoken'
import fs from 'fs'
import { makeToken } from '../../../utils/JWT/makeToken.js'

const server = http.createServer((req,res)=>{
  if(req.method==='GET'){
    if(req.url==='/'){

      // 토큰 생성 확인
      // const accessToken = jwt.sign({},'Hello',{expiresIn:'10s'})

      const payload = [{},{}]
      const secretKey = 'hello'
      const option=[{expiresIn:'5s'},{expiresIn:'2m'}]
      
      const accessToken = makeToken(jwt,payload,secretKey,option)[0]
      const refreshToken = makeToken(jwt,payload,secretKey,option)[1]
      
      res.writeHead(200, {'Content-Type':'text/html', 'Set-Cookie':['token='+accessToken,'reToken='+refreshToken]})
      res.write(fs.readFileSync('./test.html'))
      res.end()
      
    }else if(req.url.includes('/test')){
      
      // 검증 방식 확인
      // const verify = jwt.verify(req.headers.cookie.split('=')[1],'Hello')
      // console.log(verify)

      res.writeHead(200, {'Content-Type':'text/html'})
      res.write('hihi')
      res.end()
    }
  }
}).listen(2080)