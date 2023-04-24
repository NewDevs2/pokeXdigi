// // ! 태그 만들기
// function blockMaker(tagName, attribute, idName, path) {
//   const blockName = document.createElement(tagName);
//   const pathName = document.querySelector(path);
//   blockName.setAttribute(attribute, idName);
//   pathName.appendChild(blockName);
// }
// // ! 태그를 만들면서 텍스트 넣기
// function textMaker(path, child, area) {
//   const pathName = document.querySelector(path);
//   const textTag = document.createElement(child);
//   pathName.appendChild(textTag);
//   textTag.innerText = area;
// }
// // ! 태그에 속성값 넣기
// function addattribute(tagName, attribute, add) {
//   const pathName = document.querySelector(tagName);
//   pathName.setAttribute(attribute, add);
// }

// // * 바디 자식으로 루트 id를 가진 디비전 만듦
// blockMaker("div", "id", "root", "body");

// // ! 흰색 화면
// blockMaker("div", "background-color", "gray", "body > #root");

// // * root디비전 안에 큰 틀로 3개의 영역으로 나누었다.
// blockMaker("div", "null", "", "body > #root > div");
// blockMaker("form", "atcion", "", "body > #root > div");
// blockMaker("div", "null", "", "body > #root > div");

// // * 텍스트를 담고 있는 영역
// blockMaker(
//   "img",
//   "src",
//   "https://avatars.githubusercontent.com/u/127065539?s=200&v=4",
//   "body > #root > div >:nth-child(1)"
// );
// textMaker("#root > div >:nth-child(1)", "h3", "계정 정보 찾기");
// textMaker("#root > div >:nth-child(1)", "p", "개인 정보를 입력해주세요");

// // * 데이터를 보낼 영역
// blockMaker("input", "type", "text", "body > #root > div > :nth-child(2)");
// blockMaker("input", "type", "text", "body > #root > div > :nth-child(2)");
// blockMaker("input", "type", "text", "body > #root > div > :nth-child(2)");
// textMaker("#root > div > :nth-child(2)", "button", "");

// textMaker("#root > div > :nth-child(2) >:nth-child(4)", "a", "돌아가기");
// textMaker("#root > div > :nth-child(2)", "button", "제출");

// // * 데이터를 보낼 영역 속성 추가
// addattribute(
//   "#root > div > :nth-child(2) > :nth-child(1)",
//   "placeholder",
//   "이름"
// );
// addattribute(
//   "#root > div > :nth-child(2) > :nth-child(2)",
//   "placeholder",
//   "주민등록번호"
// );
// addattribute(
//   "#root > div > :nth-child(2) > :nth-child(3)",
//   "placeholder",
//   "이메일"
// );
// addattribute(
//   "#root > div > :nth-child(2) > :nth-child(4)> :nth-child(1)",
//   "href",
//   "/src/views/html/login.html"
// );


import tagMaker from "../../models/tag/tagMaker.js";


   // ! body 태그와 같은 크기를 준다.
    const root = tagMaker('div', document.body, {
    id: 'root',
    style:' width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;'
  });
// ! 중앙에 하나 큰 div전을 만들어주었다.
  const container = tagMaker('div', root, {
      id: 'container',
      style: 'width:70%; height:100%'
    });
    // 중앙에 있는 div에서 세로로 3개로 나누어 주었다.
  const div1 = tagMaker('div', container, {
    id: 'div1',
    style: ' width:100%; height:20%'
  });
  const div2 = tagMaker('div', container, {
    id: 'div2',
    style: ' width:100%; height:60% ;display:flex; flex-direction: column; justify-content:center; align-items:center;'
  });

  const logo = tagMaker('img',div2,{src:'https://avatars.githubusercontent.com/u/127065539?s=200&v=4',style:'width:40%; height:25%'});
  const h2 = tagMaker('h2',div2,{innerText:'계정 정보 찾기'});
  const pTag = tagMaker('p',div2,{innerText:'개인 정보를 입력해 주세요'});
  // ! 인풋 테그로 텍스트 담는 태그 만들기
  const inputName = tagMaker('input',div2,{type:'text',name:'name',placeholder:'너의 이름은..'});
  const inputJumin = tagMaker('input',div2,{type:'text',name:'jumin',placeholder:'주민등록번호'});    
  const inputEmail = tagMaker('input',div2,{type:'text',name:'email',placeholder:'이메일'});

  //! 버튼 만들기
  const btnback = tagMaker('button',div2,{innerText:'돌아가기'});
  btnback.addEventListener('click',function(){

    // 전 페이지 이동
    history.back()
  });
  const btnback2 = tagMaker('button',div2,{innerText:'괜찮아여? 많이 놀랬죠?'});
  btnback2.addEventListener('click',function(){
    location.href = '';
  });


  // const aBack = tagMaker('a',btnback,{href:'/src/views/html/login.html',style:'width:100%; height:100%;',innerText:'돌아가기'});

  const div3 = tagMaker('div', container, {
    id: 'div3',
    style: ' width:100%; height:20%'
  });