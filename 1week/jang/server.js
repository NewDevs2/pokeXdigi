const http = require("http");
const fs = require("fs").promises;
const qs = require("qs");
const url = require("url");
const mysql2 = require("mysql2");
const loginPage = http.createServer(async (request, response) => {
  // html 파일 불러옴 -> await 프로미스 처리될 때 까지 대기
  const data = await fs.readFile("./index.html");

  // 클라이언트로 요청이 온 url
  const _url = request.url;
  console.log(_url);
  // url뒤의 querystring을 기준으로 움직일 것
  let queryData = url.parse(_url, true).query;
  console.log(queryData);

  if (_url == "/") {
    // 접속 하자마자 로그인 페이지 불러옴
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    // console.log(_url);
    response.end(data);
  }
  // 조건이 여러가지일 때 else if 사용
  else if (_url == "/favicon.ico") {
    // console.log("연결 확인"); 회원가입 페이지로 쓸 것
    // index.hmtl 출력
  } else if (_url == "/next.html") {
    // console.log("다음페이지 연결 확인");
    let strings = "";
    // userData POST방식에 의해 url에 표시되지 않고 숨겨졌던 query string버퍼가 담겨있는데, 이를 문자열 형태로 바꾸면 query string을 프로그래밍적으로 처리할 수 있게 된다.
    request.on("data", function (data) {
      // 오른쪽 피연산자의 값을 변수에 더한 결과를 다시 변수에 할당
      strings += data;
    });
    request.on("end", function () {
      // console.log(strings);
      //
      let user = qs.parse(strings);
      console.log(strings);
      // 회원이 넘긴 id, pw값
      console.log(user.email);
      console.log(user.password);
      let data = `<html>
      <p>${user.email}+${user.password}</p>
      </html>`;
      // response.writeHead(200);
      response.end(data);
    });
  }
});

loginPage.listen(8080, () => {
  console.log("연결 요청");
});
