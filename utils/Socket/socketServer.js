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
  let onlineUser = [];

  // 서버 연결
  io.on("connection", (socket) => {
    // 유저가 입장되어 입장된 유저 id 를 클라이언트로 부터 전달받았을 때
    socket.on("enterUser", (data) => {
      // 해당 id 를 socket.nickname 에 담아준다.
      socket.nickname = data[0];
      console.log(socket.nickname);

      // 전체 유저에게 해당 유저 입장을 알려준다.
      io.emit("enterUser", socket.nickname);

      // 접속한 유저의 캐릭터 생성용 이벤트
      // 접속한 유저 및 온라인 상태의 유저들 정보를 같이 알려준다.
      socket.emit("enterUserCharacter", [data, onlineUser]);

      // 새로 입장한 유저 정보를 온라인 상태의 유저들에게 알려준다.
      socket.broadcast.emit("newUserCharacter", data);

      // 새로 들어온 유저정보를 온라인 유저배열에 추가한다.
      onlineUser.push({
        nickname: data[0],
        position: [0, 0],
        img: data[1],
      });
    });

    // 유저 위치정보에 대한 이벤트
    socket.on("userPosition", (data) => {
      // find 메서드를 이용해서 움직인 유저 정보를 online 유저에서 찾는다.
      let moveUser = onlineUser.find(
        (user) => user.nickname === socket.nickname
      );

      // 해당 유저의 위치정보 변경
      moveUser.position = data;

      // 다른 유저들에게도 해당 정보를 전달(유저닉네임과 위치정보)
      socket.broadcast.emit("moveUser", moveUser);
    });

    // 친구 추가 버튼을 클릭했을 때, 친구 추가 로직.
    socket.on('addFriend', (data) => {
      
      // 친구 추가 클릭 시, 쿼리문을 통해 친구 테이블에 해당 유저 아이디가 이미 있는지 확인.
      sign_master.query(
        `select user_id from ${socket.nickname}friendlist;`,
        (err, result) => {
          // console.log(result, socket.nickname)
          // console.log(result.find(id => id.user_id === `${data}`));

          // 해당 아이디가 없다면
          if ((result.find(id => id.user_id === data)) === undefined) {

            // 테이블에 해당 아이디 추가.
            sign_master.query(`insert ${socket.nickname}friendlist(user_id) value('${data}')`), (err, results) => {
              console.log('친구 추가됨', results)
              // socket.emit('addfriendList',data)
            }
          } else {
            console.log('이미 친구야')

            // 이미 있는 아이디라면 이미 있는 친구라는 이벤트를 돌려준다.
            socket.emit('alreadyfriend', data)
          }
        }
      );
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
      onlineUser = onlineUser.filter(
        (user) => user.nickname !== socket.nickname
      );
    });

    // socket.on('friendList', (data) => {
    //   console.log(socket.uid);
    //   console.log();

    // })

    socket.on('friendList', (data) => {
      // 클라이언트로부터 데이터 수신됨
      console.log(data);
      console.log(socket.use);
      console.log(socket.nickname)
      sign_master.query(
        `select user_id from ${socket.nickname}friendList;`,
        (err, result) => {
          console.log(result);
          socket.emit('selectJoin',`유저 테이블 값 조회${result}`);
        });
     
      
    });
  });
}
