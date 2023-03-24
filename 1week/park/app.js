// ? qs, mySQL2, http 모듈을 가져옴. 방식은 esm
import { info } from 'console'
import http from 'http'
import test from 'node:test';
import { parse, resolve } from 'path'
import qs from 'qs';
import mysql2 from 'mysql2';



// ? mysql에 접속하기 위해 통신 객체 설정.
const conn = mysql2.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'VHzmffkr1208',
  database : 'user_info',
  port: 3306,
  socketPath : '/tmp/mysql.sock' // ! 에러 코드 -61, 'ECONNREFUSED' 해결해준 코드. 왜 해결됐는지 이유 찾아보기
});



// ? form 양식을 문자열로 작성함.
// ! form 제출 방법은 POST로 설정해주었음.
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



// ? 첫번째 페이지 소개문구 작성
let greeting = `<h1>회원가입</h1>`


// ? 첫번째 페이지 양식을 문자열로 작성. 안에 ${} 로 위에 선언해준 변수를 넣어줌.
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

// ? 회원가입 양식을 작성하고 제출을 눌렀을 시 나올 페이지의 양식을 함수로 선언
// ? 매개변수에는 회원정보에서 가져올 값을 입력해주었음.
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


// ? 통신 시작. 첫 번째 페이지는 GET 방식으로 통신한다.
const server = http.createServer(function(request, response) {
  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(mainPage);
    response.end();
  }
  // ? 요청 방식이 POST일 경우 실행하는 조건문 작성.
  if (request.method === 'POST' && request.url.startsWith('/info')) {
    
    // ? 회원정보를 담기 위해 안이 비어있는 지역변수 선언
    let infoData = '';
    
    // ? request에 'data' 이벤트가 발생할 경우 함수 실행.
    // ? infoData에 data 값을 담아준다.
    request.on('data', function(data) {
      infoData = infoData + data;
      console.log(infoData);
    })

    // ? request에 'end' 이벤트가 발생할 경우 함수 실행
    request.on('end', function() {
      // ! get 방식으로 전송했을 경우 페이지 URL에 쿼리스트링이 입력되게 되는데
      // ! 이를 qs 모듈을 이용해 파싱해준다.
      let parsedData = qs.parse(infoData);
      // ? 데이터가 잘 파싱됐는지 확인
      console.log(parsedData);

      // ? 헤더 정보 작성
      response.writeHead(200, {'Content-Type' : 'text/html'});

      // ! 파싱된 데이터를 가져와 infoPage 함수 안의 매개변수로 넣어줌. 순차대로 name값, id값, password값, email값을 넣을 것임.
      response.end(infoPage(parsedData.name, parsedData.id, parsedData.password, parsedData.email));

      // ? 입력된 정보를 DB에 넣기 위해 mySQL과 통신 시작.
      conn.connect();
      
      // ? mySQL에 보낼 query를 지역변수로 선언해줌. 리터럴이 너무 많은데, 줄일 방법이 있다면 좋겠다.
      let userInfoInsert = `INSERT INTO user_information (name, id, password, email) VALUE('${parsedData.name}', '${parsedData.id}', '${parsedData.password}', '${parsedData.email}');`

      // ? mySQL에 query 전송.
      conn.query(
      userInfoInsert, (err,result,fields) => {
      if (err) throw err;
      console.log(result);
      });

    });
  };
});



server.listen(2080, function() {
  console.log('server is runnig...');
})