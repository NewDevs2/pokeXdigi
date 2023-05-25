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
      const xhr = new XMLHttpRequest();
      let random = Math.floor(Math.random() * 1010);
      const _URL = "https://pokeapi.co/api/v2/pokemon/" + random;
      xhr.open("GET", _URL);
      xhr.send();
      xhr.addEventListener("load", function () {
        const _PokeData = JSON.parse(xhr.response);
        // console.log(_PokeData);
        const _PokePhoto = _PokeData.sprites;
        // 요청을 먼저 한번 보내어 jwt값을 보낸다.
        // socket.emit("jwt",[cookieData.uid]);
        // // 다시 응답값을 받아 jwt.uid값을 받는다.
        // socket.on("jwtuid",function(data) {
        //   console.log('jwtdata',data);
        // });
        socket.emit("enterUser", [cookieData.uid, _PokePhoto.front_default]);
      });
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
        id: data[0][0],
        className: "character",
        style: `background-image: url(${data[0][1]})`,
      });
      console.log(userList)
      // 입장한 유저 nickname 을 아이디로 하는 div 영역생성
      const user = tagMaker("div", userList, {
        id: "onlineList" + data[0][0],
        style: "width:100%; height:5%;  display: flex;",
      });

      // 입장한 유저 nickname div에 nickname을 innerText로 하는 p태그 생성
      tagMaker("p", user, {
        style: "width:80%; height:100%; font-family: 'Inter';font-size:15px",
        innerText: data[0][0],
      });

      // 캐릭터변수에 접속 유저 아이디의 캐릭터를 담는다.
      character = document.getElementById(data[0][0]);

      // 반복문을 이용해서 온라인 유저만큼의 캐릭터 생성을 한다.
      for (let i = 0; i < data[1].length; i++) {
        // 온라인 유저의 아이디와 위치정보를 id와 style 적용을 해서 한다.
        tagMaker("div", field, {
          id: data[1][i].nickname,
          className: "character",
          style: `background-image: url(${data[1][i].img}); left:${data[1][i].position[0]}px; top:${data[1][i].position[1]}px;`,
        });

        // 온라인 유저 nickname 을 아이디로 하는 div 영역생성
        const onlineuser = tagMaker("div", userList, {
          id: "onlineList" + data[1][i].nickname,
          style: "width:100%; height:5%; display: flex;",
        });

        // 온라인 유저 nickname div에 nickname을 innerText로 하는 p태그 생성
        tagMaker("p", onlineuser, {
          style: "width:80%; height:100%; font-family: 'Inter';font-size:15px",
          innerText: data[1][i].nickname,
        });

        // 온라인 유저 아이디 옆 친구 추가 버튼
        tagMaker("button", onlineuser, {
          className: "addfriendbutton",
          style: "width:20%; height:100%; font-family: 'Inter';font-size:15px; background-color:blue"
        }).addEventListener('click', () => {
          // 해당 버튼에 클릭 이벤트로 클릭 시 소켓으로 추가하고자 하는 아이디 정보를 넘겨준다.
          socket.emit('addFriend', data[1][i].nickname)

          // 만약 이미 있는 아이디일 경우의 소캣이벤트
          socket.on('alreadyfriend', (data) => {

            // 이미 친구라는 창을 띄워준다.
            window.alert(`이미 ${data}와 친구입니다!`)
          })
        })
      }

    });
  });

  // 새로 접속한 유저의 캐릭터 생성 이벤트
  socket.on("newUserCharacter", (data) => {
    // 해당 유저의 닉네임을 id 로 하는 캐릭터 생성을 해준다.
    tagMaker("div", field, {
      id: data[0],
      className: "character",
      style: `background-image:url(${data[1]})`,
    });

    // 해당 유저 nickname 을 아이디로 하는 div 영역생성
    const newuser = tagMaker("div", userList, {
      id: "onlineList" + data[0],
      style: "width:100%; height:5%;  display: flex;",
    });

    // 해당 유저 nickname div에 nickname을 innerText로 하는 p태그 생성
    tagMaker("p", newuser, {
      style: "width:80%; height:100%; font-family: 'Inter';font-size:15px",
      innerText: data[0],
    });

    tagMaker("button", newuser, {
      className: "insertfriendbutton",
      style: "width:20%; height:100%; font-family: 'Inter';font-size:15px; background-color:blue"
    }).addEventListener('click', () => {
      // 해당 버튼에 클릭 이벤트로 클릭 시 소켓으로 추가하고자 하는 아이디 정보를 넘겨준다.
      socket.emit('addFriend', data[0])

      // 만약 이미 있는 아이디일 경우의 소캣이벤트
      socket.on('alreadyfriend', (data) => {

        // 이미 친구라는 창을 띄워준다.
        window.alert(`이미 ${data}와 친구입니다!`)
      })
    })
  });
  // ! 유저 버튼 활성화
  console.log(UsergBar.children[0].children[0]);
  // ! 친구목록 버튼 활성화
  console.log(UsergBar.children[0].children[1]);
  // 친구 목록 데이터 담은 배열
  const friendListJoin = [];

  // 유저 버튼 이벤트 만들기
  UsergBar.children[0].children[0].addEventListener('click', function () {
    userList.style.display = '';
    friendList.style.display = 'none';

  })
  // 친구 버튼 이벤트 만들기
  UsergBar.children[0].children[1].addEventListener('click', function () {

    userList.style.display = 'none';
    friendList.style.display = '';
    // socket.on('friendList', function (data) {
    //   // 요청 보낼 유저 테이블
    //   socket.emit('true');
    // })
    socket.emit('friendList', true);
    socket.on('selectJoin', function (data) {
      // ! 해당 유저의 친구 테이블 데이터를 가져온다.
      for (let i = 0; i < data.length; i++) {
          // 친구 목록에 데이터가 있는지 없는지 검사를 하고 난 뒤에 없다면 추가를 하는 방식으로 로직을 작성 하였다.
          if (friendListJoin.find(e => e === data[i].user_id) === undefined) {

          // console.log(data[i].user_id);
          friendListJoin.push(data[i].user_id);
          // console.log(friendListJoin);
          const friendListDiv = tagMaker("div", friendList, {
            style: "width:100%; height:5%; display: flex;",
          });
          const friendName = tagMaker("p", friendListDiv, {
            style: "width:100%; height:15%;"
          });
          // data객체를 값을 p태그에 넣어 준다.
          // 친구들 이름을 p 태그에 넣어주는 식으로 사용한다.
          friendName.innerText = friendListJoin[i];
        }
      }
    });

  })

  // ! 캐릭터 이동 이벤트
  let leftPosition = 0;
  let topPosition = 0;
  document.addEventListener("keydown", (event) => {
    const fieldWidth = window.innerWidth;
    const fieldHeight = window.innerHeight;
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
    // 필드 벗어나지 못하게 제약
    leftPosition = Math.max(
      0,
      Math.min(leftPosition, fieldWidth - character.offsetWidth)
    );
    topPosition = Math.max(
      0,
      Math.min(topPosition, fieldHeight - character.offsetWidth)
    );
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

    // 퇴장한 유저의 캐릭터를 변수에 담은 뒤 remove() 메서드로 요소를 삭제한다.
    const exitUser = document.getElementById(data);
    const exitOnlieUser = document.getElementById("onlineList" + data)
    exitUser.remove();
    exitOnlieUser.remove();
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
