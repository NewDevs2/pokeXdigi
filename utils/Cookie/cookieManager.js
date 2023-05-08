// function setCookie(cookie) {
//   return `"Set-Cookie":[${cookie}]`;
// }

function createHeader(type, cookie) {
  let header = {};
  header["Content-Type"] = type;
  if (cookie) {
    header["Set-Cookie"] = cookie;
  }
  return header;
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
  return data;
  // console.log(parsedData);
  // console.log(data);
}

function sendCookie(callback) {
  const request = new XMLHttpRequest();
  request.open("GET", "/checkCookie");
  request.send();
  request.addEventListener("load", function () {
    // console.log(JSON.parse(request.response));
    // console.log(request.response);
    callback(JSON.parse(request.response));
  });
}

export { createHeader, parsedCookie, sendCookie };
