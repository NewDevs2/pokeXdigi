import http from "http";
import fs from "fs";
import qs from "qs";
import url from "url";
import mysql from "mysql2";
// mysql 접속 정보
import dbConnection from "./dataBase.js";

const loginPage = http.createServer((request, response) => {
  // DB 연결
  dbConnection.connect();
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
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
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
      let userId = userInfo.email;
      let userPw = userInfo.password;
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
      // 객체 생성자 함수
      // function infoSaver(userName, userPassword) {
      //   this.userName = userName;
      //   this.userPassword = userPassword;
      // }
      // 회원 정보를 한곳에 담음
      let userHwinInfo = [];
      let userInfo = qs.parse(strings);
      let userHwinEmail = userInfo.username;
      let userHwinPw = userInfo.password;
      userHwinInfo.push(userHwinEmail, userHwinPw);
      // 문자열을 파싱하고 나면 객체형태로 되있다
      console.log(userHwinInfo);
      function createNewHwinInfo(userName, userPw) {
        this.userName = userName;
        this.userPw = userPw;
      }
      let calssTest = [];

      let ss = calssTest.push(new createNewHwinInfo(userHwinEmail, userHwinPw));
      0;
      console.log("문자데이터를 객체에 집어넣었습니다" + calssTest);

      fs.writeFileSync(
        "./userHwinInfo.JSON",
        JSON.stringify(ss, null, 2),
        "utf-8",
        (err) => {
          if (err) console.log(err);
          else {
            console.log("파일 전송이 성공했다.");
          }
        }
      );
      // console.log(userHwinInfo);

      // id와 pw 값이 입력 됐을 때 시작
      if (userHwinEmail && userHwinPw) {
        dbConnection.query(
          `INSERT INTO usertable (username,password) VALUES ("${userHwinEmail}","${userHwinPw}")`,
          (err, rows, fields) => {
            if (err) {
              console.log("연결 안됨");
            }
            console.log(rows);
            // if (row) {
            //   // console.log(rows);
            // }
          }
        );
      }
    });
    response.end(data);
  }
});
loginPage.listen(8080, () => {
  console.log("연결 요청");
});
