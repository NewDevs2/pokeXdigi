//? tahMaker.js 응답 추가
if (req.url.includes("tag/tagMaker.js")) {
  rep.writeHead(200, {"Content-Type":"text/javascript; charset=utf-8"});
  rep.wirte(fs.readFileSync(path.join(root,req.url),"utf-8"));
  rep.end();
}

//? 오탈자 (Tpye -> Type)
      //* 로그인 페이지
      if (req.url.includes("html/login.html")) {
        const data = fs.readFileSync(path.join(root, req.url), "utf-8");
        rep.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        rep.write(data);
        rep.end();
      }
      //* 로그인 페이지 css
      if (req.url.includes("css/login.css")) {
        const data = fs.readFileSync(path.join(root, req.url), "utf-8");
        rep.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
        rep.write(data);
        rep.end();
      }
      //* 로그인 페이지 js파일
      if (req.url.includes("js/login.js")) {
        const data = fs.readFileSync(path.join(root, req.url), "utf-8");
        rep.writeHead(200, {
          "Content-Type": "text/javascript; charset=utf-8",
        });
        rep.write(data);
        rep.end();
      }