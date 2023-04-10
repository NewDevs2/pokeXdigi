import http from 'http'
import fs from 'fs'
import mysql from 'mysql2'

const htmlHead = fs.readFileSync('./js/html_head.txt');
const htmltail = fs.readFileSync('./js/html_tail.txt');
const firstpageScript = fs.readFileSync('./js/firstpage.js');
const afterLoginpageScript = fs.readFileSync('./js/afterLoginpage.js');
const SignuppageScript = fs.readFileSync('./js/signup.js');
const firstpage = htmlHead + `<script src='./js/firstpage.js'></script>` + htmltail;

let loginid=[];
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

  // _________________________JS 파일_________________________
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
  // __________________________________________________________

  if (request.method === 'POST' && request.url.startsWith('/login')) {
    console.log('로그인을 해버리셨네요');

    request.on('data', (data) => {
      logindata += data;
    });// 로그인 시 입력된 데이터 확인. 

    request.on('end', () => {
      const userid = logindata.split('=')[1].split('&')[0];
      const userpass = logindata.split('=')[2];
      // 입력된 데이터들의 아이디 비번 나누기.

      // connection.query(`select * from login`, (err,result,field)=>{
      //   if(err) console.err('돌아가')
      //   for(let i=0; i<result.length; i++){
      //     loginid[i]=result[i].ID;
      //     console.log(result.length)
      //   }
      //   if(loginid.includes(`${userid}`)===false){
      //     console.log('존재하지 않는 아이디입니다.')
      //   }
      // })
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

  if (request.method === 'POST' && request.url === ('/')) {
    // 예준씨 도움으로 회원가입 후 첫 페이지로 로딩 함!
    console.log('회원가입 페이지에서 로그인으로 이동하셨어용');

    request.on('data', (data) => {
      inputdata += data;
    }) // 회원가입에서 입력된 데이터 받기.

    request.on('end', () => {
      let inputdatas = decodeURIComponent(inputdata);
      // 입력받은 데이터를 한글, 특수문자까지 가능하도록 디코딩
      // console.log(inputdatas);
      // 콘솔 확인.

      const userid = inputdatas.split('=')[1].split('&')[0];
      const userpass = inputdatas.split('=')[2].split('&')[0];
      const username = inputdatas.split('=')[3].split('&')[0];
      const useremail = inputdatas.split('=')[4].split('&')[0];
      const userbirth = inputdatas.split('=')[5];

      let SQL = `insert into login(ID, Pass, name, email, birth) values ('${userid}','${userpass}','${username}','${useremail}','${userbirth}');`;
      // number는 자동 생성이기에 빼고 나머지 입력한 데이터들 DB에 저장
      console.log(SQL);


      connection.query(SQL, (err, result, field) => {
        if(err) {console.log('왜일까'); throw err}
        console.log(result);
      });

      response.write(firstpage);
      response.end();
    })
    
  }
}).listen(2080)

// connection.end();
// 