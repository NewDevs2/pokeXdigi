// ? 모듈

import http from "http";
import mysql2 from "mysql2";
import fs from "fs";

// ? 페이지

import { firstPage } from "./Pages/firstPage.js";
import { loginPage } from "./Pages/loginPage.js";
import { createAccountPage } from "./Pages/createAccount.js";
import { createAccountForm } from "./Pages/createAccount.js";
import { resultPage } from "./Pages/resultPages.js";
import {
  idCheckfalse,
  idfalse,
  pwCheckFalse,
  pwfalse,
} from "./Pages/infoCheck.js";
//

// ? firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDklzS8suBOmSFoHWEqdeq8GUAnsLpE5bs",
  authDomain: "newdevstest-7c299.firebaseapp.com",
  projectId: "newdevstest-7c299",
  storageBucket: "newdevstest-7c299.appspot.com",
  messagingSenderId: "375234057562",
  appId: "1:375234057562:web:0d6af597368c1236dd0f63",
  measurementId: "G-6CRB2NR42K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ? 앱 서버

const appServer = http.createServer(function (request, response) {
  if (request.method === "GET" && request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(firstPage);
    console.log(firstPage);
    response.end();
  }
  if (request.method === "POST" && request.url.startsWith("/login")) {
    response.write(loginPage);
    console.log(loginPage);
    response.end();
  }
  if (request.method === "POST" && request.url.startsWith("/create")) {
    response.write(createAccountPage);
    response.end();
  }
});

appServer.listen(2080, function () {
  console.log("Appserver is Running. . .");
});

// post 요청이 왔을 때, 그 자체가 clickevent다
// json을 만들어줘 등등 시도해볼것

// ? DB 서버

const conn = mysql2.createConnection({
  host: "192.168.0.156",
  user: "admin_park",
  password: "VHzmffkr1208",
  database: "IA",
  port: 3306,
  // socketPath : '/tmp/mysql.sock'
});

conn.connect();
let conncetionTest = `show databases;`;

conn.query(conncetionTest, (err, result, fields) => {
  if (err) throw err;
  console.log(result);
});
console.log("DB server is Running. . .");
conn.end();

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

// ! teamplate engine -> ejs , pug, handlebars, nunjucks
// ? JSON으로 바꾸는 연습 : DB가 해석하기 너무 편하다. JSON 핸들링에 익숙해질 수 있다. 나중에 JSON에 의존하지 않게 된다.
