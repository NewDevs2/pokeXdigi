      //* 로그인 실패 페이지
      if (req.url.includes("/html/loginFail.html")) {
        responseModule(200, "text/html", req, rep)
      }
      //* 로그인 실패 js파일
      if (req.url.includes("/js/loginFail.js")) {
        responseModule(200, "text/javascript", req, rep)
      }
      //* 로그인 실패 css파일
      if (req.url.includes("/css/loginFail.css")) {
        responseModule(200, "text/css", req, rep)
      }