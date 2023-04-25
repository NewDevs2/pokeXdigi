import http from "http";
import fs from "fs";
import qs from "querystring";
import path from "path";
import { fileURLToPath } from "url";
import sign_master from "../models/DBConfig.js";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const root = path.join(__dirName, "../../");

sign_master.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("DB 연결");
});

function reqMethodGet(reqUrl, rep) {
  //* 최초 접속
  if (reqUrl === "/" || reqUrl.includes("index.html")) {
    const page = fs.readFileSync(
      path.join(root, "src", "views", "html", "index.html"),
      "UTF-8"
    );
    rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
    rep.write(page);
    rep.end();
  } else if (reqUrl.includes(".html")) {
    rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
    rep.write(fs.readFileSync(path.join(root, reqUrl), "utf-8"));
    rep.end();
  } else if (reqUrl.includes(".css")) {
    rep.writeHead(200, { "Content-Type": "text/css; charset=UTF-8;" });
    rep.write(fs.readFileSync(path.join(root, reqUrl), "utf-8"));
    rep.end();
  } else if (reqUrl.includes(".js")) {
    rep.writeHead(200, { "Content-Type": "text/javascript; charset=UTF-8;" });
    rep.write(fs.readFileSync(path.join(root, reqUrl), "utf-8"));
    rep.end();
  }
}

 function postData(req) {
  let userData = "";
  req.on("data", (chunk) => {
    userData += chunk;
  });
  return userData;
}

const server = http.createServer((req, rep) => {
  try {
    switch (req.method) {
      case "GET":
        reqMethodGet(req.url, rep);
        break;

      case "POST":
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
            console.log(column, values);
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
          console.log("로그인 시도 테스트");
          let userData = postData(req);
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
                  path.join(
                    root,
                    "temp",
                    `${parsedData.UserID}_loginCheck.JSON`
                  )
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
                  rep.writeHead(200, { "Content-Type": "text/html" });
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

        break;
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
