export function verifyTest(jwt,token, secretKey){
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('토큰 검증 결과:', decoded);
  } catch (err) {
    console.error('토큰 검증 실패:', err.message);
  }
}