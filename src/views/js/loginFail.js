import tagMaker from "../../models/tag/tagMaker.js"

const wrap = tagMaker("div", document.body, {
  id: "wrap"
});
// body 자식으로 div 생성

const container = tagMaker("div", wrap, {
  id: "container"
});
// wrap의 자식으로 container 라는 이름의 div 생성

const colorPaper = tagMaker("div", wrap, {
  id: "colorPaper"
});
// wrap의 자식으로 container 라는 이름의 div 생성

// tagMaker("img", container, {
  // src: "https://avatars.githubusercontent.com/u/127065539?s=200&v=4",
  // innerText:"로그인"
// });
// 로고 들어갈 이미지 생성

const content = tagMaker("div", container)

tagMaker("h2", content, {
  innerText:"POKE X DIGI"
});
// h2 크기의 로그인 글씨

tagMaker("h3", content,{
  innerText:"로그인에 실패하셨습니다."
});
// container에 로그인 실패했다는 메세지h1태그 작성

const form = tagMaker("form", content, {
  action: "/checkLogin",
  method: "POST",
  id: "form",
});
// 로그인 시도 시, action 포함해야함. checkuserinfo?

tagMaker("input", form, {
  type: "text",
  name: "UserID",
  placeholder: "아이디",
});
// 아이디 입력할 input 태그 생성

tagMaker("input", form, {
  type: "password",
  name: "UserPW",
  placeholder: "비밀번호",
});
// 비밀번호 입력할 input 태그 생성

tagMaker("div", form);
// 비밀번호 찾기와 계정생성을 가로로 배치하기 위해 div 으로 한번 더 랩핑함.

tagMaker("a", form.children[2], {
  href: "/src/views/html/findAccount.html",
  innerText:"비밀번호를 잊으셨나요?"
});

tagMaker("a", form.children[2], {
  href: "/src/views/html/createAccount.html",
  innerText : "계정 생성"
});

tagMaker("div", form);
// 전송버튼과 되돌아가기 버튼 배치도 가로로 하기 위해 div로 한번 더 랩핑.

tagMaker("input", form.children[3], {
  type: "button",
  value: "돌아가기",
  innerText:"돌아가기"
});

form.children[3].children[0].addEventListener("click", () => {
  history.go(-1);
});
//돌아가기 버튼은 addEvent로 되돌아가게 함.

tagMaker("input", form.children[3], {
  type: "submit",
  name: "로그인",
  value: "로그인",
});
// 데이터 전송할 submit 버튼.
