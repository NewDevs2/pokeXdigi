const socket = io()

const createDoc=(tag,attri,parent)=>{
  const element = document.createElement(tag)
  Object.assign(element,attri)
  parent.appendChild(element)
  return element
}

let user

socket.on('connected',(data)=>{
  createDoc('div',{
    id:data,
    style : 'width: 300px; height: 300px; background-color: red; position: absolute;font-size:20px; text-align:center;'
  },document.body)
  user=document.getElementById(data)
  // })
});

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

  socket.emit('moving',[leftPosition,topPosition])


socket.on('movingAnotherUser',(data)=>{
  console.log(data)
  const anotherUser = document.getElementById(data[0])
  anotherUser.style.left=data[1][0]+"px"
  anotherUser.style.top=data[1][1]+"px"

  // console.log(data)
  // const anotherUser = document.createElement('div')
  // document.body.appendChild(anotherUser)
})

})