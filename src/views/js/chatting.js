import tagMaker from '../../models/tag/tagMaker.js';
// const colorPaper = tagMaker("div", wrap, { id: "colorPaper" });
const wrap = tagMaker("div", document.body, {
  id: "wrap",
});
const field = tagMaker("div", wrap, {
  id: "field",
});
const container = tagMaker("div", field, {
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
    menuBar.style.display = "inline";
    toggle = true;
  }
});

// let character

// socket.on("enterUserCharacter", (data) => {
//   character = tagMaker("div", field, {
//     id: data[0],
//     className: "character",
//   });

//   for (let i = 0; i < data[1].length; i++) {
//     tagMaker("div", field, {
//       id: data[1],
//       className: "character",
//       style:`left:${data[1].position[0]}px; top:${data[1].position[1]}px;`
//     })
//   }
// })

// // ! 캐릭터 이동 이벤트
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

//   socket.emit("userPosition",[leftPosition,topPosition])
// });

// socket.on("moveUser", (data)=>{
//   const moveUser = document.getElementById(data.id)

//   moveUser.style.left = data.position[0]
//   moveUser.style.top = data.position[1]
// })


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
