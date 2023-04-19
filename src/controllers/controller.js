import http from "http";
import fs from "fs";
// import admin_seongDB from "./DBConfig.js";
import qs from "querystring";
import path from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const root = path.join(__dirName, "../../");
console.log(__fileName);
console.log(__dirName);
console.log(root);

// ROOT 계정으로 DB 접속
// admin_seongDB.connect((err) => {
//   if (err) throw err;
//   console.log("DB접속 성공");
// });
console.log(path.join(root, "src", "views", "/html", "../", "index.html"));

const server = http.createServer((req, rep) => {
  try {
    if (req.method === "GET") {
      //* 최초 접속
      if (req.url === "/" || req.url === "/src/views/html/index.html") {
        const page = fs.readFileSync(
          path.join(root, "src", "views", "html", "index.html"),
          "UTF-8"
        );
        rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
        rep.write(page);
        rep.end();
      }
      //* 메인 페이지 js파일
      if (req.url === "/src/views/js/index.js") {
        const script = fs.readFileSync(
          path.join(root, "src", "views", "js", "index.js"),
          "UTF-8"
        );
        rep.writeHead(200, {
          "Content-Type": "text/javascript; charset=UTF-8;",
        });
        rep.write(script);
        rep.end();
      }
      //* 계정 찾기 페이지
      if (req.url === "/HTML/findAccount.html") {
        const page = fs.readFileSync("../HTML/findAccount.html", "UTF-8");
        rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
        rep.write(page);
        rep.end();
      }
      //* 계정 찾기 js파일
      if (req.url === "/JS/findAccount.js") {
        const script = fs.readFileSync("./findAccount.js", "UTF-8");
        rep.writeHead(200, {
          "Content-Type": "text/javascript; charset=UTF-8;",
        });
        rep.write(script);
        rep.end();
      }
      //* 로그인 페이지
      if (req.url.includes("login.html")) {
        const data = fs.readFileSync("../HTML/login.html", "utf-8");
        rep.writeHead(200, { "Content-Tpye": "text/html; charset=utf-8" });
        rep.write(data);
        rep.end();
      }
      //* 로그인 페이지 css
      if (req.url.includes("login.css")) {
        const data = fs.readFileSync("../CSS/login.css", "utf-8");
        rep.writeHead(200, { "Content-Tpye": "text/css; charset=utf-8" });
        rep.write(data);
        rep.end();
      }
      //* 로그인 페이지 js파일
      if (req.url.includes("login.js")) {
        const data = fs.readFileSync("./login.js", "utf-8");
        rep.writeHead(200, {
          "Content-Tpye": "text/javascript; charset=utf-8",
        });
        rep.write(data);
        rep.end();
      }
      //* 회원가입 성공 페이지 - 루빈
      if (req.url === "/accountSuccess.html") {
        const page = fs.readFileSync("../HTML/accountSuccess.html", "UTF-8");
        rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
        rep.write(page);
        rep.end();
      }
      //* 회원가입 성공 페이지 js파일
      if (req.url == "/JS/accountSuccess.js") {
        const jsPage = fs.readFileSync("./accountSuccess.js", "UTF-8");
        rep.writeHead(200, {
          "Content-Type": "text/javascript; charset=UTF-8;",
        });
        rep.write(jsPage);
        rep.end();
      }
      //* 로그인 실패 페이지
      if (req.url === "/HTML/loginFail.html") {
        const page = fs.readFileSync("../HTML/loginFail.html", "UTF-8");
        rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
        rep.write(page);
        rep.end();
      }
      //* 로그인 실패 js파일
      if (req.url === "/JS/loginFail.js") {
        const page = fs.readFileSync("./loginFail.js", "UTF-8");
        rep.writeHead(200, {
          "Content-Type": "text/javascript; charset=UTF-8;",
        });
        rep.write(page);
        rep.end();
      }
      if (req.url === "/HTML/createAccount.html") {
        const page = fs.readFileSync("../HTML/createAccount.html", "UTF-8");
        rep.writeHead(200, {
          "Content-Type": "text/html; charset=UTF-8;",
        });
        rep.write(page);
        rep.end();
      }
      if (req.url === "/JS/createAccount.js") {
        const page = fs.readFileSync("./createAccount.js", "UTF-8");
        rep.writeHead(200, {
          "Content-Type": "text/javascript; charset=UTF-8;",
        });
        rep.write(page);
        rep.end();
      }
      if (req.url === "/CSS/createAccount.css") {
        const page = fs.readFileSync("../CSS/createAccount.css", "UTF-8");
        rep.writeHead(200, {
          "Content-Type": "text/css; charset=UTF-8;",
        });
        rep.write(page);
        rep.end();
      }
    } else if (req.method === "POST") {
      if (req.url === "/HTML/checkCreateAccount") {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          const userData = qs.parse(data);
          // console.log(userData)
          // const column = Object.keys(userData);
          // console.log([...column],...Object.values(userData))
          admin_seongDB.query(
            `insert into test(${Object.keys(
              userData
            ).join()}) values (${Object.values(userData)
              .map((element) => {
                return "'" + element + "'";
              })
              .join()})`,
            (err, result) => {
              console.log(result);
            }
          );
        });

        // const page = fs.readFileSync("../HTML/index.html", "UTF-8");
        // rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
        // rep.write(page);
        // rep.end();
      }
    }
  } catch {
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
