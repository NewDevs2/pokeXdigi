import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  if (req.method === "CONNECT") {
    console.log("연결 요청이 왔습니다.");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("CONNECT 요청 처리 완료!");
  } else {
    console.log("GET 요청이 왔습니다.");
    const page = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Connect Test</title>
        </head>
        <body>
          <h1>Connect Test</h1>
          <button id="test">Connect!</button>
          <script>
            const button = document.getElementById("test");
            button.addEventListener("click", async function () {
              const response = await fetch("http://localhost:5050", {
                method: "CONNECT",
              });
              console.log("응답 받음:", response);
            });
          </script>
        </body>
      </html>
    `;
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
    res.write(page);
    res.end();
  }
});

server.listen(5050, () => {
  console.log("서버가 시작되었습니다.");
});
