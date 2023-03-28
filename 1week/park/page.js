export let firstPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>환영합니다!</h1>
  <form method="POST" action="/create" accept-charset="utf-8">
    <input type="submit" value="회원가입">
  </form>
  <form method="POST" action="/login" accept-charset="utf-8">
    <input type="submit" value="로그인">
  </form>
</body>
</html>
`;



export let loginPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>로그인</h1>
  <form method="POST" action="/check" accept-charset="utf-8">
    <label for="id">아이디</label>
      <input type="text" name="id" id="id" required>
    <label for="password">비밀번호</label>
    <input type="password" name="password" id="password" required>
    <form method="POST" action="/login" accept-charset="utf-8">
      <input type="submit" value="로그인">
    </form>
    <form method="POST" action="/create" accept-charset="utf-8">
      <input type="submit" value="회원가입">
    </form>
  </form>
</body>
</html>
`;




// ? 첫번째 페이지 소개문구 작성
export let greeting = `<h1>회원가입</h1>`

// ? form 양식을 문자열로 작성함.
// ! form 제출 방법은 POST로 설정해주었음.
export let createAccountForm = `
<form method="POST" action="/accountSubmit" accept-charset="utf-8">
  <label for="name">이름</label>
    <input type="text" name="name" id="name" placeholder="이름" required>
  <label for="id">아이디</label>
    <input type="text" name="id" id="id" placeholder="4~18글자 이내의 영소문자"required>
  <label for="password">비밀번호</label>
    <input type="password" name="password" id="password" placeholder="8~20글자 이내" required>
  <label for="email">이메일</label>
    <input type="email" name="email" id="email" required>
    <input type="submit" value = "회원가입">
  </form>
  <form method="POST" action="/login">
    <input type="submit" value = "로그인">
  </form>
`

// ? 첫번째 페이지 양식을 문자열로 작성. 안에 ${} 로 위에 선언해준 변수를 넣어줌.
export let createAccountPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  ${greeting}
  ${createAccountForm}
</body>
</html>
`



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
  </body>
  </html>
  `
}