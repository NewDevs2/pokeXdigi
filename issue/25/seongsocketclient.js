import tagMaker from '../../src/models/tag/tagMaker.js'

const socket = io.connect('http://172.30.1.64:8080', {
  path: '/socket.io'
  // transports:['websocket']
  // 처음부터 ws 로 통신할거면 쓰고 안쓰면 폴링연결 먼저 시도
})

const form = tagMaker('form', document.body, {
  style: 'width: 300px; height:400px;display: flex; flex-direction:column; justify-content: center; border:0.2px solid gray'
});
const textbox = tagMaker('div', form, {
  style: 'width:100%; height:93%; display:flex; flex-direction: column;  align-items:flex-end; justify-content:flex-end; overflow:auto;'
})
const inputDiv = tagMaker('div', form, {
  style: 'width:100%; height:7%'
})
const inputtext = tagMaker('input', inputDiv, {
  type: 'text',
  name: 'text',
  style: 'width:85%; height:100%;'
})

tagMaker('input', inputDiv, {
  type: 'submit',
  value: 'send',
  style: 'width:15%; height:100%;'
})

let userid = ""

socket.on('userid', (data) => {
  userid = data
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (form.text.value !== "") {
    const name = tagMaker('div', textbox, {
      innerText: userid,
      style: "width:50%; text-align:right; color:lightblue; font-size:13px"
    })
    tagMaker('div', name, {
      style: "width:100%; font-size:14px; color:blue",
      innerText: form.text.value
    });
    inputtext.value = ''
  } else {
    window.alert('뭐든 입력하세요.')
  }
})
