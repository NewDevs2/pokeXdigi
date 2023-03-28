
// ? npm modules
import { info } from 'console'
import http from 'http'
import test from 'node:test';
import { parse, resolve } from 'path'
import qs from 'qs';
import mysql2 from 'mysql2';

// ? page.js modules 
import { firstPage } from './page.js';
import { loginPage } from './page.js';
import { greeting } from './page.js';
import { createAccountPage } from './page.js';
import { createAccountForm } from './page.js';
import { resultPage } from './page.js';
import { create } from 'domain';
import { idfalse, pwfalse } from './infocheck.js';
//




// ? mysql에 접속하기 위해 통신 객체 설정.
const conn = mysql2.createConnection({
  host       : 'localhost',
  user       : 'root',
  password   : 'VHzmffkr1208',
  database   : 'user_info',
  port       :  3306,
  socketPath : '/tmp/mysql.sock' //! /tmp/mysql.sock ! 에러 코드 -61, 'ECONNREFUSED' 해결해준 코드. 왜 해결됐는지 이유 찾아보기
});


const server = http.createServer(function(request, response) {
  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(firstPage);
    response.end();
  }
  if (request.method === 'POST' && request.url.startsWith('/login')) {
    response.write(loginPage);
    response.end();
  }
  if (request.method === 'POST' && request.url.startsWith('/create')) {
    response.write(createAccountPage);
    response.end();
  }

  if (request.method === 'POST' && request.url.startsWith('/accountSubmit')) {
    let infoData = '';
    request.on('data', function(data) {
      infoData = infoData + data;
    })

    request.on('end', function() {
      let parsedData = qs.parse(infoData);
      console.log(parsedData);

      if (parsedData.id.length < 4) {
        response.write(idfalse);
        return createAccountPage;
      }

      if (parsedData.password.length < 8) {
        response.write(pwfalse);
        return createAccountPage;
      }

      if (parsedData.id.length > 4 || parsedData.password.length <= 20) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end(resultPage(parsedData.name, parsedData.id, parsedData.password, parsedData.email));
  
        conn.connect();
        
        let userInfoInsert = `INSERT INTO user_information (name, id, password, email) VALUE('${parsedData.name}', '${parsedData.id}', '${parsedData.password}', '${parsedData.email}');`
  
        conn.query(
        userInfoInsert, (err,result,fields) => {
        if (err) throw err;
        console.log(result);
        });
      };
    });
  };


  if (request.method="POST" && request.url.startsWith('/logincheck')) {
    let loginData = '';
    request.on('data', function(data) { 
      loginData = loginData + data; 
      // console.log(loginData);
    });
    
    request.on('end', function() {
      let parsedLoginData = qs.parse(loginData);
      let LoginId = parsedLoginData.id;
      let LoginPw = parsedLoginData.password;
      // console.log(parsedLoginData);
      
      conn.connect();

      let userInfoSearch = `
      select id,password from user_information where id='${LoginId}' or password='${LoginPw}';
      `
      conn.query(
        userInfoSearch, (err,result,fields) => {
        if (err) throw err;
        console.log(result);
        if (LoginId === result[0].id && LoginPw === result[0].password) {
          console.log('비밀번호 맞음');
        } else {
          console.log('비밀번호 틀림');
        }
        });
    })
  }

});



server.listen(2080, function() {
  console.log('server is runnig...');
})