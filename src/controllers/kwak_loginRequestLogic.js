      //* 로그인 페이지
      if (req.url === '/src/views/html/login.html') {
        const data = fs.readFileSync(path.join(root,req.url), "utf-8");
        rep.writeHead(200, { "Content-Tpye": "text/html; charset=utf-8" });
        rep.write(data);
        rep.end();
      }
      //* 로그인 페이지 css
      if (req.url === '/src/views/css/login.css') {
        const data = fs.readFileSync(path.join(root,req.url), "utf-8");
        rep.writeHead(200, { "Content-Tpye": "text/css; charset=utf-8" });
        rep.write(data);
        rep.end();
      }
      //* 로그인 페이지 js파일
      if (req.url === '/src/views/js/login.js') {
        const data = fs.readFileSync(path.join(root,req.url), "utf-8");
        rep.writeHead(200, {
          "Content-Tpye": "text/javascript; charset=utf-8",
        });
        rep.write(data);
        rep.end();
      }