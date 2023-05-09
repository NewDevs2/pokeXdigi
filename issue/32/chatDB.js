import http from "http";
import fs from "fs";
import qs from "querystring";
import path from "path";
import { fileURLToPath } from "url";
import sign_master from "../../src/models/DBConfig.js";
import responseModule from "../../issue/21/responseModule.js";
import { type } from "os";
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
  const page = fs.readFileSync("./chat.html");
  rep.writeHead(200, { "Content-Type": "text/html;" });
  rep.write(page);
  rep.end();
  if (req.method === "POST") {
    console.log("post 요청 수신");
    let chattingLog = "";
    req.on("data", (chunk) => {
      chattingLog += chunk.toString();
    });
    req.on("end", () => {
      let parsedChattingLog = qs.parse(chattingLog);
      let jsonChatting = JSON.stringify(parsedChattingLog);
      fs.writeFileSync(
        path.join(root, "temp", `chatting.JSON`),
        JSON.stringify(jsonChatting)
      );
      console.log(parsedChattingLog);
      console.log(jsonChatting);
    });
  }
});

server.listen(2080, (error) => {
  if (error) {
    throw error;
  }
  console.log("서버 켜짐");
});

// * 아래 내용 -> 쿼리문

// sign_master.query(
//   `INSERT INTO chatting_log(LOG_NUM, ID, CHATTING_LOG) values ('6', 'KRAPLI', '{"name": "John", "age": 30, "city": "New York"}')`,
//   (err, result) => {
//     if (err) {
//       throw err;
//     } else {
//       console.log(result);
//     }
//   }
// );

// JSON 유형
// {"name":"john", "age": 30, "city":"New York"}

// INSERT INTO `ia`.`chatting_log` (`LOG_NUM`, `ID`, `CHATTING_LOG`) VALUES ('3', 'guys', '{\"sup님의 말\":\"반갑습니다\"}');
