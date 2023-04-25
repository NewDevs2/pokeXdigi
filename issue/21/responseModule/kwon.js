//* 메인 페이지 js파일
if (req.url.includes("js/index.js")) {
  responseModule(200, "text/javascript", req, rep);
}
//* 계정 찾기 페이지
if (req.url.includes("html/findAccount.html")) {
  responseModule(200, "text/html", req, rep);
}
//* 계정 찾기 js파일
if (req.url.includes("js/findAccount.js")) {
  responseModule(200, "text/javascript", req, rep);
}
// * 계정 찾기 css파일
if (req.url.includes("css/findAccount.css")) {
  responseModule(200, "text/css", req, rep);
}
