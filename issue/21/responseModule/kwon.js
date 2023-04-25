//* 메인 페이지 js파일
if (req.url.includes("js/index.js")) {
  responseMdoule(200, "text/javascript", req, rep);
}
//* 계정 찾기 페이지
if (req.url.includes("html/findAccount.html")) {
  responseMdoule(200, "text/html", req, rep);
}
//* 계정 찾기 js파일
if (req.url.includes("js/findAccount.js")) {
  responseMdoule(200, "text/javascript", req, rep);
}
// * 계정 찾기 css파일
if (req.url.includes("css/findAccount.css")) {
  responseMdoule(200, "text/css", req, rep);
}
