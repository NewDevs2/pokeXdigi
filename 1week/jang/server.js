import http from "http";
import fs from "fs";
import qs from "qs";
import url from "url";
import dbconnection from "./dataBase.js";
const loginPage = http.createServer((request, response) => {
  let data = fs.readFileSync("./main.html", "utf8", function (err, data) {
    if (err) throw err;
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    // console.log(data);
    response.end(data);
  });
  let _url = request.url;
  //! url의 querystring구역에 form 데이터가 담김
  let urlQueryData = url.parse(_url, true).query;
  // console.log(urlQueryData);
  // 최초 페이지 불러옴
  if (_url == "/") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    // console.log(_url);
    response.end(data);
  } else if (_url == "/login.html") {
    let data = fs.readFileSync("./login.html");
    // response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(data);
  }
  // 로그인 버튼 눌렀을 때
  else if (_url == "/next.html") {
    let strings = "";
    request.on("data", (data) => {
      strings += data;
    });

    request.on("end", () => {
      let userInfo = qs.parse(strings);
      // console.log(strings);
      // 회원이 넘긴 id, pw값
      // console.log(userInfo.email);
      let userId = userInfo.email;
      let userPw = userInfo.password;
      // console.log(userInfo.password);
      let data = `<html>
      <p>${userId}+${userPw}</p>
      </html>`;
      response.writeHead(200);
      response.end(data);
    });
  } // 회원가입 창
  else if (_url == "/hwin.html") {
    let data = fs.readFileSync("./hwin.html");
    response.end(data);
  } else if (_url == "/hwinSuccess.html") {
    let strings = "";
    request.on("data", (data) => {
      strings += data;
    });

    request.on("end", () => {
      let userInfo = qs.parse(strings);
      let userHwinEmail = userInfo.username;
      let userHwinPw = userInfo.password;
      console.log(userHwinEmail);
      // 아이디 pw 입력 됐는지 확인
      console.log(dbconnection.query);
      if (userHwinEmail && userHwinPw) {
        dbconnection.query(`SELECT * FROM usertable`, (err, rows, fields) => {
          if (err) {
            // console.log(rows);
          }
          // 입력 된 값이중복되지 않으면 회원가입
        });
      }
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
    });

    // request.on("data", )
    // let data = fs.readFileSync("./hwinSuccess.html");
    // response.writeHead(200);
    // response.end(data);
  }
});
loginPage.listen(8080, () => {
  console.log("연결 요청");
});
