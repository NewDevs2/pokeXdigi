
import tagMaker from "../../models/tag/tagMaker.js";

// ! body 태그와 같은 크기를 준다.
const wrap = tagMaker("div", document.body, {
  id: "wrap",
  // style:
  //   " width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;",
});
const colorPaper = tagMaker("div", wrap, {
  className : "colorPaper"
})
// 첫번째 div
const firstScreen = tagMaker("div", colorPaper, {
  id : "firstScreen",
  // innerText : "대머리"
});
const test = tagMaker("div", firstScreen, {
  className : "test", 
  innerText : "대머리"
})
// 두번째 div
const secondScreen = tagMaker("div", colorPaper, {
  id : "secondScreen"
});
// 세번째 div
const thirdScreen = tagMaker("div", colorPaper, {
  id : "thirdScreen"
});

// //! 테스트
// const colorPaper = tagMaker('div', wrap, {id : "colorPaper"});
// const container  = tagMaker('div', wrap, {id : "container"});

// //! 버튼 만들기
// const btnback = tagMaker("button", container, { innerText: "sing-in" });
// btnback.addEventListener("click", function () {
//   location.href = "/src/views/html/login.html";
// });
// const btnback2 = tagMaker("button", container, { innerText: "sing-up" });
// btnback2.addEventListener("click", function () {
//   location.href = "/src/views/html/createAccount.html";
// });