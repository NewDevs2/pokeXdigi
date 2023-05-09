import tagMaker from "../../models/tag/tagMaker.js";

const wrap = tagMaker("div", document.body, {
  id: "wrap",
});

//! 테스트

const container = tagMaker("div", wrap, { id: "container" });
const menuBar = tagMaker("div", wrap, { id: "menuBar" });

//! 버튼 만들기
const togleBtn = tagMaker("button", menuBar, { className: "togleBtn" });
const btnImg = tagMaker("img", togleBtn, {
  src: "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
});
let togle = true;
togleBtn.addEventListener("click", function () {
  if (togle === true) {
    const chattingBar = tagMaker("div", container, { id: "chattingBar" });
    // ! 채팅바에서 영역을 3등분으로 나누어 주었다.
    tagMaker("div", chattingBar);
    tagMaker("div", chattingBar);
    // ! 채팅을 치는 공간과 채팅을 치면서 서버에게 데이터를 넘길수 있도록 해준다.
    const chattingForm = tagMaker("form", chattingBar ,{id: "chattingForm" ,action: "chatting",method:"POST"});
    tagMaker("input", chattingForm,{type:"area"});
    tagMaker("", chattingForm,{type:"area"});

    togle = false;

    console.log(togle);
  } else if (togle === false) {
    // chattingNone.style.display = "none";
    // ! 자식 태그 첫번째를 삭제를 한다.
    container.removeChild(container.firstElementChild);
    togle = true;
    console.log(togle);
  }
});
