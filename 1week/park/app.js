import { info } from 'console'
import http from 'http'
import { resolve } from 'path'
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




const server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type' : 'text/html'});
  response.write(mainPage);
  response.end();
  if (request.method === 'POST') {
    let infoData = '';
    request.on('data', function(data) {
      response.writeHead(200, {'Content-Type' : 'application/json'})
      infoData = infoData + data;
    })
    request.on('end', function() {
      let parsedData = qs.parse(infoData);
      console.log(parsedData);
      response.write(JSON.stringify(parsedData));
    })
  }
})


server.listen(2080, function() {
  console.log('server is runnig...');
})