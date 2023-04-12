import mysql from "mysql2";
// mysql 접속 정보
const dbConnection = mysql.createConnection({
  host: "192.168.0.156",
  user: "admin_zzang",
  password: "eowjdehd2465@",
  database: "IA",
});
dbConnection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("정상 연결 됨");
  dbConnection.query("desc user_information", (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    if (rows) {
      console.log(rows);
    }
  });
});
