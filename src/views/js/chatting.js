import tagMaker from "../../models/tag/tagMaker.js"
// const colorPaper = tagMaker("div", wrap, { id: "colorPaper" });
const wrap = tagMaker("div",document.body, {
  id : "wrap"
});
const container = tagMaker("div", wrap, {
  id : "container"
});
const menuBar = tagMaker("div", wrap, {
  id : "menuBar"
});
const menuToggle = tagMaker("div", menuBar, {
  id : "menuToggle"
})
menuToggle.addEventListener("click", ()=> {

})
const character = tagMaker("div",container, {
  id : "fucka",
  className : "character",
});
// ! 캐릭터 이동 이벤트
let leftPosition = 0;
let topPosition = 0;
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft' :
      leftPosition -= 10;
      break;
    case 'ArrowRight' :
      leftPosition += 10;
      break;
      case 'ArrowUp' :
      topPosition -= 10;
      break;
    case 'ArrowDown' :
      topPosition += 10;
      break;
  }
  character.style.left = leftPosition + 'px'
  character.style.top = topPosition + 'px'
});
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