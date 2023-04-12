// 엘리먼트 생성 함수
function createElement(
  parentName,
  element,
  elementContent,
  elementValue,
  elementName
) {
  let parent = document.getElementById(parentName);
  const createElement = document.createElement(element);
  createElement.innerHTML = elementContent;
  // setAttribute의 값이 undefined가 아닐 때 속성 부여
  if (elementValue !== undefined && elementName !== undefined) {
    createElement.setAttribute(elementValue, elementName);
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
createElement("box", "button", "로그인", "type", "submit");
