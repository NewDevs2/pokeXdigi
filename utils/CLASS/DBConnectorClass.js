import mysql  from 'mysql2'
import dotenv from 'dotenv'
dotenv.config({ path : '../../.env' })

class Connector {
  constructor(user, password) {
    this.host     = process.env.mysqlAdmin_sign_masterHost
    this.port     = process.env.mysqlAdmin_sign_masterPort
    this.user     = user
    this.password = password
    this.database = process.env.mysqlAdmin_sign_masterDatabase
  }
}

//* test용
// class Connector {
  // constructor(user,password) {
    // this.host = 'localhost'
    // this.port = 3306
    // this.user = user
    // this.password = password
    // this.database = 'myservice'
  // }
// }

// console.log(new Connector('root','root'))

export default function (user, password) {
  return mysql.createConnection(new Connector(user, password));
}