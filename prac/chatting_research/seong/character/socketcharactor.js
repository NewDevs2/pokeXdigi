const socket = io()

const createDoc=(tag,attri,parent)=>{
  const element = document.createElement(tag)
  Object.assign(element,attri)
  parent.appendChild(element)
  return element
}

let user

// 내가 접속했을 때, 내 소켓아이디를 아이디로 가지는 div 생성.
// 나랑 타인을 구분하려고 나는 div 색상을 빨강으로 함
socket.on('connected',(data)=>{
  createDoc('div',{
    id:data,
    style : 'width: 300px; height: 300px; background-color: red; position: absolute;font-size:20px; text-align:center;'
  },document.body)
  user=document.getElementById(data)
  // })
});


// 나 외의 타인이 접속했을 때, 해당 유저의 아이디를 아이디로 가지는 div 생성
// 구분을 위해 타인은 아쿠아색상으로 만듦
socket.on('anotherUserConnected',(data)=>{
  createDoc('div',{
    id:data,
    style : 'width: 300px; height: 300px; background-color: aqua; position: absolute; font-size:20px; text-align:center;',
    innerText:data
  },document.body,
  )
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
  user.style.left = leftPosition + "px";
  user.style.top = topPosition + "px";

  // 내가 움직이면 그 움직인 정보를 socket 이벤트로 전달
  socket.emit('moving',[leftPosition,topPosition])

// 나 외의 타인이 움직인 경우
socket.on('movingAnotherUser',(data)=>{
  console.log(data)

  // 해당 유저의 소켓아이디의 div 을 변수에 담는다.
  const anotherUser = document.getElementById(data[0])

  // 그 변수의 스타일에 이동정보 입력
  anotherUser.style.left=data[1][0]+"px"
  anotherUser.style.top=data[1][1]+"px"

  // console.log(data)
  // const anotherUser = document.createElement('div')
  // document.body.appendChild(anotherUser)
})

})