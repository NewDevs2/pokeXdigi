import http from "http";
import fs from "fs";
import qs from "querystring";
import path from "path";
import { fileURLToPath } from "url";
import sign_master from "../models/DBConfig.js";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const root = path.join(__dirName, "../../");

// sign_master.connect(function (err) {
//   if (err) {
//     throw err;
//   }
//   console.log("DB 연결");
// });

function servermodule(reqUrl,rep){
  rep.writeHead(200, {'Content-Type': 'text/html'});
  rep.write(fs.readFileSync(path.join(root,reqUrl)));
  rep.end();
}

const server = http.createServer((req, rep) => {
 try{
  switch(req.method){
    case 'GET':
    if(req.url === includes('.html')){
      servermodule(req.url,rep);
    }
    case 'POST':
  }
 }
  
  catch (err) {
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











