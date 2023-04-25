
if (req.url === "/" || req.url.includes("index.html")) {
  repPageWrite(path.join(root, "src", "views", "html", "index.html"), rep, "html")
}
//* 메인 페이지 js파일
if (req.url.includes("js/index.js")) {
  repPageWrite(path.join(root, "src", "views", "js", "index.js"), rep, "javascript")
}