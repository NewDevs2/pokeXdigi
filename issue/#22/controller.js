import http from "http"
import fs from "fs";
import qs from "querystring";
import path, { join } from "path";
import { fileURLToPath } from "url";
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const root = path.join(__dirName, "../../");

http.createServer((req,rep)=> {
  try {
// !statusCode, 파일의 타입, 경로를 작성(배열로)하는 함수
    function printPage(statusCode, type, paths) {
      // filePath를 배열로 받아옴
      const filePath = path.join(root, ...paths);
      const fileContent = fs.readFileSync(filePath,"UTF-8");
      // statusCode -> 404,200 등 수정 가능
      rep.writeHead(statusCode, {
        // js, css, html 파일 등 type과 charset에 대한 정보 담음
        "Content-Type": type,
      });
      rep.write(fileContent);
      rep.end();
    }

    if (req.url === "/") {
      const page = fs.readFileSync(
        path.join(root, "src", "views", "html", "index.html"),
        "UTF-8"
      );
      rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
      rep.write(page);
      rep.end();
    }
   
    if (req.url.includes("js/index.js")) {
      // 호출
      printPage(200,"text/javascript; charset=UTF-8;",["src", "views", "js", "index.js"])
    }

    if (req.url.includes("tag/tagMaker.js")) {
      const page = fs.readFileSync(
        path.join(root, "src", "models", "tag", "tagMaker.js"),
        "UTF-8"
      );
      rep.writeHead(200, {
        "Content-Type": "text/javascript; charset=UTF-8;",
      });
      rep.write(page);
      rep.end();
    }
    //! POST요청 페이지 함수 제작
    function test(callback) {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on('end',()=> {
        callback(data)
      })
    }
    


    // POST 요청에 대한 처리
    if (req.url.includes("/html/checkCreateAccount")) {
      // POST데이터를 url의 쿼리 데이터를 활용하는 건 같음
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      // end에 대한 데이터 처리를 함수로 만드는게 좋아보임-> 로그인, 회원가입 등 각각 처리하는 방식이 차이가 있음
      // ! req.end에 대한 처리만 콜백 함수로 만들어서 처리를 알아서 하게 만들어보자
      req.on("end", () => {
        const userData = qs.parse(data);
        // console.log(userData)
        fs.writeFileSync(
          path.join(root, "temp", `${userData.id}_createAccountCheck.JSON`),
          // json 형태로 파일 저장
          JSON.stringify(userData)
        );
        // !변수 이름 바꿔줘 제발
        // 제이슨 파일을 바로 파싱하는 구간
        const createAccountCheck = fs.readFileSync(
          path.join(root, "temp", `${userData.id}_createAccountCheck.JSON`),
          "utf-8"
        );
        const parsedCreateAccountCheck = JSON.parse(createAccountCheck);
        // console.log(parsedCreateAccountCheck)
        const column = Object.keys(
          parsedCreateAccountCheck).join();
        const values = Object.values(parsedCreateAccountCheck)
        .map((element) => {
          return "'" + element + "'";
        })
        .join()
      // })
        console.log(column,values)
        // 회원가입 쿼리문
        sign_master.query(
            `INSERT INTO user_information(${column}) values (${values})`,
            (err, result) => {
              fs.unlinkSync(
                path.join(root, "temp", `${userData.id}_createAccountCheck.JSON`)
              );
              if(err) {
                // ! 회원가입 실패 시 보여줄 페이지 작성해야 함.
                // rep.writeHead(200,{"Content-Type":"text/html"})
                throw err
              };
              rep.writeHead(200,{"Content-Type":"text/html"});
              rep.write(`<script>location.href = "/src/views/html/accountSuccess.html"</script>`);
              rep.end();
              // console.log(result);
            }
          );
        // console.log(userData)
        // const column = Object.keys(userData);
        // console.log([...column],...Object.values(userData))
        // 클라이언트 인풋데이터를 클래스로 만들자
        // sign_master.query(
        //   `insert into test(${Object.keys(
        //     userData
        //   ).join()}) values (${Object.values(userData)
        //     .map((element) => {
        //       return "'" + element + "'";
        //     })
        //     .join()})`,
        //   (err, result) => {
        //     console.log(result);
        //   }
        // );
      });

      // const page = fs.readFileSync("../HTML/index.html", "UTF-8");
      // rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
      // rep.write(page);
      // rep.end();
    }
  } catch (err) {
    console.log(err)
    throw err;
  }
}).listen(8080,()=> {
  console.log("연결 됨")
})
