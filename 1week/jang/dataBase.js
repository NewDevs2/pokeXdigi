const mysql = require("mysql2");
// mysql 접속 정보
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "eowjdehd2465@",
  database: "userHwin",
});

connection.connect();
connection.query("SELECT*FROM usertable", (error, rows, fields) => {
  if (error) throw error;
  // 연결 확인
  console.log("user info is", rows);
});
connection.end();
module.exports = connection;
