// ! 태그 만들기
function blockMaker(tagName, attribute, idName, path) {
  const blockName = document.createElement(tagName);
  const pathName = document.querySelector(path);
  blockName.setAttribute(attribute, idName);
  pathName.appendChild(blockName);

}
// ! 태그를 만들면서 텍스트 넣기
function textMaker(path, child, area) {
  const pathName = document.querySelector(path);
  const textTag = document.createElement(child);
  pathName.appendChild(textTag);
  textTag.innerText = area;
}
// ! 태그에 속성값 넣기
function addattribute(tagName,attribute, add) {
  const pathName = document.querySelector(tagName);
  pathName.setAttribute(attribute, add);
}


// * 바디 자식으로 루트 id를 가진 디비전 만듦
blockMaker("div", "id", "root", "body"); 

// ! 흰색 화면
blockMaker("div", "background-color", "gray", "body > #root");


// * root디비전 안에 큰 틀로 3개의 영역으로 나누었다.
blockMaker("div", "null", "", "body > #root > div");
blockMaker("form", "atcion","", "body > #root > div");
blockMaker("div", "null", "", "body > #root > div");


// * 텍스트를 담고 있는 영역
blockMaker("img", "src","https://avatars.githubusercontent.com/u/127065539?s=200&v=4","body > #root > div >:nth-child(1)");
textMaker("#root > div >:nth-child(1)", "h3", "계정 정보 찾기");
textMaker("#root > div >:nth-child(1)", "p", "개인 정보를 입력해주세요");




// * 데이터를 보낼 영역
blockMaker("input", "type","text","body > #root > div > :nth-child(2)");
blockMaker("input", "type","text","body > #root > div > :nth-child(2)");
blockMaker("input", "type","text","body > #root > div > :nth-child(2)");
textMaker("#root > div > :nth-child(2)", "button", "돌아가기");
textMaker("#root > div > :nth-child(2)", "button", "제출");


// * 데이터를 보낼 영역 속성 추가
addattribute('#root > div > :nth-child(2) > :nth-child(1)','placeholder','이름');
addattribute('#root > div > :nth-child(2) > :nth-child(2)','placeholder','주민등록번호');
addattribute('#root > div > :nth-child(2) > :nth-child(3)','placeholder','이메일');


