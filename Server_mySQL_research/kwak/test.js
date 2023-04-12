// import mysql from 'mysql2';

// const conn = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   port     : 3306,
//   database : 'test_youn'
// })

// let UserID = 'abcde'
// conn.connect()
// // conn.query("select * from m_info where ID = 'admin'",(err,result,fields)=>{
// //   console.log(result[0].ID)
// // })

// conn.query(`select * from m_info where ID='${UserID}'`,(err,result,fields)=>{
//   if (err) throw err;
//   if (result.length<2 && result[0]) {
//     console.log(result)
//   } else {
//     console.log('결과 없음')
//   }
// })


// conn.end()



// for (let p in Object) {
//   let key = p
//   let value = Object[p]
// }


// DB에 자동 저장
// const A = {
//   'ID':'admin',
//   'PW':'admin',
//   'talk':'qwklenklqwnek23'
// };
// // console.log(Object.keys(A).join(","));
// // console.log(Object.values(A).map(element=>{return `\'${element}\'`}).join(","));
// console.log(Object.keys(A).join(","))
// const mapRkwl = Object.values(A).map(function (a) {return "'"+a+"'";})
// console.log(mapRkwl.join(","));

// console.log(A['ID'])

// const A = {
  // 'ID' : 'admin',
  // PW : 'admin'
// }

// console.log(typeof(A.PW))