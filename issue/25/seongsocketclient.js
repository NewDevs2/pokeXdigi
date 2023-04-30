import tagMaker from '../../src/models/tag/tagMaker.js'

// 소켓연결
const socket = io.connect('http://172.30.1.64:8080', {
  path: '/socket.io'
  // transports:['websocket']
  // 처음부터 ws 로 통신할거면 쓰고 안쓰면 폴링연결 먼저 시도
})

// form 생성
const form = tagMaker('form', document.body, {
  style: 'width: 300px; height:400px;display: flex; flex-direction:column; justify-content: center; border:0.2px solid gray'
});

// 채팅이 들어갈 div
const textbox = tagMaker('div', form, {
  style: 'width:100%; height:97%; display:flex; flex-direction: column;  align-items:flex-end; justify-content:flex-end; overflow:auto;'
})

// 입력+전송부분을 묶은 div
const inputDiv = tagMaker('div', form, {
  style: 'width:100%; height:7%'
})

// 채팅 작성할 input
const inputtext = tagMaker('input', inputDiv, {
  type: 'text',
  name: 'text',
  style: 'width:85%; height:100%;'
})

// 전송버튼
tagMaker('input', inputDiv, {
  type: 'submit',
  value: 'send',
  style: 'width:15%; height:100%;'
})

// 유저가 입력한 본인 이름을 담을 userid 변수
let userid = ""

// 소켓으로 해당 id 불러오기.
socket.on('userid', (data) => {
  // userid 에 data 변수 담기
  userid = data

  // 입장했을 때, 바로 환영문구 출력
  // 콘솔찍어보기
  tagMaker('div', textbox, {
    innerText: `어서오세요, ${userid}님! 반갑습니다!`,
    style: "width:100%; text-align:center; font-size:14px"
  })
})

// 클라이언트가 나갔을 때 이벤트 서버에서 가져옴
socket.on('disconnected', () => {

  // 나가면 나갔다고 채팅창에 알려주기
  tagMaker('div', textbox, {
    innerText: `잘가요, ${userid}님! 또 오지마요!`,
    style: "width:100%; text-align:center; font-size:14px"
  })
})

// form 에 전송하면 이벤트 발생
form.addEventListener('submit', (event) => {
  // form 의 action 을 중단
  event.preventDefault()

  // socket.emit 으로 데이터를 서버에 전송함.
  // 나는 입력값을 전달하는 것임.
  socket.emit('chat', form.text.value)

  // form.text의 value 가 있다면
  if (form.text.value !== "") {
    // userid 를 이용해서 말하는 사람 id 나오게하기.
    const name = tagMaker('div', textbox, {
      innerText: userid,
      style: "width:50%; height:auto; text-align:right; color:lightblue; font-size:13px;"
    })

    // 대화 쓴 거 출력
    tagMaker('div', name, {
      style: "width:100%; font-size:14px; color:blue",
      innerText: form.text.value
    });
    // console.log(socket)

    // 전송버튼 누른 뒤에 입력창 비워주기.
    inputtext.value = ""

  } else {
    // 만약 텍스트가 없다면 alert 띄우기
    window.alert('뭐든 입력하세요.')
  }
})

// chat 에 대해 데이터 불러오기
socket.on('chat', data => {

  // 상대방 대화는 오른쪽 위치하도록 배치
  const name = tagMaker('div', textbox, {
    innerText: userid,
    style: "width:100%; height:auto; text-align:left; color:lightpink; font-size:13px;"
  })

  // 대화 쓴 거 출력
  tagMaker('div', name, {
    style: "width:100%; font-size:14px; color:pink",
    // 여기서 innerText가 위에서 서버로 보냈던 form.text.value 가 됨.
    innerText: data
  });
})