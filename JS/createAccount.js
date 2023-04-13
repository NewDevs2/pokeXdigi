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
form.setAttribute("action", "checkCreatAccount");
form.setAttribute("method", "post");

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

createTag("div", "class", "checkbox", form);
const checkbox = document.querySelector(".checkbox");

createTag("div", "class", "personal_header", checkbox);
const checkboxHeader = document.querySelector(".personal_header");

// ! 개인정보수집 동의 박스

createTag(
  "div",
  "class",
  "checkbox_title",
  checkbox.children[0],
  "개인정보수집활용"
);

createTag("div", "class", "personal_checkbox", checkbox.children[0]);

const personalChecker = document.querySelector(".personal_checkbox");

let personalText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
minima rerum et neque quae, incidunt tempora minus quam
similique libero odit nostrum architecto aperiam modi
laudantium adipisci voluptatum est exercitationem. Lorem ipsum
dolor sit amet consectetur adipisicing elit. Quas optio
maiores dolores omnis. Modi in placeat numquam fugiat, ratione
perspiciatis sit ad voluptas maxime amet ducimus quidem!
Nesciunt, nostrum voluptatibus. Lorem ipsum dolor sit amet
consectetur adipisicing elit. Quia illum illo voluptatem et,
fugiat animi eveniet earum. Delectus sequi impedit hic eos ut
quisquam consectetur, deserunt ea eligendi? Deleniti, quasi!`;

createTag("div", "class", "personal_information_text", checkbox, personalText);

createInput("radio", "agreed_check", "agreed_check", "", "", personalChecker);

createLabel("personal_agreed_check", personalChecker, "동의함");

createInput("radio", "agreed_check", "agreed_check", "", "", personalChecker);

createLabel("personal_.disagreed_check", personalChecker, "동의하지 않음");
