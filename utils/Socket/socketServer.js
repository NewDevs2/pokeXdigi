import { Server } from "socket.io";
import sign_master from "../../src/models/DBConfig.js";
export default function socketServer(server) {
  sign_master.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("채팅 연결됨");
  });

  const io = new Server(server, { path: "/chat/" });

  // 온라인 상태의 유저를 담을 배열
  let onlineUser = []

  // 서버 연결
  io.on("connection", (socket) => {
    // 유저가 입장되어 입장된 유저 id 를 클라이언트로 부터 전달받았을 때
    socket.on("enterUser", (data) => {
      // 해당 id 를 socket.nickname 에 담아준다.
      socket.nickname = data;
      console.log(socket.nickname);

      // 전체 유저에게 해당 유저 입장을 알려준다.
      io.emit("enterUser", socket.nickname);

      // 접속한 유저의 캐릭터 생성용 이벤트
      // 접속한 유저 및 온라인 상태의 유저들 정보를 같이 알려준다.
      socket.emit("enterUserCharacter",[socket.nickname, onlineUser])

      // 새로 입장한 유저 정보를 온라인 상태의 유저들에게 알려준다.
      socket.broadcast.emit("newUserCharacter", socket.nickname)
      
      // 새로 들어온 유저정보를 온라인 유저배열에 추가한다.
      onlineUser.push({nickname:socket.nickname,position:[0,0]})
    });

    // 유저 위치정보에 대한 이벤트
    socket.on("userPosition",(data)=>{
      // find 메서드를 이용해서 움직인 유저 정보를 online 유저에서 찾는다.
      let moveUser = onlineUser.find(user=>user.nickname===socket.nickname)

      // 해당 유저의 위치정보 변경
      moveUser.position = data

      // 다른 유저들에게도 해당 정보를 전달(유저닉네임과 위치정보)
      socket.broadcast.emit("moveUser",moveUser)
    })

    // 클라이언트 측으로 부터 채팅을 전달받는다.
    socket.on("chat", (data) => {
      if (socket.nickname !== undefined) {
        console.log(socket.nickname);
        sign_master.query(
          "insert into chatting_log(ID, CHATTING_LOG) values(?,?)",
          [socket.nickname, `${data}`]
        );
        // 본인을 제외한 나머지 사람들에게 채팅과 채팅한 사람의 닉네임을 전달한다.
        socket.broadcast.emit("chat", {
          nickname: socket.nickname,
          chat: data,
        });
      } else {
        socket.emit("error", { status: "nicknameError" });
      }
    });

    // 채팅이 끊겼을 때
    socket.on("disconnect", () => {
      // 모든 유저에게 서버에서 떠난 유저의 닉네임을 알려준다.
      io.emit("exitUser", socket.nickname);

      // filter 메서드를 이용해서 온라인유저정보에서 퇴장한 유저정보를 제거해준다.
      onlineUser = onlineUser.filter(user=>user.nickname!==socket.nickname)

    });
  });
}
