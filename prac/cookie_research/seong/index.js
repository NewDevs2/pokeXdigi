
import tagMaker from "../../models/tag/tagMaker.js";

// ! body 태그와 같은 크기를 준다.
const root = tagMaker("div", document.body, {
  id: "root",
  style:
    " width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;",
});

//! 버튼 만들기
const btnback = tagMaker("button", root, { innerText: "sing-in" });
btnback.addEventListener("click", function () {
  location.href = "/src/views/html/login.html";
});
const btnback2 = tagMaker("button", root, { innerText: "sing-up" });
btnback2.addEventListener("click", function () {
  location.href = "/src/views/html/createAccount.html";
});

if (document.cookie !== "") {
  const xhr = new XMLHttpRequest();
  const url = "http://localhost:8080/imakescookie"

  xhr.open("GET", url);
  xhr.send();

  xhr.addEventListener("load", () => {
    const data = JSON.parse(xhr.response)
    console.log(data)
    // if (data.split("=")[1] === "") {
    //   alert("로그인 없이는 접근 불가합니다. GET OUT")
    //   window.location.href("http://localhost:8080/")
    // } else {
    btnback.style.display = "none"
    btnback2.style.display = "none"
    tagMaker("h1", root, {
      innerText: `안녕하세요, ${data.split("=")[1]}님! 안녕히 가세요?!`
    })
    const form = tagMaker("form", root, {
      action: "/logout",
      method: "GET"
    })
    tagMaker("input", form, {
      type: "submit",
      value: "나 갈래"
    })

    // }
  })

}