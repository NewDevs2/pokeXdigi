import mysql from 'mysql2';

const conn = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'newdevstest',
  port: 3306,
}

const co = mysql.createConnection(conn); //! db 열기



export default co;

