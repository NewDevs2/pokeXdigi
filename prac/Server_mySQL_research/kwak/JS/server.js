import http  from 'http';
import fs    from 'fs';
import qs    from 'qs';
import mysql from 'mysql2';

// ===== DB 서버 생성
const DBconn = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  port     : 3306,
  database : 'test_youn'
})
DBconn.connect((err)=>{
  if (err) {
    throw err;
  } else {
    console.log('DB Server Run Success Server Port : 3306')
  }
})
// ===== App 서버 생성
const server = http.createServer((req,rep)=>{
  // ===== 변수 지정
  const textHTML   = {'Content-Type':'text/html'};
  const textJS     = {'Content-Type':'text/javascript'};
  const textCSS    = {'Content-Type':'text/css'};
  const mainPage   = fs.readFileSync('../index.html','utf-8');
  const mainPageJS = fs.readFileSync('./index.js','utf-8')
  const signUpPage = fs.readFileSync('../HTML/signUp.html','utf-8');
  const SSignUp    = fs.readFileSync('../HTML/successSignUp.html','utf-8');
  const SSignUpJS  = fs.readFileSync('./successSignUp.js','utf-8');
  const logIn      = fs.readFileSync('../HTML/logIn.html','utf-8');
  const logInJS    = fs.readFileSync('./logIn.js','utf-8');
  
  // ===== 서버 요청 응답 설정

  //  ===== 최초 접속 =====
  if (req.method === 'GET' && req.url === '/') {
    rep.writeHead(200, textHTML);
    rep.end(mainPage);
  }
  // ===== 메인 페이지 요청
  if (req.method === 'GET' && req.url.includes('index.html')) {
    rep.writeHead(200, textHTML);
    rep.end(mainPage);
  }
  // ===== 메인 페이지 JS 파일 요청
  if (req.method === 'GET' && req.url.includes('index.js')) {
    rep.writeHead(200, textJS);
    rep.end(mainPageJS);
  }
  //  ===== 회원가입 페이지 요청
  if (req.method === 'GET' && req.url.includes('signUp.html')) {
    rep.writeHead(200, textHTML);
    rep.end(signUpPage);
  }
  // ===== 회원가입 요청
  if (req.method === 'POST' && req.url.includes('signUpReq')) {
    let data = "";
    req.on('data',(chunk)=>{
      data += chunk
      // console.log(data);
    })
    req.on('end',()=>{
      // ----- 입력 값 가공 -----
      const parseData  = qs.parse(data);
      const SJSON      = JSON.stringify(parseData);
      const DataKey    = Object.keys(parseData);
      const DataValues = Object.values(parseData);
      fs.writeFile(`../IDTable/${parseData.ID}.json`,SJSON,(err)=>{
        if (err) throw err;});
      // -----------------------
      let command = `
      insert into m_info (${DataKey.join(",")})
      values (${DataValues.map(element=>{return `\'${element}\'`})})
      `
      DBconn.query(command,(err,result,fields)=>{
        if (err) {throw err;} else {console.log(result);}
      })
      rep.writeHead(200, textHTML);
      rep.end(SSignUp);
    })
  }
  // ===== 회원가입 완료 페이지 JS파일 요청
  if (req.method === 'GET' && req.url.includes('successSignUp.js')) {
    rep.writeHead(200, textJS);
    rep.end(SSignUpJS);
  }
  // ===== 로그인 페이지 요청
  if (req.method === 'GET' && req.url.includes('logIn.html')) {
    rep.writeHead(200, textHTML);
    rep.end(logIn)
  }
  // ===== 로그인 페이지 JS 요청
  if (req.method === 'GET' && req.url.includes('logIn.js')) {
    rep.writeHead(200, textJS);
    rep.end(logInJS);
  }
  // ===== 로그인 체크
  if (req.method === 'POST' && req.url.includes('CheckLogIn')) {
    let formBody  = "";
    let parseBody = "";
    req.on('data',chunk=>{
      formBody  += chunk;
    })
    req.on('end',()=>{
      parseBody = qs.parse(formBody);
      // console.log(parseBody);
      DBconn.query(`select * from m_info where ID='${parseBody.ID}'`,(err,result,fields)=>{
        if (result[0] && result.length<2) {
          console.log('아이디 있음! 비밀번호 검증 시작할거에요')
          if (parseBody.PW === result[0].PW) {
            console.log('비밀번호 일치!')
            rep.writeHead(200, textHTML);
            rep.end(mainPage);
          } else {
            console.log('비밀번호 틀림!')
            rep.writeHead(200, textHTML);
            rep.end(logIn);
          }
        } else {
          console.log('없는 아이디')
          // rep.writeHead(200, textJS);
          // rep.write("alert('비밀번호가 틀렸습니다')");
          rep.writeHead(200, textHTML);
          rep.end(logIn);
        }
      })
    })
  }
})

// ===== 서버 구동
server.listen(2080, (err)=>{
  if (err) {
    throw err;
  } else {
    console.log('App Server Run success Server Port : 2080')
  }
})