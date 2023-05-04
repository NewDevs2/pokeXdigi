
import tagMaker from "../../models/tag/tagMaker.js";

// ! body 태그와 같은 크기를 준다.
const wrap = tagMaker("div", document.body, {
  id: "wrap",
  style:
    " width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;",
});

//! 테스트
const colorPaper = tagMaker('div', wrap, {id : "colorPaper"});
const container  = tagMaker('div', wrap, {id : "container"});

//! 버튼 만들기
const btnback = tagMaker("button", container, { innerText: "sing-in" });
btnback.addEventListener("click", function () {
  location.href = "/src/views/html/login.html";
});
const btnback2 = tagMaker("button", container, { innerText: "sing-up" });
btnback2.addEventListener("click", function () {
  location.href = "/src/views/html/createAccount.html";
});
const btnback3 = tagMaker("button", container, { innerText: "chatting" });
btnback3.addEventListener("click", function () {
  location.href = "/issue/26/chatting.html";
});

(async ()=>{
  const cookieData = await cookie;
  if (cookieData !== 'none') {
    btnback.style.display = 'none';
    btnback2.style.display = 'none';
    const element = document.createElement('p');
    element.innerText = `[ ${cookieData.uid} ]님 환영합니다`
    container.insertBefore(element, btnback3);
  } else {
    btnback3.style.display = 'none';
  }
})();