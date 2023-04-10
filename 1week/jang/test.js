// ! 서버 생성 함수 시도
// function createNewServer(fileLink, uniCode, statusCode, contentType) {
//   let a = http.createServer((request, response) => {
//     let data = fs.readFileSync(fileLink, uniCode, (err, data) => {
//       if (err) throw err;
//       response.writeHead(statusCode, { contentType });
//       response.end(data);
//     });
//   });
// }
const http = require("http");
const a = http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      // 여기서부터 새로운 부분입니다.

      response.on("error", (err) => {
        console.error(err);
      });

      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      // 주의: 위 두 줄은 다음 한 줄로 대체할 수도 있습니다.
      // response.writeHead(200, {'Content-Type': 'application/json'})

      const responseBody = { headers, method, url, body };

      response.write(JSON.stringify(responseBody));
      response.end();
      // 주의: 위 두 줄은 다음 한 줄로 대체할 수도 있습니다.
      // response.end(JSON.stringify(responseBody))

      // 새로운 부분이 끝났습니다.
    });
});
a.listen(8080);
// createNewServer(
//   "./login.html",
//   "utf-8",
//   200,
//   `Content-Type": "text/html; charset=utf-8`
// );

//! db 연결 시도
// const dbconnection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "eowjdehd2465@",
//   database: "userhwin",
// });

// dbconnection.connect((err) => {
//   if (err) {
//     console.err("연결 안됩니다" + err.stack);
//     return;
//   }
// });
// dbconnection.query("SELECT*FROM usertable", (error, rows, fields) => {
//   if (error) throw error;
//   console.log(rows);
//   // 연결 확인
//   // console.log(rows);
// });
// dbconnection.end();
// function newServer(fifleLink,unicode) {
//   http.createServer((request,response)=> {
//     let data = fs.readFileSync(fifleLink,unicode,((err,data)=> {
//       if(err) throw err;
//       response.writeHead(statuscode)
//     })
//   })
// }'

//! db연결 시도 2
// request.on("end", () => {
//   let userInfo = qs.parse(strings);
//   let userHwinEmail = userInfo.username;
//   let userHwinPw = userInfo.password;
//   // 아이디 pw 입력 됐는지 확인하고 실행
//   if (userHwinEmail && userHwinPw) {
//     dbconnection.query(`SELECT * FROM usertable`, (err, rows, fields) => {
//       if (err) {
//         console.log("연결 안됨");
//       }
//       if (rows) {
//         console.log(rows);
//       }
//       // 입력 된 값이중복되지 않으면 회원가입
//     });
//   }
// });
// dbconnection.query(
//   `SELECT username, password FROM usertable WHERE username=${userHwinEmail} AND password=${userHwinPw}`,
//   [userHwinEmail, userHwinPw],
//   function (err, results, fields) {
//     if (err) throw err;
//     if (results.length > 0) {
//       console.log("아이디 있어");
//     } else {
//       console.log("아이디가 없어요");
//     }
//   }
// );

// request.on("data", )
// let data = fs.readFileSync("./hwinSuccess.html");
// response.writeHead(200);
// response.end(data);

//!  요청 들어온 값을 json 값으로 저장
// request.on("end", () => {
//   let userInfo = qs.parse(strings);
//   let test = [];
//   const userHwinInfo = new Object();
//   function test1() {
// userHwinInfo.userHwinEmail = userInfo.username;
// userHwinInfo.userHwinPw = userInfo.password;
//   }}
//! 요청 들어온 값을 json 값으로 저장2
// let userInfo = qs.parse(strings);
//       // 문자열을 파싱하고 나면 객체형태로 되있다
//       console.log(userInfo);
//       let test = [];
//       test.push(userInfo);
//       console.log(userInfo);
