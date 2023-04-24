import tagMaker from "/src/models/tag/tagMaker.js";
// ! wrap, container 식별

const wrap = document.getElementById("wrap");
const container = document.getElementById("container");

tagMaker("h1", container, {
  className: "header",
  innerText: "계정 생성",
});

const account_information = tagMaker("div", container, {
  className: "account_information",
});

const form = tagMaker("form", account_information, {
  className: "createAccountForm",
  action: "checkCreateAccount",
  method: "POST",
});

tagMaker("input", form, {
  type: "text",
  name: "id",
  id: "id",
  placeholder: "아이디",
  required: "true",
});

tagMaker("input", form, {
  type: "password",
  name: "password",
  id: "password",
  placeholder: "비밀번호",
  required: "true",
});

tagMaker("input", form, {
  type: "password",
  id: "password_check",
  placeholder: "비밀번호 확인",
  required: "true",
});

tagMaker("input", form, {
  type: "text",
  name: "name",
  id: "name",
  placeholder: "이름",
  required: "true",
});

tagMaker("input", form, {
  type: "email",
  name: "email",
  id: "email",
  placeholder: "이메일",
  required: "true",
});

tagMaker("input", form, {
  type: "text",
  name: "phone_number",
  id: "phone_number",
  placeholder: "휴대전화번호",
  required: "true",
});

tagMaker("input", form, {
  type: "text",
  name: "id_number",
  id: "id_number",
  placeholder: "주민등록번호",
  required: "true",
});

const checkbox = tagMaker("div", form, {
  className: "checkbox",
});

const personalBox = tagMaker("div", checkbox, {
  className: "personal",
});

tagMaker("div", personalBox, {
  className: "personal_check_header",
});

tagMaker("div", personalBox.children[0], {
  className: "personal_header_title",
  innerText: "개인정보수집활용",
});

const personalCheckbox = tagMaker("div", personalBox.children[0], {
  className: "personal_checkbox",
});

const agreedCheck = tagMaker("input", personalCheckbox, {
  type: "checkbox",
  name: "person_info_agreement",
  id: "agreed_check",
});

tagMaker("label", personalCheckbox, {
  for: "agreed_check",
  innerText: "동의함",
});

// ? 안내문구 생성
let personalText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemominima rerum et neque quae, incidunt tempora minus quamsimilique libero odit nostrum architecto aperiam modilaudantium adipisci voluptatum est exercitationem. Lorem ipsumdolor sit amet consectetur adipisicing elit. Quas optiomaiores dolores omnis. Modi in placeat numquam fugiat, rationeperspiciatis sit ad voluptas maxime amet ducimus quidem!Nesciunt, nostrum voluptatibus. Lorem ipsum dolor sit ametconsectetur adipisicing elit. Quia illum illo voluptatem et,fugiat animi eveniet earum. Delectus sequi impedit hic eos utquisquam consectetur, deserunt ea eligendi? Deleniti, quasi!`;
tagMaker("div", personalBox, {
  className: "personal_information_text",
  innerText: personalText,
});

const marketingbox = tagMaker("div", checkbox, {
  className: "marketing",
});

tagMaker("div", marketingbox, {
  className: "marketing_check_header",
});

tagMaker("div", marketingbox.children[0], {
  className: "personal_header_title",
  innerText: "마케팅 광고 수신 동의",
});

const marketingCheckbox = tagMaker("div", marketingbox.children[0], {
  className: "marketing_checkbox",
});

tagMaker("input", marketingCheckbox, {
  type: "checkbox",
  name: "marketing_agreement",
  id: "marketing_agreed_check",
});

tagMaker("label", marketingCheckbox, {
  for: "marketing_agreed_check",
  innerText: "동의함",
});

let marketingText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemominima rerum et neque quae, incidunt tempora minus quamsimilique libero odit nostrum architecto aperiam modilaudantium adipisci voluptatum est exercitationem. Lorem ipsumdolor sit amet consectetur adipisicing elit. Quas optiomaiores dolores omnis. Modi in placeat numquam fugiat, rationeperspiciatis sit ad voluptas maxime amet ducimus quidem!Nesciunt, nostrum voluptatibus. Lorem ipsum dolor sit ametconsectetur adipisicing elit. Quia illum illo voluptatem et,fugiat animi eveniet earum. Delectus sequi impedit hic eos utquisquam consectetur, deserunt ea eligendi? Deleniti, quasi!`;

tagMaker("div", marketingbox, {
  className: "marketing_information_text",
  innerText: marketingText,
});

const buttons = tagMaker("div", form, {
  className: "submitButton",
});

tagMaker("button", buttons, {
  className: "accountSubmit",
  type: "button",
  innerText: "돌아가기",
});
tagMaker("button", buttons, {
  className: "accountSubmit",
  type: "submit",
  innerText: "생성",
});

form.addEventListener("submit", (event) => {
  // console.log("잘 됨")
  // agreed data 조건 -> checked
  // console.log(agreed_check.checked)
  // console.log(marketing_agreed_check.checked)

  if (agreed_check.checked !== true) {
    alert("개인 정보 수집활용 동의는 필수 사항입니다");
    event.preventDefault();
  } else {
    // DB에 전송 할 데이터
    agreed_check.value = 1;
    // console.log('개인정보 수집 성공의 데이터:',agreed_check.value)
  }
  if (marketing_agreed_check.checked === true) {
    marketing_agreed_check.value = 1;
    // console.log(marketing_agreed_check.value);
  } else {
    marketing_agreed_check.value = 0;
    marketing_agreed_check.checked = true;
    // console.log('마케팅 수집 성공의 데이터:',marketing_agreed_check.value)
  }
  // console.log(marketingCheckbox)
});
// 클라이언트 인풋 데이터 선 처리
form.addEventListener("submit", (event) => {
  // console.log("잘 됨")
  // agreed data 조건 -> checked
  // console.log(agreed_check.checked)
  // console.log(marketing_agreed_check.checked)

  if (agreed_check.checked !== true) {
    alert("개인 정보 수집활용 동의는 필수 사항입니다");
    event.preventDefault();
  } else {
    // DB에 전송 할 데이터
    agreed_check.value = 1;
    console.log('개인정보 수집 성공의 데이터:',agreed_check.value)
  }
  if (marketing_agreed_check.checked === true) {
    marketing_agreed_check.value = 1;
    console.log(marketing_agreed_check.value);
  } else {
    marketing_agreed_check.value = 0;
    marketing_agreed_check.checked = true;
    console.log('마케팅 수집 성공의 데이터:',marketing_agreed_check.value)
  }
  // console.log(marketingCheckbox)
});
