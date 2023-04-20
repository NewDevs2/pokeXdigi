import mysql from "mysql2";
import dotenv from "dotenv";

// env 파일 경로 설정
dotenv.config({ path: "../../.env" });

export default mysql.createConnection({
  host: process.env.mysqlAdmin_seongHost,
  user: process.env.mysqlAdmin_seongUser,
  password: process.env.mysqlAdmin_seongPassword,
  database: process.env.mysqlAdmin_seongDatabase,
  port: process.env.mysqlAdmin_seongPort,
});