import { info } from 'console'
import http from 'http'
import test from 'node:test';
import { parse, resolve } from 'path'
import qs from 'qs';

let form = `
<form method="POST" action="/info" accept-charset="utf-8">
<label for="name">이름</label>
<input type="text" name="name" id="name" required>
<label for="id">아이디</label>
<input type="text" name="id" id="id" required>
<label for="password">비밀번호</label>
<input type="password" name="password" id="password" required>
<label for="email">이메일</label>
<input type="email" name="email" id="email" required>
<input type="submit">
</form>
`

let greeting = `<h1>회원가입</h1>`

let mainPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  ${greeting}
  ${form}
</body>
</html>
`

function infoPage (name, id, password, email) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1>환영합니다, ${name}님!</h1>
    <h2>아이디 : ${id} </h2>
    <h2>비밀번호 : ${password} </h2>
    <h2>이메일 : ${email} </h2>
  </body>
  </html>`
}


const server = http.createServer(function(request, response) {
  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(mainPage);
    response.end();
  }
  if (request.method === 'POST' && request.url.startsWith('/info')) {
    let infoData = '';
    request.on('data', function(data) {
      infoData = infoData + data;
    })
    request.on('end', function() {
      let parsedData = qs.parse(infoData);
      console.log(parsedData);
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.end(infoPage(parsedData.name, parsedData.id, parsedData.password, parsedData.email));
    })
  }
})



server.listen(2080, function() {
  console.log('server is runnig...');
})