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
  <form method="POST" action="/logincheck" accept-charset="utf-8">
    <label for="id">아이디</label>
      <input type="text" name="id" id="id" required>
    <label for="password">비밀번호</label>
    <input type="password" name="password" id="password" required>
      <input type="submit" value="로그인">
    </form>
    <form method="POST" action="/create" accept-charset="utf-8">
      <input type="submit" value="회원가입">
    </form>
  </form>
</body>
</html>
`;
