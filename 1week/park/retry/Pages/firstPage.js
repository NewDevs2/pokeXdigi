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