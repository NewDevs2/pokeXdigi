import { sendCookie } from "../../../utils/Cookie/cookieManager.js"

//! = 바뀌어야 할 내용 시작점
//? = 바뀌어야 할 내용 끝 점

// 소켓 서버 접속
const socket = io("192.168.100.70:8080", {path : "/chat/"});

// 채팅 서버에 최초 접속 시 유저의 nickname을 쿠키에서 가져와 전송한다
sendCookie(cookieData=>{
  socket.emit("enterUser", cookieData.uid)
})

// 새로운 접속자가 생겼을 때 안내 문구
socket.on("enterUser", data => {
  const element = document.createElement('p');
  element.innerText = `[ ${data} ]님이 입장하셨습니다.`
  //!-------------------------------------------
  chatBox.appendChild(element);
  chatBox.scrollTop = chatBox.scrollHeight;
  //?-------------------------------------------
})

// 채팅 메세지를 수신했을 때 내용
socket.on("chat", data => {
  // 닉네임 출력 과정
  const nickname = document.createElement('h2');
  nickname.className = "otherNickname otherText"
  nickname.innerText = data.nickname;
  //!-----------------------------------
  chatBox.appendChild(nickname)
  //?-----------------------------------
  
  // 채팅 본문 출력 과정
  const chat = document.createElement('p');
  chat.className = "otherText"
  chat.innerText = data.chat;
  //!-----------------------------------------
  chatBox.appendChild(chat)
  chatBox.scrollTop = chatBox.scrollHeight;
  //?-----------------------------------------
})

// 채팅방 퇴장시 출력 문구
socket.on("exitUser", data => {
  const element = document.createElement('p');
  element.className = "serverMessage"
  element.innerText = `[ ${data} ]님이 퇴장하셨습니다.`
  //!------------------------------------------------
  chatBox.appendChild(element);
  chatBox.scrollTop = chatBox.scrollHeight;
  //?------------------------------------------------
})

// HTML 구성품
//!------------------------------------------------
// const chatBox = document.createElement('div');
// Object.assign(chatBox, {
//   id : "chatBox",
// })
// document.body.appendChild(chatBox);

// const form = document.createElement('form');
// document.body.appendChild(form);

// const chatText = document.createElement('input');
// Object.assign(chatText, {
//   type : "text",
// })
// form.appendChild(chatText);

// const send = document.createElement('input');
// Object.assign(send, {
//   type : "submit",
//   value : "전송"
// })
// form.appendChild(send);
//?------------------------------------------------

// --------구 분 선---------

// 폼 입력
//!------------------------------------------------
form.addEventListener('submit', (e)=>{
  //?------------------------------------------------
  const element = document.createElement('p');
  element.className = "myText"
  element.innerText = chatText.value;
  //!------------------------------------------------
  chatBox.appendChild(element);
  //?------------------------------------------------
  e.preventDefault();
  socket.emit("chat", chatText.value);
  //!------------------------------------------------
  chatText.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
  //?------------------------------------------------
})