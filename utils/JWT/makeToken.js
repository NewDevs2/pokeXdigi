export const makeToken = (jwt, payload=[{},{}], secretKey, option=[{},{}]) => {
  // payload, option 이 없을 수도 있어서 매개변수 디폴트값 설정

  // 2개의 토큰을 배열로 만듦.
  // 0번째 인덱스 = accessToken / 1번째 인덱스는 refreshToken
  const token =[
    jwt.sign(payload[0], secretKey, option[0]),
    jwt.sign(payload[1], secretKey, option[1])
  ]
  return token
}

// const token =[
//   accessToken=jwt.sign(payload[0], secretKey, option[0]),
//   refreshToken=jwt.sign(payload[1], secretKey, option[1])
// ]
// 이렇게 작성하니까 reference error 발생