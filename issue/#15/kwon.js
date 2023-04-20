  //* 최초 접속
if(req.url.includes("index.html")){
  const page = fs.readFileSync(
    path.join(root, "src", "views", "html", "index.html"),
    "UTF-8"
  );
  rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
  rep.write(page);
  rep.end();
}
//* 메인 페이지 js파일
if(req.url.includes('index.js')){
  const script = fs.readFileSync(
    path.join(root, "src", "views", "js", "index.js"),
    "UTF-8"
  );
  rep.writeHead(200, {
    "Content-Type": "text/javascript; charset=UTF-8;",
  });
  rep.write(script);
  rep.end();
}
//* 계정 찾기 페이지
if(req.url.includes('findAcconut.html')){
  const page = fs.readFileSync(
    path.join(root, "src", "views", "html", "findAccount.html"),
    "UTF-8"
  );
  rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
  rep.write(page);
  rep.end();
}
//* 계정 찾기 js파일
if(req.url.includes('findAccount.js')){
  const script = fs.readFileSync(
    path.join(root, "src", "views", "js", "findAccount.js"),
    "UTF-8"
  );
  rep.writeHead(200, {
    "Content-Type": "text/javascript; charset=UTF-8;",
  });
  rep.write(script);
  rep.end();
}


