// function blockMaker(tagName, attribute, idName, path) {
//   const blockName = document.createElement(tagName);
//   const pathName = document.querySelector(path);
//   blockName.setAttribute(attribute, idName);
//   pathName.appendChild(blockName);
//   console.dir(blockName);
// }
// function textMaker(path, child, area) {
//   const pathName = document.querySelector(path);
//   const textTag = document.createElement(child);
//   pathName.appendChild(textTag);
//   textTag.innerText = area;
//   console.log();
// }

// blockMaker("div", "id", "root", "body"); // * 바디 자식으로 루트 id를 가진 디비전 만듦
// blockMaker("a", "href", "/src/views/html/login.html", "body > #root");
// blockMaker("a", "href", "/src/views/html/createAccount.html", "body > #root");
// // * #root안에 a태그를 만들어주었다.

// textMaker("#root > :nth-child(1)", "p", "sign in");
// textMaker("#root > :nth-child(2)", "p", "sign up");
// // * a태그 자식 밑에 텍스트를 넣어주었다.

import tagMaker from "../../models/tag/tagMaker.js";


   // ! body 태그와 같은 크기를 준다.
    const root = tagMaker('div', document.body, {
    id: 'root',
    style:' width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;'
  });

    //! 버튼 만들기
    const btnback = tagMaker('button',root,{innerText:'sing-in'});
    btnback.addEventListener('click',function(){
      location.href = '/src/views/html/login.html';
    });
    const btnback2 = tagMaker('button',root,{innerText:'sing-up'});
    btnback2.addEventListener('click',function(){
      location.href = '/src/views/html/createAccount.html';
    });
  