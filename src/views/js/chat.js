import { sendCookie } from "../../../utils/Cookie/cookieManager.js";

//! = 바뀌어야 할 내용 시작점
//? = 바뀌어야 할 내용 끝 점

window.onload = (() => {
  // 소켓 서버 접속
  const socket = io("localhost:8080", { path: "/chat/" });

  // 채팅 서버에 최초 접속 시 유저의 nickname을 쿠키에서 가져와 전송한다
  sendCookie((cookieData) => {
    if (cookieData.uid) {
      socket.emit("enterUser", cookieData.uid);
    } else {
      alert("로그인이 필요한 서비스 입니다.");
      location.href = "/src/views/html/login.html";
    }
  });
  // 새로운 접속자가 생겼을 때 안내 문구
  socket.on("enterUser", (data) => {
    const element = document.createElement("p");
    element.innerText = `[ ${data} ]님이 입장하셨습니다.`;
    chatBox.appendChild(element);
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  // 채팅 메세지를 수신했을 때 내용
  socket.on("chat", (data) => {
    // 닉네임 출력 과정
    const nickname = document.createElement("h2");
    nickname.className = "otherNickname otherText";
    nickname.innerText = data.nickname;
    chatBox.appendChild(nickname);

    // 채팅 본문 출력 과정
    const chat = document.createElement("p");
    chat.className = "otherText";
    chat.innerText = data.chat;
    chatBox.appendChild(chat);
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  // 채팅방 퇴장시 출력 문구
  socket.on("exitUser", (data) => {
    const element = document.createElement("p");
    element.className = "serverMessage";
    element.innerText = `[ ${data} ]님이 퇴장하셨습니다.`;
    chatBox.appendChild(element);
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  socket.on("error", (data) => {
    alert("너 팅겼어");
    location.href = "/src/views/html/index.html";
  });

  // 폼 이벤트
  const form = document.getElementById("chattingForm");
  const chatText = form.children[0];
  form.addEventListener("submit", (e) => {
    const element = document.createElement("p");
    element.className = "myText";
    element.innerText = chatText.value;
    chatBox.appendChild(element);
    e.preventDefault();
    socket.emit("chat", chatText.value);
    chatText.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
    // console.log("hi");
  });
})();
