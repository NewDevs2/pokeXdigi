import tagMaker from "../../models/tag/tagMaker.js";
import { sendCookie } from "../../../utils/Cookie/cookieManager.js";
// ! body 태그와 같은 크기를 준다.
// const wrap = tagMaker("div", document.body, {
//   id: "wrap",
//   style:
//     " width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;",
// });

// //! 테스트
// const colorPaper = tagMaker("div", wrap, { id: "colorPaper" });
// const container = tagMaker("div", wrap, { id: "container" });

// //! 버튼 만들기
// const btnback = tagMaker("button", container, { innerText: "sign-in" });
// btnback.addEventListener("click", function () {
//   location.href = "/src/views/html/login.html";
// });
// const btnback2 = tagMaker("button", container, { innerText: "sign-up" });
// btnback2.addEventListener("click", function () {
//   location.href = "/src/views/html/createAccount.html";
// });

sendCookie((data) => {
  console.log(data);
  if(data.login === "true"){
    const wrap = tagMaker("div", document.body, {
      id: "wrap",
      style:
        " width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;",
    });
    
    //! 테스트
    const colorPaper = tagMaker("div", wrap, { id: "colorPaper" });
    const container = tagMaker("div", wrap, { id: "container" });
    const btnback = tagMaker("button", container, { innerText: "PokeDigi 채팅 입장" });
    btnback.addEventListener("click", function () {
      location.href = "/chatting.html";
    });

    const btnLogOut = tagMaker("button", container, { innerText: "로그아웃" });
    btnLogOut.addEventListener("click", function () {
      location.href = "/logout";
    });
  }
  else{
    const wrap = tagMaker("div", document.body, {
      id: "wrap",
      style:
        " width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;",
    });
    
    //! 테스트
    const colorPaper = tagMaker("div", wrap, { id: "colorPaper" });
    const container = tagMaker("div", wrap, { id: "container" });
    
    //! 버튼 만들기
    const btnback = tagMaker("button", container, { innerText: "sign-in" });
    btnback.addEventListener("click", function () {
      location.href = "/src/views/html/login.html";
    });
    const btnback2 = tagMaker("button", container, { innerText: "sign-up" });
    btnback2.addEventListener("click", function () {
      location.href = "/src/views/html/createAccount.html";
    });
    
  }
});
