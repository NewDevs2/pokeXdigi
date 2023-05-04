// window.lo
// const fetchtest = fetch("/checkCookie")
//   .then((response) => {
//     // 서버 응답을 받았을 때 처리할 로직
//     //   const data = response.json();
//     //  console.log(data);
//     const xhr = new XMLHttpRequest();
//     const _URL = `${response.url}`;
//     // <http://localhost:8080/checkCookie>
//     xhr.open("GET", _URL);
//     xhr.send();
//     xhr.addEventListener("load", function () {
//       // console.log(JSON.parse(xhr.response));
//       const cookieJsonData = JSON.parse(xhr.response);
//       console.log(cookieJsonData);
//     });
//     console.log(response.url);
//   })
//   .catch((error) => {
//     // 서버 요청이 실패했을 때 처리할 로직
//     console.error(error);
//   });

// console.log(fetchtest);

// fetch('/checkCookie')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

// fetch("/checkCookie")
//   .then((response) => {
//     const xhr = new XMLHttpRequest();
//     const _URL = response.url;
//     xhr.open("GET", _URL);
//     xhr.send();
//     xhr.addEventListener("load", function () {
//       // 서버 응답을 받았을 때 처리할 로직
//       const cookieJsonData = JSON.parse(xhr.response);
//       console.log(cookieJsonData);
//     });
//   })
//   .catch((error) => {
//     // 서버 요청이 실패했을 때 처리할 로직
//     console.error(error);
//   });

fetch("/checkCookie")
  .then((response) => {
    const xhr = new XMLHttpRequest();
    const _URL = response.url;
    xhr.open("GET", _URL);
    xhr.send();
    xhr.addEventListener("load", function () {
      const test = JSON.parse(xhr.response);
      // const cookieData = xhr.response;
      const list = test.split("=");
      // ! 쿠키 데이터가 넘어 오는것을 확인하여 스필릿으로 잘라주어 사용하였다.
      console.log(list[1]); // "User=test"
      const container = document.getElementById("container");
      container.innerHTML = `<h1>환영한다.${list[1]}</h1>`;
      const btnOut = document.createElement("button");
      btnOut.innerHTML = "닫기";
      container.appendChild(btnOut);
      btnOut.addEventListener("click", () => {
        fetch('reset')
        .then(response => console.log(response));
        console.log('Success  ')
      });
    });
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
