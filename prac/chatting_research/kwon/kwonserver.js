import http from "http";
import fs from "fs";
import qs from "querystring";
import { Server } from "socket.io";
import cryto from "crypto";

const algorithm = "aes-256-cbc";
const password = "my-secret-password";
const salt = cryto.randomBytes(16);
const key = cryto.pbkdf2Sync(password, salt, 100000, 32, "sha512");
const iv = cryto.randomBytes(16);

// 암호화
function encrypt(text) {
  const cipher = cryto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// 복호화
function decrypt(encrypted) {
  const decipher = cryto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// ! 쿠기를 가져와 설정 한다.
// function setCookie(name, value, days) {
//   let expires = "";
//   if (days) {
//     const date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     expires = `; expires=${date.toUTCString()}`;
//   }
//   document.cookie = `${name}=${value}${expires}; path=/`;
// }

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      const ck = fs.readFileSync("./ck.html", "utf-8");

      res.setHeader("Content-Type", "text/html");
      res.end(ck);
      break;
    case "POST":
      if (req.url === "/login") {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          const postData = qs.parse(data);
          const client = fs.readFileSync("./kwonclient.html", "utf-8");
          res.setHeader("Content-Type", "text/html");
          // ! id 값이 넘어 오는것을 확인 하였다.
          console.log(postData.id);
          // ! 암호화 하기
          // const hash = cryto.createHash('a').update(postData.id).digest("hex");
          // ! 넘어온 id 값을 암호화 해준다.
          // const encryptedText = encrypt(postData.id);
          // console.log("Encrypted text:", encryptedText);

          // const hash =  crypto.randomBytes(16).toString("hex").update(postData.id);
          // console.log(hash);

          // setCookie("test", encrypt(postData.id), 7);

          const expires = new Date(Date.now() + 86400000); // 24시간 후 만료
          res.setHeader('Set-Cookie', `test=${encrypt(postData.id)}; Expires=${expires.toUTCString()}`);

          // response.setHeader('Set-Cookie', `testCookie=${postData.id}; Expires=${expires.toUTCString()}`);
          res.end(client);
          // res.setHeader("Set-Cookie", `testCookie=${postData.id}`);

          // res.end(client);
        });
      }
  }
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    // try{
    //   if(msg !== ""){
    //     console.log("message: " + msg);
    //     io.emit("chat message", msg);
    //   }
    // }
    // catch(error){

    // }
    try {
      // ! JSON으로 넘어온 값을 객체로 파싱 해준다.
      const msgParse = JSON.parse(msg);
      // console.log(socket.apt);
      // ! 암호화된 값을 복호화를 통해 내보낸다.
      // const decryptedText = decrypt(msgParse.id);
      // console.log("Decrypted text:", decryptedText);

      // ! 객체로 된 값을 객체 넣어 한번데 클라이언트로 보내어 준다.
      const objtest = {
        id: decrypt(msgParse.id),
        message: msgParse.message,
      };
      //  ! 클라이언트에 보내주기 전에 다시 JSON으로 바꾸어 준다.
      if (msgParse.message !== "") {
        const js = JSON.stringify(objtest);
        // console.log(msg)
        console.log(objtest);
        io.emit("chat message", js);
      } else {
        alert("공백을 입력 하셨습니다.");
      }
    } catch (error) {}
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(2222, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log("성공");
});

// import http from 'http';
// import { Server } from 'socket.io';

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.end('Hello World\n');
// });

// const io = new Server(server);

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// server.listen(2222, () => {
//   console.log('Server is listening on port 2222');
// });
