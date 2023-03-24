import mysql from 'mysql2';

const conn = mysql.createConnection({
  host: '192.168.0.107',
  user: 'root',
  password : 'VHzmffkr1208',
  database : 'user_info',
  port : 3306,
})

conn.connect()
conn.query('show databases', function(err, result, filed) {
  console.log(result);
})
conn.end();