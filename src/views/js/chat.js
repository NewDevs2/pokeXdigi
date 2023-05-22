import { sendCookie } from "../../../utils/Cookie/cookieManager.js";
import tagMaker from "../../models/tag/tagMaker.js";

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

  let character;

  socket.on("enterUser", (data) => {
    const element = document.createElement("p");
    element.innerText = `[ ${data} ]님이 입장하셨습니다.`;
    chatBox.appendChild(element);
    chatBox.scrollTop = chatBox.scrollHeight;

    // 입장한 유저와 온라인 유저들 캐릭터 생성
    socket.on("enterUserCharacter", (data) => {
      // console.log(data)

      // 입장한 유저의 nickname을 아이디로 하는 캐릭터를 생성한다.
      tagMaker("div", field, {
        id: data[0],
        className: "character",
      });

      // 캐릭터변수에 접속 유저 아이디의 캐릭터를 담는다.
      character = document.getElementById(data[0]);

      // 반복문을 이용해서 온라인 유저만큼의 캐릭터 생성을 한다.
      for (let i = 0; i < data[1].length; i++) {
        // 온라인 유저의 아이디와 위치정보를 id와 style 적용을 해서 한다.
        tagMaker("div", field, {
          id: data[1][i].nickname,
          className: "character",
          style: `left:${data[1][i].position[0]}px; top:${data[1][i].position[1]}px;`,
        });
      }
    });
  });

  // 새로 접속한 유저의 캐릭터 생성 이벤트
  socket.on("newUserCharacter", (data) => {
    // 해당 유저의 닉네임을 id 로 하는 캐릭터 생성을 해준다.
    tagMaker("div", field, {
      id: data,
      className: "character",
    });
  });

  // ! 캐릭터 이동 이벤트
  let leftPosition = 0;
  let topPosition = 0;
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        leftPosition -= 50;
        break;
      case "ArrowRight":
        leftPosition += 50;
        break;
      case "ArrowUp":
        topPosition -= 50;
        break;
      case "ArrowDown":
        topPosition += 50;
        break;
    }
    character.style.left = leftPosition + "px";
    character.style.top = topPosition + "px";

    // 움직인 정보를 이벤트로 전달한다.
    socket.emit("userPosition", [leftPosition, topPosition]);
  });

  // 다른 유저가 움직인 경우의 이벤트
  socket.on("moveUser", (data) => {
    // 움직인 유저의 nickname 으로 해당 캐릭터를 변수에 담아준다.
    const moveUser = document.getElementById(data.nickname);

    // 움직인 데이터를 style 적용한다.
    moveUser.style.left = data.position[0] + "px";
    moveUser.style.top = data.position[1] + "px";
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

    // 퇴장한 유저의 캐릭터를 변수에 담아 display를 none으로 변경하여 필드에서 사라지게 한다.
    const exitUser = document.getElementById(data);
    // exitUser.style.display = "none";
    exitUser.remove();
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
