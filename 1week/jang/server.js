const http = require("http");
const fs = require("fs").promises;
const qs = require("qs");
const url = require("url");
let sex = "성별";
const loginPage = http.createServer(async (request, response) => {
  // html 파일 불러옴 -> await 프로미스 처리될 때 까지 대기
  let data = await fs.readFile("./main.html");
  let _url = request.url;
  console.log(_url);
  //! url의 querystring구역에 form 데이터가 담김
  let queryData = url.parse(_url, true).query;
  console.log(queryData);
  // 최초 페이지 불러옴
  if (_url == "/") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    // console.log(_url);
    response.end(data);
  }
  // 조건이 `g여러가지일 때 else if 사용 -> 로그인 페이지
  else if (_url == "/login.html") {
    let data = await fs.rgit eadFile("./login.html");
    // response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(data);
  }
  // 로그인 버튼 눌렀을 때
  else if (_url == "/next.html") {
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
      let userInfo = qs.parse(strings);
      console.log(strings);
      // 회원이 넘긴 id, pw값
      console.log(userInfo.email);
      let userId = userInfo.email;
      let userPw = userInfo.password;
      console.log(userInfo.password);
      let data = `<html>
      <p>${userId}+${userPw}</p>
      </html>`;
      response.writeHead(200);
      response.end(data);
    });
    // 회원가입 창
  } else if (_url == "/hwin.html") {
    let data = await fs.readFile("./hwin.html");
    response.writeHead(200);
    response.end(data);
  } else if (_url == "/hwinSuccess.html") {
    let data = await fs.readFile("./hwinSuccess.html");
    response.writeHead(200);
    response.end(data);
  }
});
loginPage.listen(8080, () => {
  console.log("연결 요청");
});
module.exports = loginPage;
