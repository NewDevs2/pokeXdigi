import mysql from 'mysql2';

const connection = mysql.createConnection({
  'host': '192.168.12.215',
  'user': 'loginadmin',
  'password': 'login',
  'database': 'login',
  port: 3306
})

connection.connect();

// let SQL = `insert into login(ID, Pass, name, email, birth) values ('','','','','')`;

connection.query(`show databases`, (err, result, field) => {
  if(err) console.log('오늘도 어김없이.. ㅎ');
  console.log(result);
});

connection.end();