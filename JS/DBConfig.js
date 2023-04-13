import mysql from 'mysql2'
import dotenv from 'dotenv'

// env 파일 경로 설정
dotenv.config({path:'../.env'});

export default mysql.createConnection({
  host     : process.env.mysqlRootHost,
  user     : process.env.mysqlRootUser,
  password : process.env.mysqlRootPassword,
  database : process.env.mysqlRootDatabase,
  port     : process.env.mysqlRootPort
})
