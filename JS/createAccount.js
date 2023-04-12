// ! wrap, container 식별

const wrap = document.getElementById("wrap");
const container = document.getElementById("container");

// ! 태그 생성 함수
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

// ! input 태그 생성 함수
const createInput = function (type, name, id, placeholder, required, where) {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.id = id;
  if (placeholder !== "") {
    input.placeholder = placeholder;
  }
  if (required !== "") {
    input.required = required;
  }

  where.appendChild(input);
  return input;
};

// ! label 태그 생성 함수
const createLabel = function (name, where, text) {
  const label = document.createElement("label");
  label.setAttribute("for", name);
  if (text) {
    label.innerHTML = text;
  }
  where.appendChild(label);
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
const checkbox = document.querySelector(".checkbox");

createTag("div", "class", "personal_header", checkbox, "개인정보수집활용");
createTag("div", "class", "personal_checker", checkbox);
createInput("radio", "person_info_agreed", "", "", true, checkbox.children[1]);
createLabel("personal_check_agreed", checkbox.children[1], "동의함");
createInput(
  "radio",
  "person_info_disagreed",
  "",
  "",
  true,
  checkbox.children[1]
);
createLabel("personal_check_disagreed", checkbox.children[1], "동의하지 않음");
