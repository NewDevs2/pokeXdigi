import { secretKey }   from "./secretKey.js";
import { makeToken }   from "./makeToken.js";
import { verifyToken } from "./verifyTest.js";
import {v4}            from "uuid";
import { parsedCookie } from "../Cookie/cookieManager.js";

console.log(v4().length);
export function loginToken(id) {
  const sessionID = v4();
  const token = {
    accessToken : makeToken({uid : id}, secretKey, {expiresIn : "30m"}),
    refreshToken : makeToken({uid : id}, secretKey, {expiresIn : "1h"}),
    sessionID : sessionID
  }
  return token;
}

export function checkToken(token, secretKey) {
  try {
    const result = verifyToken(token, secretKey);
    return result;
  } catch (err) {
    switch (err.message) {
      case 'invalid signature' :
        // console.log('시크릿 키 오류')
        return 'secretKey'
        break;
      case 'jwt expired' :
        // console.log('만료된 토큰');
        return 'exp'
        break;
      case 'jwt must be provided' :
        // console.log('없는 토큰')
        return 'noToken'
      default :
        console.log('그 외 : ',err.message);
        break;
    }
  }
}