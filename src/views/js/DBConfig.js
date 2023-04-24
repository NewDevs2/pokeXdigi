import mysql from "mysql2";
import dotenv from "dotenv";

// env 파일 경로 설정
dotenv.config({ path: "../../.env" });

export default mysql.createConnection({
  host: process.env.sign_masterHost,
  user: process.env.sign_masterUser,
  password: process.env.sign_masterPassword,
  database: process.env.sign_masterDatabase,
  port: process.env.sign_masterPort,
});
