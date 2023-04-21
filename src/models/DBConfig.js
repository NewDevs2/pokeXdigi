import mysql from "mysql2";
import dotenv from "dotenv";

// env 파일 경로 설정
dotenv.config({ path: "../../.env" });

export default mysql.createConnection({
  host: process.env.mysqlAdmin_sign_masterHost,
  user: process.env.mysqlAdmin_sign_masterUser,
  password: process.env.mysqlAdmin_sign_masterPassword,
  database: process.env.mysqlAdmin_sign_masterDatabase,
  port: process.env.mysqlAdmin_sign_masterPort,
});