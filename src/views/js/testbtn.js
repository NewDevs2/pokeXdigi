import tagMaker from "../../models/tag/tagMaker.js";

const uid = "test";
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
// ! 채팅 영역을 display none으로 바꾸어 주었다.
const chattingBar = tagMaker("div", container, { id: "chattingBar" });
chattingBar.style.display = "none";


// *  사용자 이름 밑 닫기 버튼 영역
const chattingHeader = tagMaker("div", chattingBar);
// ! 안 보이지만 영역을 3등분으로 나누어 주았다.
tagMaker("div", chattingHeader);
tagMaker("div", chattingHeader);
const closeBtn = tagMaker("button", chattingHeader,{className: "fa-solid fa-x"});

// ! 채팅방 내용 보여지는 공간
tagMaker("div", chattingBar, { id: "chatBox" });

// ! 채팅을 치는 공간과 채팅을 치면서 서버에게 데이터를 넘길수 있도록 해준다.
const chattingForm = tagMaker("form", chattingBar, {
  id: "chattingForm",
});
tagMaker("input", chattingForm, { type: "text" });
tagMaker("button", chattingForm, { type: "submit", innerText: "전송" });

let togle = true;
togleBtn.addEventListener("click", function () {
  if (togle === true) {
    chattingBar.style.display = "block";

    togle = false;

    console.log(togle);
  } else if (togle === false) {
    chattingBar.style.display = "none";
    // ! 자식 태그 첫번째를 삭제를 한다.
    // container.removeChild(container.firstElementChild);
    togle = true;
    console.log(togle);
  }
});

closeBtn.addEventListener("click", function () {
  togle = true;
  chattingBar.style.display = "none";
});

// togleBtn.addEventListener("click", function () {
//   if (togle === true) {
//     const chattingBar = tagMaker("div", container, { id: "chattingBar" });
//     // ! 채팅바에서 영역을 3등분으로 나누어 주었다.

//     // *  사용자 이름 밑 닫기 버튼 영역
//     const chattingHeader = tagMaker("div", chattingBar);
//     // ! 안 보이지만 영역을 3등분으로 나누어 주았다.
//     tagMaker("div", chattingHeader);
//     tagMaker("div", chattingHeader);
//    const closeBtn = tagMaker("button", chattingHeader,{className: "fa-solid fa-x"});

//     // ! 채팅 영역
//     tagMaker("div", chattingBar);

//     // ! 채팅을 치는 공간과 채팅을 치면서 서버에게 데이터를 넘길수 있도록 해준다.
//     const chattingForm = tagMaker("form", chattingBar, {
//       id: "chattingForm",
//       action: "",
//       method: "POST",
//     });
//     tagMaker("input", chattingForm, { type: "text" });
//     tagMaker("button", chattingForm, { type: "submit", innerText: "전송" });

//     // ! 토글값 바꾸기
//     togle = false;

//     console.log(togle);
//   } else if (togle === false) {
//     // chattingNone.style.display = "none";
//     // ! 자식 태그 첫번째를 삭제를 한다.
//     container.removeChild(container.firstElementChild);
//     togle = true;
//     console.log(togle);
//   }
// });

// * 아직 완성하지 못한 텍스트 영역에 텍스트가 생기면 버튼이 생기게
// const input = chattingForm.querySelector('input[type="text"]');
// input.addEventListener('keyup', () => {
//   if (input.value.trim() !== '') {
//     button.disabled = false;
//   } else {
//     button.disabled = true;
//   }
// });
