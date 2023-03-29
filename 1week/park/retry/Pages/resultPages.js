// ? 회원가입 양식을 작성하고 제출을 눌렀을 시 나올 페이지의 양식을 함수로 선언
// ? 매개변수에는 회원정보에서 가져올 값을 입력해주었음.
export function resultPage (name, id, password, email) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1>환영합니다, ${name}님!</h1>
    <h2>아이디 : ${id} </h2>
    <h2>비밀번호 : ${password} </h2>
    <h2>이메일 : ${email} </h2>
    <form method="POST" action="/login">
      <input type="submit" value="로그인">
    </form>
  </body>
  </html>
  `
}