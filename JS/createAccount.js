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
