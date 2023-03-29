// ? 모듈

import http from 'http' 
import mysql2 from 'mysql2';
import fs from 'fs';

// ? 페이지

import { firstPage } from './Pages/firstPage.js';
import { loginPage } from './Pages/loginPage.js';
import { createAccountPage } from './Pages/createAccount.js';
import { createAccountForm } from './Pages/createAccount.js';
import { resultPage } from './Pages/resultPages.js';
import { idCheckfalse, idfalse, pwCheckFalse, pwfalse } from './Pages/infoCheck.js';
//


// ? 앱 서버



const appServer = http.createServer(function(request, response) {
  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(firstPage);
    console.log(firstPage);
    response.end();
  }
  if (request.method === 'POST' && request.url.startsWith('/login')){
    response.write(loginPage);
    console.log(loginPage)
    response.end();
  }
  if (request.method === 'POST' && request.url.startsWith('/create')) {
    response.write(createAccountPage);
    response.end();
  }
})


appServer.listen(2080, function () {
  console.log('Appserver is Running. . .');
})

// post 요청이 왔을 때, 그 자체가 clickevent다
// json을 만들어줘 등등 시도해볼것

// ? DB 서버


const conn = mysql2.createConnection({
  host       : 'localhost',
  user       : 'root',
  password   : 'VHzmffkr1208',
  database   : 'user_info',
  port       :  3306,
  socketPath : '/tmp/mysql.sock'
});

conn.connect();
let conncetionTest = `show databases;`
console.log('DB server is Running. . .');

// conn.query(conncetionTest, function(err, result, fields) {
//   if (err) throw err;
//   console.log(result);
// })

// const dbServer = http.createServer(function(request, response) {
//   if (request.method === 'GET' && request.url === '/') {
//   }
// })

// conn.listen(3080, function () {
//   console.log('DBserver is Running');
// })
