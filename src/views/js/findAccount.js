import tagMaker from "../../models/tag/tagMaker.js";

// ! body 태그와 같은 크기를 준다.
const wrap = tagMaker("div", document.body, {
  id: "wrap",

});
// ! 중앙에 하나 큰 div전을 만들어주었다.
tagMaker("div", wrap, {
  id: "colorPaper",
});

const container = tagMaker("div", wrap, {
  id: "container"
});






// 중앙에 있는 div에서 세로로 3개로 나누어 주었다.

const maindiv = tagMaker("div", container, {
  id: "maindiv",
});

tagMaker("p", maindiv, { innerText:'poke x digi'
});
tagMaker("p", maindiv, { innerText: "계정 정보 찾기" });
tagMaker("p", maindiv, { innerText: "개인 정보를 입력해 주세요" });
// ! 인풋 테그로 텍스트 담는 태그 만들기
tagMaker("input", maindiv, {
  type: "text",
  name: "name",
  placeholder: "너의 이름은..",
});
tagMaker("input", maindiv, {
  type: "text",
  name: "jumin",
  placeholder: "주민등록번호",
});
tagMaker("input", maindiv, { type: "text", name: "email", placeholder: "이메일" });

//! 버튼 만들기
const btnback = tagMaker("button", maindiv, { innerText: "돌아가기" });
btnback.addEventListener("click", function () {
  // 전 페이지 이동
  history.back();
});
const btnback2 = tagMaker("button", maindiv, {
  innerText: "괜찮아여? 많이 놀랬죠?",
});
btnback2.addEventListener("click", function () {
  location.href = "";
});

// const aBack = tagMaker('a',btnback,{href:'/src/views/html/login.html',style:'width:100%; height:100%;',innerText:'돌아가기'});
