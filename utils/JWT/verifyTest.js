import jwt from 'jsonwebtoken';
export function verifyToken(token, secretKey){
  try {
    const decoded = jwt.verify(token, secretKey);
    // console.log('토큰 검증 결과:', decoded);
    return decoded;
  } catch (err) {
    // console.error('토큰 검증 실패:', err.message);
    throw err;
  }
}