import tagMaker from "../../models/tag/tagMaker.js";
// const colorPaper = tagMaker("div", wrap, { id: "colorPaper" });
const wrap = tagMaker("div", document.body, {
  id: "wrap",
});
const fieldContainer = tagMaker("div", wrap, {
  id: "fieldContainer",
});
const container = tagMaker("div", fieldContainer, {
  id: "container",
});
const field = tagMaker("canvas", fieldContainer, {
  id : "field",
  style : "width : 100%; height : 100%"
});
const context = field.getContext('2d');

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
let toggle  = true;
menuToggle.addEventListener("click", () => {
  // test = false;
  if (toggle === true) {
    menuBar.style.display = "none";
    toggle = false;
    // console.log("하이")
  } else {
    menuBar.style.display = "inline";
    toggle = true;
  }
});

// ? 필드 생성 구간
const fieldImg = new Image();
fieldImg.src = "../img/testField.png";
fieldImg.onload = function() {
  context.drawImage(fieldImg, 0, 0, field.width, field.height);
};
// ? 캐릭터 생성 구간
const character = new Image();
character.src = "../img/pikachu.png";
character.onload = function() {
  const characterSize = 30;
  // 캐릭터 중앙에 생성
  const characterX = (field.width - characterSize) / 2;
  const characterY = (field.width - characterSize) / 2;
  context.drawImage(character, characterX, characterY, characterSize, characterSize);
}
// const character = tagMaker("div", field, {
//   id: "fucka",
//   className: "character",
// });
// ! 캐릭터 이동 이벤트
// let leftPosition = 0;
// let topPosition = 0;
// document.addEventListener("keydown", (event) => {
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
//   character.style.left = leftPosition + "px";
//   character.style.top = topPosition + "px";
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
