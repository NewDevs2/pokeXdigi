function setCookie(cookie) {
  return `"Set-Cookie":[${cookie}]`;
}
function parsedCookie(cookieData) {
  let data = {};
  const parsedData = cookieData.split(";");
  const parsedKeyValue = parsedData.map((element) => {
    return element.trim();
  });
  parsedKeyValue.forEach((element) => {
    data[element.split("=")[0]] = element.split("=")[1];
  });
  // console.log(parsedData);
  console.log(data);
}
parsedCookie("박=준형; 권=예준; 성=해경");

// 쿠키 넘길 때 json으로 넘길거에요?
//? 서버에서 프론트로 넘길 때 JSON.stringify(쿠키) -> 프론트에서 사용할 때 JSON.parse(쿠키) 어떄요?
// 그리고 쿠키 데이터 객체에 담아서 사용할거임 아니면
// 문자열로 받아서 바로 사용할거임??
//
