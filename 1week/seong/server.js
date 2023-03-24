import http from 'http'
import fs from 'fs'
import mysql from 'mysql2'

const htmlHead = fs.readFileSync('./js/html_head.text');
const htmltail = fs.readFileSync('./js/html_tail.text');
const firstpageScript = fs.readFileSync('./js/firstpage.js');
const afterLoginpageScript = fs.readFileSync('./js/afterLoginpage.js');
const SignuppageScript = fs.readFileSync('./js/signup.js');
const firstpage = htmlHead + `<script src='./js/firstpage.js'></script>` + htmltail
let logindata = '';
let inputdata = '';

const connection = mysql.createConnection({
  'host': '192.168.12.215',
  'user': 'loginadmin',
  'password': 'login',
  'database': 'login',
  port: 3306
})

connection.connect(
  console.log('DB 정상 가동중~')
);


const server = http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/') {
    console.log('서버 굴러가는 중 데구루루루룰')
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(firstpage);
    response.end();
  } // 첫페이지

  if (request.method === 'GET' && request.url === '/js/firstpage.js') {
    console.log('첫페이지 자스로딩기딩기딩기')
    response.writeHead(200, { 'Content-Type': 'text/javascript' })
    response.write(firstpageScript);
    response.end();
  } // 첫 페이지의 javascript 읽기.

  if (request.method === 'GET' && request.url.startsWith('/js/afterLoginpage.js')) {
    console.log('로그인 후 페이지 자스 로딩~')
    response.writeHead(200, { 'Content-Type': 'text/javascript' })
    response.write(afterLoginpageScript);
    response.end();
  } // 로그인 후 페이지의 javascipt 읽기.
  // 로그인 후 화면에서 쓰일 자스를 로그인 이후에 GET하면 제대로 되지 않음.

  if (request.method === 'GET' && request.url.startsWith('/js/signup.js')) {
    console.log('회원가입 페이지 자스 로딩~')
    response.writeHead(200, { 'Content-Type': 'text/javascript' })
    response.write(SignuppageScript);
    response.end();
  } // 회원가입 후 페이지의 javascript 읽기.

  if (request.method === 'POST' && request.url.startsWith('/login')) {
    console.log('로그인을 해버리셨네요');

    request.on('data', (data) => {
      logindata += data;
    });// 로그인 시 입력된 데이터 확인. 

    request.on('end', () => {
      const userid = logindata.split('=')[1].split('&')[0];
      const userpass = logindata.split('=')[2];
      // 입력된 데이터들의 아이디 비번 나누기.

      response.writeHead(200, { 'Content-Type': 'text/html' })
      let afterLoginpage = htmlHead + `<script src='./js/afterLoginpage.js'></script>` +
        `<script>mainDiv.children[0].textContent = '안녕하세요, 안반갑습니다! ${userid}님!' </script>`
        + htmltail;
      response.write(afterLoginpage);
      response.end()
    }) // 로그인 이후 페이지
  }

  if (request.method === 'GET' && request.url.startsWith('/Signup')) {
    console.log('회원가입 페이지로 이동하셨어용')

    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    let signuppage = htmlHead + `<script src='./js/signup.js'></script>` + htmltail;
    response.write(signuppage);
    response.end()
  } // 회원가입 신청용 페이지.

  if (request.method === 'POST' && request.url === ('/Signupform')) {
    console.log('회원가입 페이지에서 로그인으로 이동하셨어용');
    request.on('data', (data) => {
      inputdata += data;
    }) // 회원가입에서 입력된 데이터 받기.
    request.on('end', () => {
      console.log(inputdata);
      const userid = inputdata.split('=')[1].split('&')[0];
      const userpass = inputdata.split('=')[2].split('&')[1];
      const username = inputdata.split('=')[3].split('&')[2];
      const useremail = inputdata.split('=')[4].split('&')[3];
      const userbirth = inputdata.split('=')[5];

      let SQL = `insert into login(ID, Pass, name, email, birth) values ('${userid}','${userpass}','${username}','${useremail}','${userbirth}')`;
      console.log(SQL);
      
      // connection.query(SQL, (err, result, field) => {
      //   if (err) console.log('오늘도 어김없이.. ㅎ');
      //   console.log(result);
      // });

      response.write(firstpage)
      response.end()
    })
    // 지금 내가 한 건 페이지를 새로 덮어 쓴거임. 그래서 url이 / 가 아니라 /Signupform 이 됨.
  }
}).listen(2080)

connection.end();