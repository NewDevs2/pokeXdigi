// 엘리먼트 생성 함수
function createElement(
  parentName,
  element,
  elementContent,
  elementName,
  elementValue
) {
  let parent = document.getElementById(parentName);
  const createElement = document.createElement(element);
  createElement.innerHTML = elementContent;
  // setAttribute의 값이 undefined가 아닐 때 속성 부여
  if (elementName !== undefined && elementValue !== undefined) {
    createElement.setAttribute(elementName, elementValue);
  }
  parent.appendChild(createElement);
}
// 컨테이너
createElement("wrap", "div", "", "id", "container");
// 박스
createElement("container", "div", "", "id", "box");
// console.log(container);
createElement("box", "div", "내용");
//box의 자식 컨텐츠
createElement("box", "div", "", "id", "checkImg");
createElement("box", "div", "계정이 생성되었습니다!");
createElement("box", "div", "지금 바로 PokeDigi를 이용해보세요.");
createElement("box", "button", "로그인", "id", "login");
// 로그인 버튼 클릭시 로그인 페이지로 이동
login.addEventListener("click", () => {
  window.location.href = "../HTML/findAccount.html";
});

function elementStyler(element) {
  element.style.width = "100px";
}
wrap.style.display = "flex";
let ss = [];
elementStyler(wrap);
