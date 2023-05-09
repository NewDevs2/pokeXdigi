import tagMaker from "../../models/tag/tagMaker.js";




const wrap = tagMaker("div", document.body, {
  id: "wrap",
});

//! 테스트

const container = tagMaker("div", wrap, { id: "container" });
const menuBar = tagMaker("div", wrap, { id: "menuBar" });


//! 버튼 만들기
const btnback = tagMaker("button", menuBar, { className: "chat" });
const btnImg = tagMaker("img", btnback, {src:"https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800"});
let togle = true;
btnback.addEventListener("click", function () {

  if (togle === true) {

  tagMaker("div", container, { id: "chattingBar" });
    togle = false;

    console.log(togle);
  }
  else if(togle === false){
  
    // chattingNone.style.display = "none";
    // ! 자식 태그 첫번째를 삭제를 한다.
    container.removeChild(container.firstElementChild);
    togle = true;
    console.log(togle);
  }
    

})

