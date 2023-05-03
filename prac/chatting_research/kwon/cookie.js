import http from "http";
import fs from "fs";
import qs from "querystring";
const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      const ck = fs.readFileSync("./ck.html", "utf-8");
      const cookieValue = "test-cookie-value";
      res.setHeader("Content-Type", "text/html");
      // res.setHeader('Set-Cookie', `testCookie=${cookieValue}`);
      res.end(ck);
      break;
    case "POST":
      if (req.url === "/login") {
     
        let data = "";
        req.on("data", (chunk) => {
          data += (chunk);
        });
        req.on("end", () => {
          const postData = qs.parse(data);
          const client = fs.readFileSync("./kwonclient.html", "utf-8");
          res.setHeader("Content-Type", "text/html");
          // ! id 값이 넘어 오는것을 확인 하였다.
          console.log(postData.id);
          res.end(client);
        });
      }
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
