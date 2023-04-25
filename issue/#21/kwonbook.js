import http from "http";
import fs from "fs";
import qs from "querystring";
import path from "path";
import { fileURLToPath } from "url";
// import sign_master from "../models/DBConfig.js";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const root = path.join(__dirName, "../../");

// sign_master.connect(function (err) {
//   if (err) {
//     throw err;
//   }
//   console.log("DB 연결");
// });

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
  } 
  else if(reqUrl.includes('.html')){
    rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
    rep.write(fs.readFileSync(path.join(root, reqUrl), "utf-8"));
    rep.end();
  }
 else if (reqUrl.includes(".css")) {
    rep.writeHead(200, { "Content-Type": "text/css; charset=UTF-8;" });
    rep.write(fs.readFileSync(path.join(root, reqUrl), "utf-8"));
    rep.end();
  } else if (reqUrl.includes(".js")) {
    rep.writeHead(200, { "Content-Type": "text/javascript; charset=UTF-8;" });
    rep.write(fs.readFileSync(path.join(root, reqUrl), "utf-8"));
    rep.end();
  }
}

const server = http.createServer((req, rep) => {
  try {
    switch (req.method) {
      case "GET":
        reqMethodGet(req.url, rep);
        break;

      case "POST":
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
