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
})