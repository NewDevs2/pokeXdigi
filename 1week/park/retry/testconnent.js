import mysql2 from mysql2



  const conn = mysql2.createConnection({
    host       : '192.168.0.156',
    user       : 'admin_park',
    password   : 'VHzmffkr1208',
    database   : 'IA',
    port       :  3306,
  });

conn.connect();