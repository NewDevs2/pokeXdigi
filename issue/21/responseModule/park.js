//* 회원가입 html 파일 - 박준형
if (req.url.includes("html/createAccount.html")) {
  responseMdoule(200, "text/html", req, rep);
}
//* 회원가입 js 파일 - 박준형
if (req.url.includes("js/createAccount.js")) {
  responseMdoule(200, "text/javascript", req, rep);
}
//* tagMaker.js 응답 추가
if (req.url.includes("tag/tagMaker.js")) {
  responseMdoule(200, "text/javascript", req, rep);
}
//* 회원가입 css 파일 - 박준형
if (req.url.includes("css/createAccount.css")) {
  responseMdoule(200, "text/css", req, rep);
}
