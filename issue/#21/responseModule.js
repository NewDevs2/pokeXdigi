// 서버 요청 응답 함수
export default function(rep=rep) {
  // req.url에 따라 content-type(mime)을 자동으로 정해주는 거 어때?
  // response의 writehead, write, end먼저 해보자
  // ?모듈로 사용할 때는 rep에 대한 정보를 매개변수로 넣어줘야 함
  // ! mime만 바뀌는데 매번 작성해야돼? -> 
  // ! if문의 조건(req.url)이 불편했다. ->
  // ! fs.readFileSync 쓸 때 경로 쓰는 거 너무 불편해 ->
  // ! 중복코드가 너무 많다. ->
  // ? 바뀌는 부분은 리터럴로 사용, 바뀌는 부분만 default parameter로 사용하는 함수를 만들면 해결 할 수 있다.
  if (req.url.includes("js/index.js")) {
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
}
