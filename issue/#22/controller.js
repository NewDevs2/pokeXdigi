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
// statusCode, 파일의 타입, 경로를 작성(배열로)하는 함수
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
      // const script = fs.readFileSync(
      //   path.join(root, "src", "views", "js", "index.js"),
      //   "UTF-8"
      // );
      // rep.writeHead(200, {
      //   "Content-Type": "text/javascript; charset=UTF-8;",
      // });
      // rep.write(script);
      // rep.end();

      // 호출하는 곳
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
  } catch (err) {
    console.log(err)
    throw err;
  }
}).listen(8080,()=> {
  console.log("연결 됨")
})
// function test() {
//   let abc = "abc"
//   if()
// }
// function printPage(filePath, fileName,statusCode,type) {
//       if (req.url.includes(fileName)) {
//         const page = fs.readFileSync(
//           path.join(root, filePath,fileName),
//           "UTF-8"
//         );
//         rep.writeHead(statusCode, {
//           "Content-Type": type,
//         });
//         rep.write(page);
//         rep.end();
//       }
//     }
//     if (req.url === "/" || req.url.includes("index.html")) {
//       const page = fs.readFileSync(
//         path.join(root, "src", "views", "html", "index.html"),
//         "UTF-8"
//       );
//       rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
//       rep.write(page);
//       rep.end();
//     }
   //   // 우리가 페이지를 출력하는 방식이 fs를 고정으로 사용하고 path를 사용해 경로를 입력하며 
    //   // writehead(바뀔 숫자(statusNum), contentType )은 변하는 값으로 넣어야 함
    //   // rep.write과 end는 고정적
    //   if (req.url.includes("css/createAccount.css")) {
    //     const page = fs.readFileSync(
    //       path.join(root, "src", "views", "css", "createAccount.css"),
    //       "UTF-8"
    //     );
    //     rep.writeHead(200, {
    //       "Content-Type": "text/css; charset=UTF-8;",
    //     });
    //     rep.write(page);
    //     rep.end();
    //   } 
    //   function printPage(filePath, fileName,statusCode,type) {
    //     if (req.url.includes(fileName)) {
    //       const page = fs.readFileSync(
    //         path.join(root, filePath,fileName),
    //         "UTF-8"
    //       );
    //       rep.writeHead(statusCode, {
    //         "Content-Type": type,
    //       });
    //       rep.write(page);
    //       rep.end();
    //     }
    //   }
    // // post로 데이터 처리하는 페이지는 includes에 들어갈 경로, data는 url의 쿼리에 들어가는 것 고정
    // // fs로 저장 할 data form의 name값=id와 함께 json 파일을 생성후 json형태로 저장하는게 회원가입과 로그인의 기본적인 데이터 처리방식
    // else if (req.method === "POST") {
    //   if (req.url.includes("/html/checkCreateAccount")) {
    //     let data = "";
    //     req.on("data", (chunk) => {
    //       data += chunk;
    //     });
    //     req.on("end", () => {
    //       const userData = qs.parse(data);
    //       // console.log(userData)
    //       fs.writeFileSync(
    //         path.join(root, "temp", `${userData.id}_createAccountCheck.JSON`),
    //         JSON.stringify(userData)
    //       );
    //       // !변수 이름 바꿔줘 제발
    //       // 제이슨 파일 가져와서 파싱하는 구간
    //       const createAccountCheck = fs.readFileSync(
    //         path.join(root, "temp", `${userData.id}_createAccountCheck.JSON`),
    //         "utf-8"
    //       );
    //       const parsedCreateAccountCheck = JSON.parse(createAccountCheck);
    //       // console.log(parsedCreateAccountCheck)
    //       const column = Object.keys(
    //         parsedCreateAccountCheck).join();
    //       const values = Object.values(parsedCreateAccountCheck)
    //       .map((element) => {
    //         return "'" + element + "'";
    //       })
    //       .join()
    //     // })
    //       console.log(column,values)
    //       // 회원가입 쿼리문
    //       sign_master.query(
    //           `INSERT INTO user_information(${column}) values (${values})`,
    //           (err, result) => {
    //             fs.unlinkSync(
    //               path.join(root, "temp", `${userData.id}_createAccountCheck.JSON`)
    //             );
    //             if(err) {
    //               // ! 회원가입 실패 시 보여줄 페이지 작성해야 함.
    //               // rep.writeHead(200,{"Content-Type":"text/html"})
    //               throw err
    //             };
    //             rep.writeHead(200,{"Content-Type":"text/html"});
    //             rep.write(`<script>location.href = "/src/views/html/accountSuccess.html"</script>`);
    //             rep.end();
    //             // console.log(result);
    //           }
    //         );
    //       // console.log(userData)
    //       // const column = Object.keys(userData);
    //       // console.log([...column],...Object.values(userData))
    //       // 클라이언트 인풋데이터를 클래스로 만들자
    //       // sign_master.query(
    //       //   `insert into test(${Object.keys(
    //       //     userData
    //       //   ).join()}) values (${Object.values(userData)
    //       //     .map((element) => {
    //       //       return "'" + element + "'";
    //       //     })
    //       //     .join()})`,
    //       //   (err, result) => {
    //       //     console.log(result);
    //       //   }
    //       // );
    //     });

    //     // const page = fs.readFileSync("../HTML/index.html", "UTF-8");
    //     // rep.writeHead(200, { "Content-Type": "text/html; charset=UTF-8;" });
    //     // rep.write(page);
    //     // rep.end();
    //   }
    //   // * 로그인 요청 들어왔을 때
    //   if (req.url.includes("/checkLogin")) {
    //     console.log("로그인 시도 테스트");
    //     let userData = "";
    //     req.on("data", (chunk) => {
    //       userData += chunk;
    //     });
    //     req.on("end", () => {
    //       //* 클라이언트 인풋 데이터
    //       let parsedData = qs.parse(userData);
    //       // console.log(parsedData);
    //       //* 회원 정보를 JSON 형태로 변환
    //       fs.writeFileSync(
    //         path.join(root, "temp", `${parsedData.UserID}_loginCheck.JSON`),
    //         JSON.stringify(parsedData)
    //       );
    //       //* 클라이언트 인풋 JSON 데이터 파싱
    //       const jsonCheck = fs.readFileSync(
    //         path.join(root, "temp", `${parsedData.UserID}_loginCheck.JSON`),
    //         "utf-8"
    //       );
    //       const parsedJsonCheck = JSON.parse(jsonCheck);
    //       // console.log(parsedJsonCheck);
    //       sign_master.query(
    //         `SELECT ID,PASSWORD FROM user_information WHERE ID="${parsedJsonCheck.UserID}" AND PASSWORD="${parsedJsonCheck.UserPW}"`,
    //         function (err, result, fields) {
    //           if (err) {
    //             throw err;
    //           }
    //           console.log(result);
    //           //* 대조 후 JSON 파일 삭제
    //           fs.unlinkSync(
    //             path.join(root, "temp", `${parsedData.UserID}_loginCheck.JSON`)
    //           );
    //           //* 로그인 성공 / 실패 결과
    //           if (result.length === 0) {
    //             //* 로그인 성공 시
    //             console.log("실패");
    //             rep.writeHead(200, { "Content-Type": "text/html" });
    //             rep.write(
    //               `<script>location.href = "/src/views/html/loginFail.html"</script>`
    //             );
    //           } else if (result.length === 1) {
    //             //* 로그인 성공 시 메인 페이지로 이동
    //             console.log("성공");
    //             rep.writeHead(200, { "Content-Type": "text/html" });
    //             rep.write(
    //               `<script>location.href = "/src/views/html/index.html"</script>`
    //             );
    //             rep.end();
    //           } else {
    //             console.log("뭔가 잘못됨");
    //             console.log(parsedData);
    //           }
    //         }
    //       );
    //     });
    //   }
    // }
