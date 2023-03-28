import mysql from "mysql2";
// mysql 접속 정보
const dbconnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "eowjdehd2465@",
  database: "userHwin",
});

dbconnection.connect((err) => {
  if (err) {
    console.err("연결 안됩니다" + err.stack);
    return;
  }
});
dbconnection.query("SELECT*FROM usertable", (error, rows, fields) => {
  if (error) throw error;
  // 연결 확인
  // console.log(rows);
});
dbconnection.end();
export default dbconnection;
