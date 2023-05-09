import http from "http";
import fs from "fs";
import qs from "querystring";
import path from "path";
import { fileURLToPath } from "url";
import sign_master from "../../src/models/DBConfig.js";
import responseModule from "../../issue/21/responseModule.js";

sign_master.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("DB 연결");
});

sign_master.query(
  `INSERT INTO chatting_log(LOG_NUM, ID, CHATTING_LOG) values (2, KRAPLI, '{"name": "John", "age": 30, "city": "New York"}')`,
  (err) => {
    if (err) {
      throw err;
    }
  }
);

// JSON 유형
// {"name":"john", "age": 30, "city":"New York"}
