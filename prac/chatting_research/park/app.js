import { createServer } from "http";
import fs from "fs";
import { server } from "socket.io";

const httpServer = createServer((req, rep) => {
  if (req.url === "/") {
    const page = fs.readFileSync("./index.html");
    rep.writeHead(200, { "Content-Type": "text/html; UTF-8" });
    rep.write(page);
    rep.end();
  }
});

const io = new Server(httpServer);

httpServer.listen(5050, function (error) {
  console.log("server is runnig");
  if (error) {
    throw error;
  }
});
