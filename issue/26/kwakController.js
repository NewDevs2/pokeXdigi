import http from "http";
import fs from "fs";
import qs from "querystring";
import path from "path";
import { fileURLToPath } from "url";
import sign_master from "../../src/models/DBConfig.js";
import responseModule from "../21/responseModule.js";
import { Server } from "socket.io";

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
        rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
        rep.write(page);
        return rep.end();
      }
      if (req.url.endsWith(".html")) {
        return responseModule(200, "text/html", req, rep);
      }
      // 공용 css파일
      if (req.url.endsWith(".css")) {
        return responseModule(200, "text/css", req, rep);
      }
      // 공용 img 파일
      if (req.url.endsWith(".png")) {
        const fileContent = fs.readFileSync(
          // 뒤의 경로(파일 위치)이 그대로 담겨 옴
          path.join(root, req.url)
        );
        rep.writeHead(200, {
          // mime만 변동 될 것 같음
          "Content-Type": "image/png"
        });
        rep.write(fileContent);
        return rep.end();
      }
      // 공용 js파일
      if (req.url.endsWith(".js")) {
        return responseModule(200, "text/javascript", req, rep);
      }

      //쿠키 로그인
      if (req.url === '/checkLogin') {
        if (req.headers.cookie) {
          const clientCookie  = req.headers.cookie.split(' ').join('');
          const clientCookies = clientCookie.split(';');
          let   cookies       = {};
          for (let i=0; i<clientCookies.length; i++) {
            const [key, value] = clientCookies[i].split('=');
            cookies[key] = value;
          }
          console.log(cookies);

          rep.writeHead(200, {'Content-Type':'text/json'});
          rep.write(JSON.stringify(cookies));
          rep.end();
        } else {
          rep.writeHead(200, {'Content-Type':'text/json'});
          rep.write(JSON.stringify('none'));
          rep.end();
        }
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
          .join()
        // })
          console.log(column,values)
          // 회원가입 쿼리문
          sign_master.query(
              `INSERT INTO user_information(${column}) values (${values})`,
              (err, result) => {
                fs.unlinkSync(
                  path.join(root, "temp", `${userData.id}_createAccountCheck.JSON`)
                );
                if(err) {
                  // ! 회원가입 실패 시 보여줄 페이지 작성해야 함.
                  // rep.writeHead(200,{"Content-Type":"text/html"})
                  throw err
                };
                rep.writeHead(200,{"Content-Type":"text/html"});
                rep.write(`<script>location.href = "/src/views/html/accountSuccess.html"</script>`);
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
                const expires = new Date(Date.now()+(60*60*1000)).toUTCString();
                rep.writeHead(200, { "Content-Type": "text/html", "Set-Cookie":[`uid=${parsedData.UserID}; httpOnly; expires=${expires};`] });
                rep.write(
                  `<script>location.href = "/src/views/html/index.html"</script>`
                  );
                  rep.end();
                } else {
                  console.log("뭔가 잘못됨");
                  console.log(parsedData);
                }
              //* 대조 후 JSON 파일 삭제
              fs.unlinkSync(
                path.join(root, "temp", `${parsedData.UserID}_loginCheck.JSON`)
              );
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

const io = new Server(server, {path : '/socket.io'})
io.on('connection', socket => {
  
  socket.on('Enter', data => {
    io.emit('Enter', `${JSON.stringify(JSON.parse(data))}님 환영합니다`);
  })

  socket.on('chat', data => {
    io.emit('chat', data);
  })
})