let socket = new WebSocket("ws://javascript.info")

socket.onopen = function(e) {
  alert("open커넥션이 만들어 졌음");
  alert("데이터를 서버에 전송해보세요");
  // 메시지를 보낸다
  socket.send("내 이름은 코난 탐정이죠");
};
// 메시지가 오면 함수 실행 
socket.onmessage = function(event) {
  alert(`${event.data}`);
};

socket.onclose = function(event) {
  if(event.wasClean) {
    alert("close 커넥션이 정상 종료 됨");
  } else {
    // 프로세스가 죽거나 네트워크 장애가 있으면 envent.code가 1006이 됨
    alert("close 커넥션이 죽었음")
  }
};

socket.onerror = function(error) {
  alert('에러');
}