const { rejects } = require("assert");
const http = require("http");
const { resolve } = require("path");
const fs = require("fs");
const qs = require("qs");
const url = require("url");
const loginPage = http.createServer((request, response) => {
  return new Promise((resolve, reject) => {
    let data = fs.readFile("./main.html");
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    if (_url == "/") {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      // console.log(_url);
      resolve(response.end(data));
    } else {
      reject(new Error("no"));
    }
  });
});

loginPage.listen(3030, () => {
  console.log("연결 요청");
});
