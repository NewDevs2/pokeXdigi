// 필요한 라이브러리 가져오기
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

// 토큰 발급 예제
const payload = {
  userId: '윤호님짱',
  username: '윤호님짱짱'
};

const secretKey = '윤호호호님';

// 토큰 발급
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log('발급된 토큰:', token);

// 토큰 검증 예제
try {
  const decoded = jwt.verify(token, '윤호님문자열');
  console.log('토큰 검증 결과:', decoded);
} catch (err) {
  console.error('토큰 검증 실패:', err.message);
}
