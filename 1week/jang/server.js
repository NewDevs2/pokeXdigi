const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async (request, response) => {
    const data = await fs.readFile("./index.html");
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(data);
  })
  .listen(8080, () => {
    console.log("연결 됐어");
  });
