// ! wrap, container 식별

const wrap = document.getElementById("wrap");
const container = document.getElementById("container");

// ! 태그 생성하는 함수 제작
const createTag = function (tagName, attribute, className, where, text) {
  const element = document.createElement(tagName);
  if (element) {
    element.setAttribute(attribute, className);
  }
  if (where) {
    where.appendChild(element);
  }
  if (text) {
    element.innerHTML = text;
  }
  return element;
};

createTag("h1", "class", "header", container, "계정 생성");

createTag("div", "class", "account_information", container);

// ! form 태그 생성 및 식별
createTag("form", "class", "createAccountForm", container.children[1]);
const form = document.querySelector(".createAccountForm");

// ! input 태그 생성
const createInput = function (type, name, id, placeholder, required, where) {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.id = id;
  input.placeholder = placeholder;
  input.required = required;

  where.appendChild(input);
  return input;
};

createInput("text", "id", "id", "아이디", true, form);
createInput("password", "password", "password", "비밀번호", true, form);
createInput(
  "password",
  "password_check",
  "password_check",
  "비밀번호 확인",
  true,
  form
);
createInput("text", "name", "name", "이름", true, form);
createInput("email", "email", "email", "이메일", true, form);
createInput("text", "number", "number", "휴대전화번호", true, form);
createInput(
  "text",
  "social_number",
  "social_number",
  "주민등록번호",
  true,
  form
);

// ! 개인정보 & 마케팅 동의 체크박스 생성 및 식별
createTag("div", "class", "checkbox", form);
const checkbox = document.querySelector(".checbox");
console.log(checkbox);
