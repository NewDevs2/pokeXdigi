import fs from "fs";


export default function repPageWrite(filepath, rep, Type) {
  // content-Type 에 대해 배열로 만듦
  const contentType = ["text/html; charset=UTF-8;", "text/css; charset=UTF-8;", "text/javascript; charset=UTF-8;"]

  // 페이지 읽어 담는 변수
  const page = fs.readFileSync(
    filepath,
    "UTF-8"
  );

  // 컨텐츠 타입 배열에 대해 인덱스 하나씩 콜백함수 실행
  contentType.forEach((type)=>{

    // 만약 인덱스값에 매개변수 Type 이 포함되어있다면
    if(type.includes(Type)){
      // 아래 작성
      rep.writeHead(200, { "Content-Type": type });
    }
  })
  // 페이지 작성
  rep.write(page);
  rep.end();
}
