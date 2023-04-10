// ? form 양식을 문자열로 작성함.
// ! form 제출 방법은 POST로 설정해주었음.
export let createAccountForm = `
<form method="POST" action="/accountSubmit" accept-charset="utf-8">
  <label for="name">이름</label>
    <input type="text" name="name" id="name" placeholder="이름" required>
  <label for="id">아이디</label>
    <input type="text" name="id" id="id" placeholder="4~18글자 이내의 영소문자" maxlength = "18" required>
  <label for="password">비밀번호</label>
    <input type="password" name="password" id="password" placeholder="8~20글자 이내" maxlength = "20"required>
  <label for="email">이메일</label>
    <input type="email" name="email" id="email" required>
    <input type="submit" value = "회원가입">
  </form>
  <form method="POST" action="/login">
    <input type="submit" value = "로그인">
  </form>
`;

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
  <h1>회원가입</h1>
  ${createAccountForm}
</body>
</html>
`;
