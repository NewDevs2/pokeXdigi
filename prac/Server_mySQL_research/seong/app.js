import http, { request } from 'http';
import fs from 'fs';
import mysql from 'mysql2';

const htmlHead = fs.readFileSync('./js/html_head.txt'); // HTML파일 머리
const htmltail = fs.readFileSync('./js/html_tail.txt'); // HTML파일 꼬리
const firstpageScript = fs.readFileSync('./js/firstpage.js'); // 첫번째페이지의 자바스크립트 파일
const afterLoginpageScript = fs.readFileSync('./js/afterLoginpage.js'); // 로그인 이후 페이지의 자바스크립트 파일
const SignuppageScript = fs.readFileSync('./js/signup.js'); // 회원가입 페이지의 자바스크립트 파일


let loginid = []; // DB에서 받은 id 데이터들을 담는 변수
let NewUserData = ''; // 신규가입 유저의 입력데이터 변수


const connection = mysql.createConnection({
  host: '192.168.12.215',
  user: 'loginadmin',
  password: 'login',
  database: 'login',
  port: 3306
})// DB 생성

connection.connect(
  console.log('Open DB server port is 3306')
); // DB 열고 콘솔 찍기

const server = http.createServer((request, response) => {
  console.log('Open server 2080');
  // 서버 생성 및 콘솔

  if (request.method === 'GET') {
    // request 요청이 GET인 경우

    if (request.url === '/') {
      // GET이면서 url 이 / 인 경우 => 첫번째 페이지

      response.writeHead(200, { 'Content-Type': 'text/html' });

      const firstpage = htmlHead + `<script src='./js/firstpage.js'></script>` + htmltail; // 첫번째 페이지 구성
      response.write(firstpage);
      response.end();
    }

    else if (request.url === '/js/firstpage.js') {
      // 첫번째 페이지의 스크립트 파일
      response.writeHead(200, { 'Content-Type': 'text/javascript' });

      response.write(firstpageScript);
      response.end();
    }

    else if (request.url === '/js/afterLoginpage.js') {
      // 로그인 이후 페이지의 자바스크립트 파일 
      response.writeHead(200, { 'Content-Type': 'text/javascript' });

      response.write(afterLoginpageScript);
      response.end();
    }

    else if (request.url.startsWith('/Signup')) {
      // 회원가입 페이지

      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

      const signuppage = htmlHead + `<script src='./js/signup.js'></script>` + htmltail;
      // 회원가입 페이지의 구성

      response.write(signuppage);
      response.end()
    }

    if (request.url === '/js/signup.js') {
      // 회원가입 페이지의 자바스크립트
      response.writeHead(200, { 'Content-Type': 'text/javascript' })
      
      response.write(SignuppageScript);
      response.end();
    }
  }

  if (request.method === 'POST') {
    // request 요청이 POST인 경우.

    if (request.url.startsWith('/login')) {
      // url 이 /login 으로 시작된다면

      let LoginUserData = '';
      // LoginUserData 를 받기 위해 변수 선언

      request.on('data', (data) => {
        LoginUserData += data;
        // 위에 선언한 변수에 입력받은 값 할당
      })

      request.on('end', () => {
        // console.log(LoginUserData);
        const Loginuserid = LoginUserData.split('=')[1].split('&')[0];
        const Loginuserpass = LoginUserData.split('=')[2];
        // 입력받은 값을 id와 password 로 나누기

        // console.log(typeof (Loginuserid) + '랑 ' + typeof (Loginuserpass))

        connection.query(`select ID, Pass, name from login`, (err, result, field) => {
          // db에 연결하여 ID와 Pass, name 불러오기

          if (err) throw err;
          // 만약 에러가 있다면 에러를 던져줘
          
          // console.log(result)
          // console.log(loginid)

          for (let i = 0; i < result.length; i++) {
            loginid.push(result[i].ID);
            // for문으로 가져온 DB 길이만큰 반복문 돌리기.
            // DB에서 id값만 뽑아서 배열에 담아주기.
          }
          // console.log(loginid, loginpass);

          if (Loginuserid !== '' && Loginuserpass !== '') {
            // 로그인 시 값을 입력을 모두 했다면.

            if (loginid.includes(Loginuserid) === false) {
              // 입력받은 id가 DB ID에 없다면
              // console.log('존재하지 않는 ID 입니다. 다시 입력하세요.');

              const loginerr = htmlHead + `<script> window.alert('존재하지 않는 ID 입니다. 다시 입력하세요.');
              history.go(-1);
              </script>` + htmltail;
              // ID가 없다는 경고창을 띄워준 뒤, 이전 화면으로 이동.

              response.write(loginerr);
              response.end();
            }

            else if ((result.find(element => element.ID === Loginuserid).Pass) !== Loginuserpass) {
              // 만약 입력받은 비밀번호가 입력받은 ID의 비밀번호와 일치하지 않는다면.
              // result.find(element=>element.ID===Loginid) 를 하면 DB에서 조회한 데이터의 해당 아이디가 포함된 객체만 조회.
              // 그 뒤에 .Pass 까지 쓰면 해당 아이디의 비밀번호 조회.
              // 아래는 조회했던 관련한 콘솔들
              // console.log((result.find(element => element.ID === Loginuserid).Pass))
              // console.log(Loginuserpass)
              // console.log('비밀번호가 일치하지 않습니다. 다시 입력하세요.');

              const loginerr = htmlHead + `<script> window.alert('비밀번호가 일치하지 않습니다. 다시 입력하세요.');
              history.go(-1);
              </script>` + htmltail;
              // 비밀번호가 틀렸다는 경고창을 띄우고 이전 화면으로 이동.

              response.write(loginerr);
              response.end();
            }

            else {
              const Loginusername = result.find(element => element.ID === Loginuserid).name;
              // 로그인 한 아이디에 해당하는 이름을 찾아 변수에 담아줌.

              const afterLoginPage = htmlHead + `<h3> 어서오세요! ${Loginusername}님! </br> 반갑습니다!` + `<script src='./js/afterLoginpage.js'></script>` + htmltail;
              // 로그인 후 페이지 구성

              response.write(afterLoginPage);
              response.end();
            }
          }
          else {
            const loginerr = htmlHead + `<script> window.alert('입력되지 않은 값이 있습니다. 값을 입력해주세요.');
            history.go(-1);
            </script>` + htmltail;
            // 아이디나 비밀번호 중 입력하지 않은 값이 있는 경우의 화면 구성.
            // 경고창 띄우고 이전 페이지로 이동시킴.

            response.write(loginerr);
            response.end();
          }
        })
        // console.log(loginid, loginpass);
      })
    }
    else if (request.url === '/') {
      // url이 / 인 경우

      request.on('data', (data) => {
        NewUserData += data;
        // 신규가입 유저가 회원가입 시 입력한 데이터를 변수에 담아줌.
      })

      request.on('end', () => {
        let NewUserDatas = decodeURIComponent(NewUserData);
        // 입력받은 데이터에 한글 및 특수문자도 있어서 decodeURIComponent로 변환시켜줌

        const userid = NewUserDatas.split('=')[1].split('&')[0];
        const userpass = NewUserDatas.split('=')[2].split('&')[0];
        const username = NewUserDatas.split('=')[3].split('&')[0];
        const useremail = NewUserDatas.split('=')[4].split('&')[0];
        const userbirth = NewUserDatas.split('=')[5];
        // 각 입력값들별로 데이터를 변수들에 담아줌.

        if (userid !== '' && userpass !== '' && username !== '' && useremail !== '' && userbirth !== '') {
          // 모든 데이터들에 값이 입력된 경우면

          let SQL = `INSERT INTO login(ID,Pass,name,email,birth) VALUES ('${userid}','${userpass}','${username}','${useremail}','${userbirth}')`;
          // 입력받은 데이터들을 DB에 넣을 수 있게 쿼리문 작성.

          connection.query(SQL, (err, result, field) => {
            if (err) throw err;
            // 에러가 있다면 던져라.
          })
          // 쿼리문 DB에 전송

          const page = htmlHead + `<script>window.alert('회원가입에 성공하셨습니다! Welcome!');
          history.go(-2);</script>` + htmltail;
          // 회원가입 성공하였다고 알려주는 경고창을 띄우고 홈화면으로 돌아가기 위해 -2 만큼 이동.

          response.write(page);
          response.end();

        }
        
        else {
          // 만약 FORM 데이터가 입력되지 않은 값이 있는 경우,

          const errpage = htmlHead + `<script>
          window.alert('입력되지 않은 값이 있습니다. 모든 칸을 채워주세요.');
          history.go(-1);
          </script>` + htmltail;
          // 입력되지 않은 값이 있다는 경고창을 띄우고 이전 화면으로 이동.

          response.write(errpage);
          response.end()
        }
      })
    }
  }
}).listen(2080)