import fs from 'fs';
import http from 'http';
import qs from 'qs';
import mysql from 'mysql2';
const twoText = (namedata, jumin, id, pw) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  
  <body>
   
  <p>   ${namedata}  </p>
  <p>  ${jumin}   </p>
  <p>   ${id}  </p>
  <p>   ${pw}  </p>
  
  </body>
  
  </html>`
    ;
}

const mainText = () => {

  return ``;

}

const server = http.createServer(function (request, response) {
  let a = true;

  // ! 메인 페이지
  if (request.method === 'GET' && request.url === '/') {
    //! 조건문을 사용 할 때 메소드를 받을 때 영어를 대문자로 해주어야 인식 한다. 소문자로 입력을 하게 되면 데이터를 못 받더라.
    const mainpg = fs.readFileSync('./mainpg.txt', { encoding: 'utf-8' });
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text-html');
    response.end(mainpg);
  }

  // ! 회원가입 페이지
  if (request.method === 'GET' && request.url === '/join') {
    //텍스트 파일을 불러와 데이터를 뿌려주었다.
    const testjoina = fs.readFileSync('./join.txt', { encoding: 'utf-8' });
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text-html');
    response.end(testjoina);
  }

  //! 로그인 페이지
  if (request.method === 'GET' && request.url === '/login') {
    //로그인 페이지 이동
    const testlogin = fs.readFileSync('./login.txt', { encoding: 'utf-8' });
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text-html');
    response.end(testlogin);
  }
  //회원가입 홈페이지에서 로그인 화면으로 바로 넘어 가기

  // ! 회원가입 정보 db로 넘기기
  if (request.method === 'POST' && request.url === '/login') {
    let testdata = '';
    request.on('data', function (data) {
      testdata = testdata + data;
      return testdata;
    })
    request.on('end', function () {

      let qsdata = qs.parse(testdata);
      const conn = {
        host: '192.168.0.177',
        user: 'idtest',
        password: '1234',
        database: 'newdevstest',
        port: 3306,
      }
      const co = mysql.createConnection(conn); //! db 열기
      co.connect(); //! db 접속

      co.query(`insert into jt(id,jumin,pw) values ('${qsdata.id}','${qsdata.jumin}','${qsdata.pw}');`, function (err, results, fields) {
        if (err) { console.log(err) };
        console.log(results);
        console.log(qsdata.id);
        console.log(qsdata.jumin);
        console.log(qsdata.pw);
      })
      const testlogin = fs.readFileSync('./login.txt', { encoding: 'utf-8' });

      co.end();
      response.end(testlogin);

    })
  }
  // ! 로르인 하기
  if (request.method === 'POST' && request.url === '/userpg') {
    let testdata = '';
    request.on('data', function (data) {
      testdata = testdata + data;
      return testdata;
    })
    request.on('end', function () {

      let qsdata = qs.parse(testdata);
      const conn = {
        host: '192.168.0.177',
        user: 'idtest',
        password: '1234',
        database: 'newdevstest',
        port: 3306,
      }
      const co = mysql.createConnection(conn); //! db 열기
      co.connect(); //! db 접속

      co.query(`select * from jt where id = '${qsdata.id}' and pw = '${qsdata.pw}'`, function (err, results, fields) {

        if (err) {
          console.log(err);
        };

        // const errpg = fs.readFileSync('./err.txt', { encoding: 'utf-8' });
        // response.end(errpg);
  // ! 로그인 정보 실패시


  console.log(results);
        const user = fs.readFileSync('./userpg.txt', { encoding: 'utf-8' });
        co.end();
        response.end(user);
      // ! 로그인 성고 화

      });



    })
  }
});

server.listen(2222, function (error) {
  if (error) { console.log('실패') }
  else {
    console.log('성공');
  }
})