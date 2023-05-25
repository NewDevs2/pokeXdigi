import tagMaker from "../../models/tag/tagMaker.js";

const uid = "newDevs";
// const wrap = tagMaker("div", document.body, {
//   id: "wrap",
// });

// //! 테스트

// const container = tagMaker("div", wrap, { id: "container" });
// const menuBar = tagMaker("div", wrap, { id: "menuBar" });

//! 버튼 만들기
const togleBtn = tagMaker("button", menuBar, { className: "togleBtn" });
const btnImg = tagMaker("img", togleBtn, {
  src: "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
});
// ? 유저 친구목록 띄우기
const togleBtn2 = tagMaker("button", menuBar, { className: "togleBtn" });
const btnImg2 = tagMaker("img", togleBtn2, {
  src: "https://scontent.fcjj1-1.fna.fbcdn.net/v/t1.18169-9/12742819_483222141869183_8317636363879358223_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=mcH8z-IPCfYAX_jHMMd&_nc_ht=scontent.fcjj1-1.fna&oh=00_AfCcYoQp4xz0elP8la2iXLcaFEugIInQn42cakHMXT4lKA&oe=64942052",
});
// ! 채팅 영역을 display none으로 바꾸어 주었다.
const chattingBar = tagMaker("div", container, { id: "chattingBar" });
chattingBar.style.display = "none";

// ! 유저목록 영역을 display none으로 바꾸어 주었다.
const UsergBar = tagMaker("div", container, { id: "UsergBar" });
UsergBar.style.display = "none";
const Header = tagMaker("div",UsergBar);
// ! 2등분으로 나누어 주았다.
const userIng = tagMaker("button", Header,{innerText:"유저목록" , className:"btnUser"});
const friendList = tagMaker("button", Header , {innerText:"친구목록", className:"btnUser"});

// ! 유저 현황 보여지는 공간
const userList = tagMaker("div", UsergBar,{id:"userList"});
// ! 친구 현황 보여지는 공간
const friends = tagMaker("div", UsergBar,{id:"friendList"});


// *  사용자 이름 밑 닫기 버튼 영역
const chattingHeader = tagMaker("div", chattingBar);
// ! 안 보이지만 영역을 3등분으로 나누어 주았다.
tagMaker("div", chattingHeader);
tagMaker("h2", chattingHeader , {innerText:`${uid}`});
const closeBtn = tagMaker("button", chattingHeader,{className: "fa-x fa-2x"});
{/* <i class="fa-solid fa-xmark"></i> */}
// ! 채팅방 내용 보여지는 공간
tagMaker("div", chattingBar,{id:"chatBox"});


// ! 채팅을 치는 공간과 채팅을 치면서 서버에게 데이터를 넘길수 있도록 해준다.
const chattingForm = tagMaker("form", chattingBar ,{id: "chattingForm" ,action: "",method:"POST"});
tagMaker("input", chattingForm,{type:"text"});
tagMaker("button", chattingForm,{type:"submit", innerText: "전송",});

const friendchattingForm = tagMaker("form", friendList ,{id: "friendchattingForm" ,action: "",method:"POST"});
tagMaker("input", friendchattingForm,{type:"text"});
tagMaker("button", friendchattingForm,{type:"submit", innerText: "전송",});


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

// ! 유저 목록 띄우기
togleBtn2.addEventListener("click", function () {

  if (togle === true) {
    UsergBar.style.display = "block";
    
    
    togle = false;
    
    console.log(togle);
  } else if (togle === false) {
    UsergBar.style.display = "none";
    // ! 자식 태그 첫번째를 삭제를 한다.
    // container.removeChild(container.firstElementChild);
    togle = true;
    console.log(togle);
  }
  friends.style.display=" none";
  friendchattingForm.style.display="none";
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
