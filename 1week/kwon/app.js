import fs from 'fs';
import http from 'http';
import qs from 'qs';
import mysql from 'mysql2';
const twoText = (id,pw) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  
  <body>
   
<h1>환영합니다.</h1>
  <p>   ${id}  </p>
<h1>님</h1>

<h1>비밀번호는 </h1>
  <p>   ${pw}  </p>
  <p> 입니다.  </p>
  
  </body>
  
  </html>`
    ;
}



const server = http.createServer(function (request, response) {
  let a = true;
  const conn = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'newdevstest',
    port: 3306,
  }
  const co = mysql.createConnection(conn); //! db 열기
  co.connect(); //! db 접속
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
    

      co.query(`insert into jt(id,jumin,pw) values ('${qsdata.id}','${qsdata.jumin}','${qsdata.pw}');`, function (err, results, fields) {

        if (err) { console.log(err) };
        console.log(results);

      });
   

      //! 값 저장 해둘려고 시도
      co.query(`select * from jt`, function (err, results, fields) {

        if (err) {
          console.log(err);
        };
     
        fs.writeFileSync('./userinfo.js', JSON.stringify(results));
      
      });

      const testlogin = fs.readFileSync('./login.txt', { encoding: 'utf-8' });
   
      response.end(testlogin);

    })
  }

  const errpg = fs.readFileSync('./err.txt', { encoding: 'utf-8' });

  // ! 로르인 하기
  if (request.method === 'POST' && request.url === '/userpg') {
    let testdata = '';
    request.on('data', function (data) {
      testdata = testdata + data;
      return testdata;
    })
    request.on('end', function () {
      let qsdata = qs.parse(testdata);
      co.query(`select id,pw from jt where id = ${qsdata.id} and pw = ${qsdata.pw} `, function (err, results, fields) {

        if (err) {
          console.log(err);
        };
   

        try{
          if(results[0].id === qsdata.id && results[0].pw === qsdata.pw  ){
            console.log(qsdata.id);
            console.log(results[0].id);
    
            response.end(twoText(qsdata.id,qsdata.pw));  
            // ! 로그인 할려고 하는 정보와 일치 하면 페이지를 넘긴다.
            }
        }
        catch(err){
       alert(`실패`);
        }
   
        // ? 로그인 할 때 회원정보 있는지 db에 확인을 하고 나서 페이지 넘김
    
        // ! 로그인 성고 확인
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