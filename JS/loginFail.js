const CreateDoc = (tag, parent, tagprop) => {
  const element = document.createElement(tag);
  parent.appendChild(element);
  for (let attri in tagprop) {
    element.setAttribute(attri, tagprop[attri]);
  }
};
// 태그를 생성하는 함수.

const wrapprop = {
  id: "wrap",
  style: "width: 100vw; height:100vh",
};

CreateDoc("div", document.body, wrapprop);
// body 자식으로 div 생성

const wrap = document.getElementById("wrap");

const containerprop = {
  id: "container",
};

CreateDoc("div", wrap, containerprop);
// wrap의 자식으로 container 라는 이름의 div 생성

const container = document.getElementById("container");

CreateDoc("h1", container);
container.children[0].innerText = "로그인에 실패하셨습니다.";
// container에 로그인 실패했다는 메세지h1태그 작성

const logimgprop = {
  src: "./",
}; // 로고 위치만 넣음 됨

CreateDoc("img", container);
// 로고 들어갈 이미지 생성

CreateDoc("h2", container);
container.children[2].innerText = "로그인";
// h2 크기의 로그인 글씨

const formprop = {
  action: "/",
  method: "POST",
  id: "form",
}; // form 에 대한 속성값들. 작성된 form 전송되어 갈 경로만 추가하면 됨.
CreateDoc("form", container, formprop);
const form = document.getElementById("form");
// form 생성 및 id 변수로 가져오기.

const inputidprop = {
  type: "text",
  name: "id",
  placeholder: "아이디",
}; // 아이디 입력할 input 태그속성

CreateDoc("input", form, inputidprop);
// 아이디 입력할 input 태그 생성

const inputpasswordprop = {
  type: "password",
  name: "password",
  placeholder: "비밀번호",
};// 비밀번호 입력할 input 태그속성

CreateDoc("input", form, inputpasswordprop);
// 비밀번호 입력할 input 태그 생성

CreateDoc("div", form);
// 비밀번호 찾기와 계정생성을 가로로 배치하기 위해 div 으로 한번 더 랩핑함.

const forgetpassprop = {
  href: ""
};// 비밀번호 찾기 시 이동될 링크 추가 필요
CreateDoc("a", form.children[2], forgetpassprop);
form.children[2].children[0].innerText = "비밀번호를 잊으셨나요?";

const createaccountprop = {
  href: ""
};// 계정 생성 시 이동될 링크 추가 필요
CreateDoc("a", form.children[2], createaccountprop);
form.children[2].children[1].innerText = "계정 생성";

CreateDoc("div", form);
// 전송버튼과 되돌아가기 버튼 배치도 가로로 하기 위해 div로 한번 더 랩핑.

CreateDoc("div", form.children[3]);
form.children[3].children[0].innerText = "돌아가기";
form.children[3].children[0].addEventListener("click", () => {
  history.go(-1);
});
//돌아가기 버튼은 addEvent로 되돌아가게 함.

const inputsubmitprop = {
  type: "submit",
  name: "로그인",
};
CreateDoc("input", form.children[3], inputsubmitprop);
// 데이터 전송할 submit 버튼.