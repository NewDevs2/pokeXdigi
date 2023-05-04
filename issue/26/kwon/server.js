import http from "http";
import fs from "fs";
import qs from "querystring";
import path from "path";
import { fileURLToPath } from "url";
import sign_master from "../models/DBConfig.js";
import responseModule from "../../issue/21/responseModule.js";
import { addAbortSignal } from "stream";

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
      //* 최초 접속
      if (req.url === "/" || req.url.includes("index.html")) {
        //! 해결 못 함 responseModule(200, "text/html", req, rep);
        const page = fs.readFileSync(
          path.join(root, "src", "views", "html", "index.html"),
          "UTF-8"
        );
        console.log('다시 접속')
        rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
        rep.write(page);
        rep.end();
      }
      if(req.url.includes('reset')){
        // const page = fs.readFileSync(
        //   path.join(root, "src", "views", "html", "index.html"),
        //   "UTF-8"
        // );
        // console.log('다시 접속')
        // ! 시간을 UTC방식으로 반환한다.
        const dateTest = new Date(Date.now()+  1000).toUTCString();
        rep.writeHead(200, {
          "Content-Type": "text/json; charset=UTF-8;",
          "Set-Cookie":
            `User=test; Expires=${dateTest}; httpOnly`,
        });
        // rep.write('싫어');
        rep.end();
  
      }
      //* 메인 페이지 js파일
      if (req.url.includes("js/index.js")) {
        responseModule(200, "text/javascript", req, rep);
      }
      //* 계정 찾기 페이지
      if (req.url.includes("html/findAccount.html")) {
        responseModule(200, "text/html", req, rep);
      }
      //* 계정 찾기 js파일
      if (req.url.includes("js/findAccount.js")) {
        responseModule(200, "text/javascript", req, rep);
      }
      // * 계정 찾기 css파일
      // if (req.url.includes("css/findAccount.css")) {
      //   responseModule(200, "text/css", req, rep);
      // }
      //* 로그인 페이지
      if (req.url.includes("html/login.html")) {
        const fileContent = fs.readFileSync(
          // 뒤의 경로(파일 위치)이 그대로 담겨 옴
          path.join(root, req.url),
          "UTF-8"
        );
        rep.writeHead(200, {
          "Content-Type": "text/html; charset=UTF-8;",
        });

        rep.write(fileContent);
        rep.end();
      }
      //* 로그인 페이지 css
      // if (req.url.includes("css/login.css")) {
      //   responseModule(200, "text/css", req, rep);
      // }
      //* 로그인 페이지 js파일
      if (req.url.includes("js/login.js")) {
        responseModule(200, "text/javascript", req, rep);
      }
      // ! testrep.js 파일 받기
      if (req.url.includes("js/testrep.js")) {
        responseModule(200, "text/javascript", req, rep);
      }
      //  ! cookie 받는 요청
      if (req.url.includes("/checkCookie")) {
        console.log(req.headers.cookie);
        const cookieTest = req.headers.cookie;
        rep.writeHead(200, {
          "Content-Type": "application/json;",
        });
        // rep.write();
        rep.end(JSON.stringify(cookieTest));
      }
      //* 회원가입 성공 페이지
      if (req.url.includes("html/accountSuccess.html")) {
        responseModule(200, "text/html", req, rep);
      }
      //* 회원가입 성공 페이지 js파일
      if (req.url.includes("js/accountSuccess.js")) {
        responseModule(200, "text/javascript", req, rep);
      }
      //* 로그인 실패 페이지
      if (req.url.includes("/html/loginFail.html")) {
        responseModule(200, "text/html", req, rep);
      }
      //* 로그인 실패 js파일
      if (req.url.includes("/js/loginFail.js")) {
        responseModule(200, "text/javascript", req, rep);
      }

      //* 로그인 실패 css파일
      // if (req.url.includes("/css/loginFail.css")) {
      //   responseModule(200, "text/css", req, rep)
      // }
      //* 회원가입 html 파일 - 박준형
      if (req.url.includes("html/createAccount.html")) {
        responseModule(200, "text/html", req, rep);
      }
      //* 회원가입 js 파일 - 박준형
      if (req.url.includes("js/createAccount.js")) {
        responseModule(200, "text/javascript", req, rep);
      }
      //* tagMaker.js 응답 추가
      if (req.url.includes("tag/tagMaker.js")) {
        responseModule(200, "text/javascript", req, rep);
      }
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
    } else if (req.method === "POST") {
      if (req.url.includes("/html/checkCreateAccount")) {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          const userData = qs.parse(data);
          // console.log(userData)
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
          // console.log(parsedCreateAccountCheck)
          const column = Object.keys(parsedCreateAccountCheck).join();
          const values = Object.values(parsedCreateAccountCheck)
            .map((element) => {
              return "'" + element + "'";
            })
            .join();
          // })
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
              // console.log(result);
            }
          );
          // console.log(userData)
          // const column = Object.keys(userData);
          // console.log([...column],...Object.values(userData))
          // 클라이언트 인풋데이터를 클래스로 만들자
          // sign_master.query(
          //   `insert into test(${Object.keys(
          //     userData
          //   ).join()}) values (${Object.values(userData)
          //     .map((element) => {
          //       return "'" + element + "'";
          //     })
          //     .join()})`,
          //   (err, result) => {
          //     console.log(result);
          //   }
          // );
        });
      }
      // * 로그인 요청 들어왔을 때
      if (req.url.includes("/checkLogin")) {
        console.log("로그인 시도 테스트");
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
          // console.log(parsedJsonCheck);
          sign_master.query(
            `SELECT ID,PASSWORD FROM user_information WHERE ID="${parsedJsonCheck.UserID}" AND PASSWORD="${parsedJsonCheck.UserPW}"`,
            function (err, result, fields) {
              if (err) {
                throw err;
              }
              console.log(result);
              //* 대조 후 JSON 파일 삭제
              fs.unlinkSync(
                path.join(root, "temp", `${parsedData.UserID}_loginCheck.JSON`)
              );
              //* 로그인 성공 / 실패 결과
              if (result.length === 0) {
                //* 로그인 성공 시
                console.log("실패");
                rep.writeHead(200, { "Content-Type": "text/html" });
                rep.write(
                  `<script>location.href = "/src/views/html/loginFail.html"</script>`
                );
              } else if (result.length === 1) {
                //* 로그인 성공 시 메인 페이지로 이동
                console.log("성공");
                // rep.writeHead(200, { "Content-Type": "text/html" });
                // rep.setHeader("Set-Cookie", `test=${parsedJsonCheck.UserID};`);
                // ! cookie 요청 보내보기
                // if (req.url.includes("/js/testrep.js")) {
                //   const fileContent = fs.readFileSync(
                //     // 뒤의 경로(파일 위치)이 그대로 담겨 옴
                //     path.join(root, req.url)
                //   );
                //   const cookieValue = req.headers.cookie
                //     ?.split(";")
                //     .find((cookie) => cookie.trim().startsWith("User="))
                //     ?.split("=")[1];

                //   // 추출한 쿠키 값을 콘솔에 출력합니다.
                //   console.log(`User 쿠키 값: ${cookieValue}`);

                //   // console.log(cookieValue);
                //   // ! user 값이 없을 때는 값이 안뜨게 조건문을 걸어준다.
                //   if (cookieValue !== undefined) {
                //     const root = document.createElement("div");
                //     root.innerText = `어서오세여 고객니임 ^_^ ${cookieValue}`;
                //     document.body.appendChild(root);
                //   }

                //   rep.writeHead(200, {
                //     // mime만 변동 될 것 같음
                //     "Content-Type": "text/json",
                //   });
                //   rep.write(fileContent);
                //   rep.end();
                // }
                // ! 쿠키 값을 보내기 전에 삭제를 하고 보내고 싶다.
                // rep.writeHead(200, {
                //   "Content-Type": "text/html; charset=UTF-8;",
                //   "Set-Cookie":
                //     "User=; Max-Age=0; Expires=Wed, 04 May 1999 10:00:00 GMT",
                // });
                rep.writeHead(200, {
                  "Content-Type": "text/html",
                  "Set-Cookie": `User=${parsedJsonCheck.UserID}; HTTPOnly`,
                });
                // rep.writeHead(200, {
                //   "Content-Type": "text/html; charset=UTF-8;",
                //   "Set-Cookie": [
                //     "cookieTest=; Max-Age=0; Expires=Wed, 04 May 1999 10:00:00 GMT",
                //     `Session=${sessionId}; HttpOnly`,
                //   ],
                // });

                // rep.writeHead(200, {
                //   "Content-Type": "text/html; charset=UTF-8;",
                //   "Set-Cookie": [
                //     `${parsedJsonCheck.UserID}=; Max-Age=0; Expires=Wed, 04 May 1999 10:00:00 GMT`,
                //     `${parsedJsonCheck.UserID}=${parsedJsonCheck.UserID}; HTTPOnly`,
                //   ],
                // });

                rep.write(
                  `<script>location.href = "/src/views/html/index.html"</script>`
                );
                rep.end();
              } else {
                console.log("뭔가 잘못됨");
                console.log(parsedData);
              }
            }
          );
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
