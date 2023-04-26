if (req.url === "/" || req.url.includes("index.html")) {
  //! 해결 못 함 responseModule(200, "text/html", req, rep);
  const page = fs.readFileSync(
    path.join(root, "src", "views", "html", "index.html"),
    "UTF-8"
  );
  rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;"},`CONNECT ${root} HTTP/1.1`);
  rep.write(page);
  rep.end();
}