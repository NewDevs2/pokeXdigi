import mysql from 'mysql2';

let userid=[];
let userpass;

const connection = mysql.createConnection({
  'host': '192.168.12.215',
  // 'user': 'granttest',
  // 'password': 'grant',
  // 'database': 'logininfo',
  'user': 'loginadmin',
  'password': 'login',
  'database': 'login',
  port: 3306
})

connection.connect(console.log('일해라 DB!'));

let SQL = `insert into login(ID, Pass, name, email, birth) values ('test','q1w2e3r4','테쓰야','test@gmail.com','1995-12-21')`;

connection.query(SQL, (err, result, field) => {
  if(err) console.log('');
  // console.log(result.length)
  // for(let i=0;i<result.length;i++){
  //   // console.log(result[i].ID)
  //   userid[i]=result[i].ID
  // }
  // if(userid.includes('id')===false){
  //   // console.log('아이디가 틀렸습니다.')
  // }
  // console.log(userid.includes('jack'))
  
});
// console.log(userid)

connection.end();