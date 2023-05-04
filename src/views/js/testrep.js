// window.lo
const fetchtest = fetch("/checkCookie")
  .then((response) => {
    // 서버 응답을 받았을 때 처리할 로직
    //   const data = response.json();
    //  console.log(data);

    console.log(response);
  })
  .catch((error) => {
    // 서버 요청이 실패했을 때 처리할 로직
    console.error(error);
  });
const xhr = new XMLHttpRequest();
const _URL = "<http://localhost:8080/checkCookie>";

xhr.open("GET", _URL);
xhr.send();
xhr.addEventListener("load", function () {
  // console.log(JSON.parse(xhr.response));
  const cookieJsonData = JSON.parse(xhr.response);
  console.log(cookieJsonData);
});
console.log(fetchtest);

// fetch('/checkCookie')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));
