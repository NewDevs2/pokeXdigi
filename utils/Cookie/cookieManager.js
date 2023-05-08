function sendCookie(callback) {
  const request = new XMLHttpRequest();
  request.open("GET", "/checkCookie");
  request.send();
  request.addEventListener("load", function () {
    callback(JSON.parse(request.response));
  });
}

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
}

export { createHeader, parsedCookie, sendCookie };
