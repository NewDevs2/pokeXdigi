// 서버 요청 응답 함수
export default function(statusCode, type, rep=rep, req=req) {
  // ! Default Parameter는 뒤에다가 놓으면 작성하지 않아도 실행 됨
  // req.url에 따라 content-type(mime)을 자동으로 정해주는 거 어때?
  // response의 writehead, write, end먼저 해보자
  // ?모듈로 사용할 때는 rep에 대한 정보를 매개변수로 넣어줘야 함
  // ? 바뀌는 부분은 리터럴로 사용, 바뀌는 부분만 default parameter로 사용하는 함수를 만들면 해결 할 수 있다.
    // ! if문의 조건(req.url)이 불편했다. -> 매개변수

  // ? 보류 if (req.url.includes("js/index.js")) {
    // write에 담을 내용은 변수로 담을지 wite에서 처리할지 미정 알아서 해
      // ! fs.readFileSync 쓸 때 경로 쓰는 거 너무 불편해 -> 매개변수
    const fileContent = fs.readFileSync(
      // 뒤의 경로(파일 위치)이 그대로 담겨 옴
      path.join(root, req.url),
      "UTF-8"
    );
    // ! 중복코드가 너무 많다. -> 함수로 만들어  
    // ! mime만 바뀌는데 매번 작성해야돼? -> 매개변수
    rep.writeHead(statusCode, {
      // mime만 변동 될 것 같음
      "Content-Type": type + "; charset=UTF-8;",
    });
    rep.write(fileContent);
    rep.end();
  }
// }

// 요청이 왔을 때 실행되는 함수니까 -> 응답에 요청하는 데 활용되야 함
// 조건까지 넣는다면 모순 아닐까? 
// ?if 조건에 맞는 요청 응답만 모듈화 하기로 결정
