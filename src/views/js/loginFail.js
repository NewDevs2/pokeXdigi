const CreateDoc = (tag, parent, tagprop) => {
  const element = document.createElement(tag);
  parent.appendChild(element);
  for (let attri in tagprop) {
    element.setAttribute(attri, tagprop[attri]);
  }
};
// 태그를 생성하는 함수.

CreateDoc("div", document.body, {
  id: "wrap",
});
// body 자식으로 div 생성

const wrap = document.getElementById("wrap");

CreateDoc("div", wrap, {
  id: "container"
});
// wrap의 자식으로 container 라는 이름의 div 생성

const container = document.getElementById("container");

CreateDoc("img", container, {
  src: "https://avatars.githubusercontent.com/u/127065539?s=200&v=4",
});
// 로고 들어갈 이미지 생성

CreateDoc("h2", container);
container.children[1].innerText = "로그인";
// h2 크기의 로그인 글씨

CreateDoc("h3", container);
container.children[2].innerText = "로그인에 실패하셨습니다.";
// container에 로그인 실패했다는 메세지h1태그 작성

CreateDoc("form", container, {
  action: "/",
  method: "POST",
  id: "form",
});
const form = document.getElementById("form");
// form 생성 및 id 변수로 가져오기.
// 로그인 시도 시, action 포함해야함. checkuserinfo?

CreateDoc("input", form, {
  type: "text",
  name: "id",
  placeholder: "아이디",
});
// 아이디 입력할 input 태그 생성

CreateDoc("input", form, {
  type: "password",
  name: "password",
  placeholder: "비밀번호",
});
// 비밀번호 입력할 input 태그 생성

CreateDoc("div", form);
// 비밀번호 찾기와 계정생성을 가로로 배치하기 위해 div 으로 한번 더 랩핑함.

CreateDoc("a", form.children[2], {
  href: "findAccount.html",
});
form.children[2].children[0].innerText = "비밀번호를 잊으셨나요?";

CreateDoc("a", form.children[2], {
  href: "createAccount.html",
});
form.children[2].children[1].innerText = "계정 생성";

CreateDoc("div", form);
// 전송버튼과 되돌아가기 버튼 배치도 가로로 하기 위해 div로 한번 더 랩핑.

CreateDoc("input", form.children[3], {
  type: "button",
  value: "돌아가기",
});
form.children[3].children[0].innerText = "돌아가기";
form.children[3].children[0].addEventListener("click", () => {
  history.go(-1);
});
//돌아가기 버튼은 addEvent로 되돌아가게 함.

CreateDoc("input", form.children[3], {
  type: "submit",
  name: "로그인",
  value : "로그인"
});
// 데이터 전송할 submit 버튼.
