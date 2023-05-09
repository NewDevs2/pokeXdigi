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
const character = tagMaker("div",container, {
  id : "fucka",
  className : "character",
});
let position = 0;
document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case 'ArrowLeft' :
      position -= 10;
      break;
    case 'ArrowRight' :
      position += 10;
      break;
  }
  character.style.left = position + 'px'
});
document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case 'ArrowUp' :
      position -= 10;
      break;
    case 'ArrowDown' :
      position += 10;
      break;
  }
  character.style.top = position + 'px'
});