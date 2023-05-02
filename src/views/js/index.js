
import tagMaker from "../../models/tag/tagMaker.js";

// ! body 태그와 같은 크기를 준다.
const wrap = tagMaker("div", document.body, {id: "wrap"});
const colorPaper = tagMaker("div", wrap, {className:"colorPaper"})

const firstScreen  = tagMaker("div", wrap, {id:"firstScreen"});
const secondScreen = tagMaker("div", wrap, {id:"secondScreen"});
const thirdScreen  = tagMaker("div", wrap, {id:"thirdScreen"});


//! 테스트
// const colorPaper = tagMaker('div', wrap, {id : "colorPaper"});
// const container  = tagMaker('div', wrap, {id : "container"});

//! 버튼 만들기
const btnback = tagMaker("button", firstScreen, { innerText: "sing-in" });
btnback.addEventListener("click", function () {
  location.href = "/src/views/html/login.html";
});
const btnback2 = tagMaker("button", firstScreen, { innerText: "sing-up" });
btnback2.addEventListener("click", function () {
  location.href = "/src/views/html/createAccount.html";
});