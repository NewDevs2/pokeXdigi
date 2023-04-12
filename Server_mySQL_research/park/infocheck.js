export let idfalse = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<script>
  alert("아이디는 4글자 이상 18글자 미만의 소문자로 작성해주세요.");
  history.go(-1);
</script>
</body>
</html>
`;

export let pwfalse = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<script>
  alert("비밀번호는 4글자 이상 20글자 미만의 대소문자 및 특수기호를 포함하여 작성해주세요.");
  history.go(-1);
</script>
</body>
</html>
`;

//

export let idCheckfalse = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<script>
  alert("존재하지 않는 아이디입니다.");
  history.go(-1);
</script>
</body>
</html>
`;

export let pwCheckFalse = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<script>
  alert("비밀번호가 틀립니다.");
  history.go(-1);
</script>
</body>
</html>
`;
