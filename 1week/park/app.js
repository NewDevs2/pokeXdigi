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


// const server = http.createServer(function(request, response){
//   response.writeHead(200, {'Content-Type' : 'text/html'}); // 네트워크 header 값 설정
//   response.write(mainPage); // 미리 선언해준 '문자열' 입력.
//   if (request.method === 'POST') { // ! 요청 방식이 'POST'일 경우인 조건문 작성.
//     let textData = '';
//     request.on('data', function(data){ // request.on 메서드의 'data'가 실행될 때, 콜백함수 실행.
//       textData = textData + data; // textData에 'data' 값을 담아줌.
//     });
//     request.on('end', function(){
//       let parsedData = qs.parse(textData); // ! qs 모듈을 이용하여 값을 parsing함.
//       console.log(parsedData.id); // ? 값이 잘 들어왔는지 확인.
//       response.end(resultPage(parsedData.id)); // ! 값이 확인됐다면, 페이지에 출력.
//     })
//   }
// });


server.listen(2080, function() {
  console.log('server is runnig...');
})