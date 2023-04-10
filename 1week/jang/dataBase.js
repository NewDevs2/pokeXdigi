import mysql from "mysql2";
// mysql 접속 정보
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "eowjdehd2465@",
  database: "userhwin",
});
export default dbConnection;
