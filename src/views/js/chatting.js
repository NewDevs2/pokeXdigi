import tagMaker from "../../models/tag/tagMaker.js";
// const colorPaper = tagMaker("div", wrap, { id: "colorPaper" });
const wrap = tagMaker("div", document.body, {
  id: "wrap",
});
const field = tagMaker("div", wrap, {
  id: "field",
});
const chattingContainer = tagMaker("div", field, {
  id: "chatting_container",
});

const container = tagMaker("div", chattingContainer, {
  id: "container",
});

const menuArea = tagMaker("div", wrap, {
  id: "menuArea",
});
const menuToggle = tagMaker("div", menuArea, {
  id: "menuToggle",
});
const menuBar = tagMaker("div", menuArea, {
  id: "menuBar",
});
// console.dir(wrap.style);
// ! 메뉴 토글 클릭 이벤트
let toggle = true;
menuToggle.addEventListener("click", () => {
  // test = false;
  if (toggle === true) {
    menuBar.style.display = "none";
    toggle = false;
    // console.log("하이")
  } else {
    menuBar.style.display = "flex";
    toggle = true;
  }
});
// const character = tagMaker("div", field, {
//   id: "fucka",
//   className: "character",
// });
// ! 캐릭터 이동 이벤트
// let leftPosition = 0;
// let topPosition = 0;
// 필드 넓이 높이에 제한을 줘보자

// document.addEventListener("keydown", (event) => {
//   // 현재 높, 낮이가 100vw,100vh라서 window의 높,낮이로 지정해야 함
// const fieldWidth = window.innerWidth;
// const fieldHeight = window.innerHeight;

//   switch (event.key) {
//     case "ArrowLeft":
//       leftPosition -= 50;
//       break;
//     case "ArrowRight":
//       leftPosition += 50;
//       break;
//     case "ArrowUp":
//       topPosition -= 50;
//       break;
//     case "ArrowDown":
//       topPosition += 50;
//       break;
//   }
// 필드 벗어나지 못하게 제약
// leftPosition = Math.max(0, Math.min(leftPosition, fieldWidth - character.offsetWidth));
// topPosition = Math.max(0, Math.min(topPosition, fieldHeight - character.offsetWidth));

// character.style.left = leftPosition + "px";
// character.style.top = topPosition + "px";
// });
// document.addEventListener('keydown', function(event) {
//   switch (event.key) {
//     case 'ArrowUp' :
//       position -= 10;
//       break;
//     case 'ArrowDown' :
//       position += 10;
//       break;
//   }
//   character.style.top = position + 'px'
// });
