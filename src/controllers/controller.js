import http from "http";
import fs from "fs";
import qs from "querystring";
import path from "path";
import { fileURLToPath } from "url";
import sign_master from "../models/DBConfig.js";
import responseModule from "../../utils/Http/responseModule.js";
import {
  createHeader,
  parsedCookie,
  sendCookie,
} from "../../utils/Cookie/cookieManager.js";
import chattingSocket from "../../utils/Socket/socketServer.js";
import { CreateUser, checkPassword } from "../../utils/Account/createClass.js";
import bcrypt from "bcrypt";
// import checkPeopleNumber from "../../utils/account/checkPeolpeNum.js";
// import checkPhoneNumber from "../../utils/account/checkPhoneNum.js";
// console.log(checkForm);

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const root = path.join(__dirName, "../../");

sign_master.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("DB 연결");
});

const server = http.createServer((req, rep) => {
  try {
    if (req.method === "GET") {
      if (req.url === "/logout") {
        const logoutCookie = [
          `uid=; httpOnly; Max-Age=0;`,
          "login=; Max-Age=0;",
        ];
        rep.writeHead(200, createHeader("text/html", logoutCookie));
        rep.write(
          `<script>location.href = "/src/views/html/index.html"</script>`
        );
        rep.end();
      }
      // if (req.url.includes("cookieManager.js")) {
      //   responseModule(200, "text/javascript", req, rep);
      // }
      if (req.url === "/checkCookie") {
        // checkCookie라는 요청이 들어왔을 때
        if (req.headers.cookie) {
          const requestCookie = parsedCookie(req.headers.cookie); // 쿠키를 해석해서
          rep.writeHead(200, { "Content-Type": "text/json" });
          rep.write(JSON.stringify(requestCookie)); // 보내준다
          rep.end();
        } else {
          rep.writeHead(200, { "Content-Type": "text/json" });
          rep.write(JSON.stringify("cookie is not defined"));
          rep.end();
        }
      }
      //* 최초 접속
      if (req.url === "/") {
        //! 해결 못 함 responseModule(200, "text/html", req, rep);
        // console.log(parsedCookie(req.headers.cookie));
        const page = fs.readFileSync(
          path.join(root, "src", "views", "html", "index.html"),
          "UTF-8"
        );
        rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
        rep.write(page);
        rep.end();
      }
      //* 메인 페이지 js파일
      // if (req.url.includes("js/index.js")) {
      //   responseModule(200, "text/javascript", req, rep);
      // }
      //* 계정 찾기 페이지
      // if (req.url.includes("html/findAccount.html")) {
      //   responseModule(200, "text/html", req, rep);
      // }
      //* 계정 찾기 js파일
      // if (req.url.includes("js/findAccount.js")) {
      //   responseModule(200, "text/javascript", req, rep);
      // }
      // * 계정 찾기 css파일
      // if (req.url.includes("css/findAccount.css")) {
      //   responseModule(200, "text/css", req, rep);
      // }
      //* 로그인 페이지
      // if (req.url.includes("html/login.html")) {
      //   responseModule(200, "text/html", req, rep);
      // }
      //* 로그인 페이지 css
      // if (req.url.includes("css/login.css")) {
      //   responseModule(200, "text/css", req, rep);
      // }
      //* 로그인 페이지 js파일
      // if (req.url.includes("js/login.js")) {
      //   responseModule(200, "text/javascript", req, rep);
      // }
      //* 회원가입 성공 페이지
      // if (req.url.includes("html/accountSuccess.html")) {
      // responseModule(200, "text/html", req, rep);
      // if(req.headers.cookie.login === 'true') {
      //   console.log("로그인 상태가 트루입니다")
      // }
      // console.log(req.headers.cookie)
      // }
      //* 회원가입 성공 페이지 js파일
      // if (req.url.includes("js/accountSuccess.js")) {
      //   responseModule(200, "text/javascript", req, rep);
      // }
      //* 로그인 실패 페이지
      // if (req.url.includes("/html/loginFail.html")) {
      // responseModule(200, "text/html", req, rep);
      // }
      //* 로그인 실패 js파일
      // if (req.url.includes("/js/loginFail.js")) {
      //   responseModule(200, "text/javascript", req, rep);
      // }
      //* 로그인 실패 css파일
      // if (req.url.includes("/css/loginFail.css")) {
      //   responseModule(200, "text/css", req, rep)
      // }
      //* 회원가입 html 파일 - 박준형
      // if (req.url.includes("html/createAccount.html")) {
      // responseModule(200, "text/html", req, rep);
      // }
      //* 회원가입 js 파일 - 박준형
      // if (req.url.includes("js/createAccount.js")) {
      //   responseModule(200, "text/javascript", req, rep);
      // }
      //* tagMaker.js 응답 추가
      // if (req.url.includes("tag/tagMaker.js")) {
      //   responseModule(200, "text/javascript", req, rep);
      // }
      // //* 회원가입 css 파일 - 박준형
      // if (req.url.includes("css/createAccount.css")) {
      //   responseModule(200, "text/css", req, rep);
      // }
      // 공용 css파일
      if (req.url.endsWith(".css")) {
        responseModule(200, "text/css", req, rep);
      }
      // 공용 img 파일
      if (req.url.endsWith(".png")) {
        const fileContent = fs.readFileSync(
          // 뒤의 경로(파일 위치)이 그대로 담겨 옴
          path.join(root, req.url)
        );
        rep.writeHead(200, {
          // mime만 변동 될 것 같음
          "Content-Type": "image/png",
        });
        rep.write(fileContent);
        rep.end();
      }
      // if (req.url.includes("chat.html")) {
      // rep.writeHead(200, {"Content-Type":"text/html"});
      // rep.write(fs.readFileSync(path.join(root,"./src/views/js/chat.html")));
      // rep.end();
      // }
      if (req.url.endsWith(".js")) {
        rep.writeHead(200, { "Content-Type": "text/javascript" });
        rep.write(fs.readFileSync(path.join(root, req.url)));
        rep.end();
      }
      if (req.url.endsWith(".html")) {
        rep.writeHead(200, { "Content-Type": "text/html" });
        rep.write(fs.readFileSync(path.join(root, req.url)));
        rep.end();
      }
      if (req.url.endsWith(".jpg")) {
        rep.writeHead(200, { "Content-Type": "text/jpg" });
        rep.write(fs.readFileSync(path.join(root, req.url)));
        rep.end();
      }
    } else if (req.method === "POST") {
      if (req.url.includes("/html/checkCreateAccount")) {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          const userData = new CreateUser(qs.parse(data));
          fs.writeFileSync(
            path.join(root, "temp", `${userData.id}_createAccountCheck.JSON`),
            JSON.stringify(userData)
          );
          // !변수 이름 바꿔줘 제발
          // 제이슨 파일 가져와서 파싱하는 구간
          const createAccountCheck = fs.readFileSync(
            path.join(root, "temp", `${userData.id}_createAccountCheck.JSON`),
            "utf-8"
          );
          const parsedCreateAccountCheck = JSON.parse(createAccountCheck);
          const column = Object.keys(parsedCreateAccountCheck).join();
          const values = Object.values(parsedCreateAccountCheck)
            .map((element) => {
              return "'" + element + "'";
            })
            .join();
          console.log(column, values);
          // 회원가입 쿼리문
          sign_master.query(
            `INSERT INTO user_information(${column}) values (${values})`,
            (err, result) => {
              fs.unlinkSync(
                path.join(
                  root,
                  "temp",
                  `${userData.id}_createAccountCheck.JSON`
                )
              );
              if (err) {
                // ! 회원가입 실패 시 보여줄 페이지 작성해야 함.
                // rep.writeHead(200,{"Content-Type":"text/html"})
                throw err;
              }
              rep.writeHead(200, { "Content-Type": "text/html" });
              rep.write(
                `<script>location.href = "/src/views/html/accountSuccess.html"</script>`
              );
              rep.end();
            }
          );
        });
      }
      // * 로그인 요청 들어왔을 때
      if (req.url.includes("/checkLogin")) {
        let userData = "";
        req.on("data", (chunk) => {
          userData += chunk;
        });
        req.on("end", () => {
          //* 클라이언트 인풋 데이터
          let parsedData = qs.parse(userData);
          // console.log(parsedData);
          //* 회원 정보를 JSON 형태로 변환
          fs.writeFileSync(
            path.join(root, "temp", `${parsedData.UserID}_loginCheck.JSON`),
            JSON.stringify(parsedData)
          );
          //* 클라이언트 인풋 JSON 데이터 파싱
          const jsonCheck = fs.readFileSync(
            path.join(root, "temp", `${parsedData.UserID}_loginCheck.JSON`),
            "utf-8"
          );
          const parsedJsonCheck = JSON.parse(jsonCheck);
          //* 신규 방식(암호화 적용)
          sign_master.query(
            `SELECT id,password FROM user_information WHERE id='${parsedJsonCheck.UserID}'`,
            (err, result) => {
              if (err) throw err;
              //* 없는 ID
              if (result.length === 0) {
                rep.writeHead(200, { "Content-Type": "text/html" });
                rep.write(
                  `<script>location.href="/src/views/html/loginFail.html"</script>`
                );
                rep.end();
              } else if (result.length === 1) {
                //* ID 있음, PW 검증 시작
                if (checkPassword(parsedJsonCheck.UserPW, result[0].password)) {
                  //* 비밀번호 맞음
                  rep.writeHead(
                    200,
                    createHeader("text/html", [
                      `uid=${parsedJsonCheck.UserID}; httpOnly`,
                      "login=true; httpOnly",
                    ])
                  );
                  rep.write(`<script>location.href="/"</script>`);
                  rep.end();
                } else {
                  //* 비밀번호 틀림
                  rep.writeHead(200, { "Content-Type": "text/html" });
                  rep.write(
                    `<script>location.href="/src/views/html/loginFail.html"</script>`
                  );
                  rep.end();
                }
              } else {
                console.log("뭔가 잘못 됨");
              }
            }
          );
          //* 대조 후 JSON 파일 삭제
          fs.unlinkSync(
            path.join(root, "temp", `${parsedData.UserID}_loginCheck.JSON`)
          );

          // 기존 방식
          // sign_master.query(
          //   `SELECT ID,PASSWORD FROM user_information WHERE ID="${parsedJsonCheck.UserID}" AND PASSWORD="${parsedJsonCheck.UserPW}"`,
          //   function (err, result, fields) {
          //     if (err) {
          //       throw err;
          //     }
          //     console.log(result);
          //     console.log(parsedJsonCheck.UserID);
          //     //* 로그인 성공 / 실패 결과
          //     if (result.length === 0) {
          //       //* 로그인 실패 시
          //       console.log("실패");
          //       rep.writeHead(200, { "Content-Type": "text/html" });
          //       rep.write(
          //         `<script>location.href = "/src/views/html/loginFail.html"</script>`
          //       );
          //     } else if (result.length === 1) {
          //       //* 로그인 성공 시 메인 페이지로 이동
          //       console.log("성공");
          //       const loginCookie = [
          //         `uid=${parsedJsonCheck.UserID}; httpOnly;`,
          //         "login=true",
          //       ];
          //       rep.writeHead(200, createHeader("text/html", loginCookie));
          //       rep.write(
          //         `<script>location.href = "/src/views/html/index.html"</script>`
          //       );
          //       rep.end();
          //     } else {
          //       console.log("뭔가 잘못됨");
          //       console.log(parsedData);
          //     }
          //     //* 대조 후 JSON 파일 삭제
          //     fs.unlinkSync(
          //       path.join(root, "temp", `${parsedData.UserID}_loginCheck.JSON`)
          //     );
          //   }
          // );
        });
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
    // 예외 처리
  }
});
server.listen(8080, (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("서버 접속 성공");
});

chattingSocket(server);
