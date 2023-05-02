import tagMaker from "../../models/tag/tagMaker.js";

// ! body 태그와 같은 크기를 준다.
const wrap = tagMaker("div", document.body, {
  id: "wrap",
});
const wrap1 = tagMaker("div", wrap, {
  id: "wrap1",
});
tagMaker("div", wrap1, {
  id: "test",
});
tagMaker("div", wrap, {
  id: "wrap2",
});
tagMaker("div", wrap, {
  id: "wrap3",
});
//! 테스트
// const colorPaper = tagMaker('div', wrap, {id : "colorPaper"});
// const container  = tagMaker('div', wrap, {id : "container"});

//! 버튼 만들기
const btnback = tagMaker("button", wrap1, {id: 'btn', innerText: "sing-in" });
btnback.addEventListener("click", function () {
  location.href = "/src/views/html/login.html";
});
const btnback2 = tagMaker("button", wrap1, { innerText: "sing-up" });
btnback2.addEventListener("click", function () {
  location.href = "/src/views/html/createAccount.html";
});
