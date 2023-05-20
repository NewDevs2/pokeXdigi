export const makeTokenSign = (jwt, payload, secretKey, option) => {
  const token =[
    accessToken = jwt.sign(payload.acess, secretKey, option.access),
    refreshToken = jwt.sign(payload.refresh, secretKey, option.refresh)
  ]
  return token
}