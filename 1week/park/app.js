// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnhLGpwc9MGQ5HJtKU_XbD6ItZQU9KIDM",
  authDomain: "newdevs-c31a3.firebaseapp.com",
  projectId: "newdevs-c31a3",
  storageBucket: "newdevs-c31a3.appspot.com",
  messagingSenderId: "399044827343",
  appId: "1:399044827343:web:8151564c608e4858f13fba",
  measurementId: "G-VZ32WJM2YC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ? qs, mySQL2, http 모듈을 가져옴. 방식은 esm
import { info } from 'console'
import http from 'http'
import test from 'node:test';
import { parse, resolve } from 'path'
import qs from 'qs';
import mysql2 from 'mysql2';
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
  host : 'localhost',
  user : 'root',
  password : 'VHzmffkr1208',
  database : 'user_info',
  port: 3306,
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
      console.log(infoData);
    })

    request.on('end', function() {
      let parsedData = qs.parse(infoData);
      console.log(parsedData);
      if (parsedData.id.length < 4) {
        response.write(idfalse);
        return
      }
      
      if (parsedData.password.length < 8) {
        response.write(pwfalse);
        return
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
      }
      

    });
  };
});



server.listen(2080, function() {
  console.log('server is runnig...');
})