import { Server } from "socket.io";

export default function socketServer(server) {
  const io = new Server(server, {
    path: "/chat/",
    cors: {
      origin: "*",
    },
  });

  // 서버 연결
  io.on("connection", (socket) => {
    // 유저가 입장되어 입장된 유저 id 를 클라이언트로 부터 전달받았을 때
    socket.on("enterUser", (data) => {
      // 해당 id 를 socket.nickname 에 담아준다.
      socket.nickname = data;
      // 전체 유저에게 해당 유저 입장을 알려준다.
      io.emit("enterUser", socket.nickname);
    });
    // 클라이언트 측으로 부터 채팅을 전달받는다.
    socket.on("chat", (data) => {
      // 본인을 제외한 나머지 사람들에게 채팅과 채팅한 사람의 닉네임을 전달한다.
      socket.broadcast.emit("chat", { nickname: socket.nickname, chat: data });
    });
    // 채팅이 끊겼을 때
    socket.on("disconnect", () => {
      // 모든 유저에게 서버에서 떠난 유저의 닉네임을 알려준다.
      io.emit("exitUser", socket.nickname);
    });
  });
}
