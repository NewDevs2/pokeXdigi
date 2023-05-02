import tagMaker from "../../models/tag/tagMaker.js";

// ! body 태그와 같은 크기를 준다.
const wrap = tagMaker("div", document.body, {
  id: "wrap",
});
// ! 중앙에 하나 큰 div전을 만들어주었다.
tagMaker("div", wrap, {
  id: "colorPaper",
});

const container = tagMaker("div", wrap, {
  id: "container",
});

// 중앙에 있는 div에서 세로로 3개로 나누어 주었다.

const maindiv = tagMaker("div", container, {
  id: "maindiv",
});

tagMaker("p", maindiv, { innerText: "poke x digi" });
tagMaker("p", maindiv, { innerText: "계정 정보 찾기" });
tagMaker("p", maindiv, {
  innerText: "개인 정보를 입력해 주세요",
});
// ! 인풋 테그로 텍스트 담는 태그 만들기

tagMaker("input", maindiv, {
  className: "hoverable",
  type: "text",
  name: "name",
  placeholder: "너의 이름은..",
});
tagMaker("input", maindiv, {
  type: "text",
  name: "jumin",
  placeholder: "주민등록번호",
  className: "hoverable",
});
tagMaker("input", maindiv, {
  type: "text",
  name: "email",
  placeholder: "이메일",
  className: "hoverable",
});

//! 버튼 만들기
const btndiv = tagMaker("div", maindiv, {});
const btnback = tagMaker("button", btndiv, {
  className: "hoverableBtn",
  innerText: "돌아가기",
});
btnback.addEventListener("click", function () {
  // 전 페이지 이동
  history.back();
});
const btnback2 = tagMaker("button", btndiv, {
  className: "hoverableBtn",
  innerText: "괜찮아여? 많이 놀랬죠?",
});
btnback2.addEventListener("click", function () {
  location.href = "";
});
const hoverables = document.querySelectorAll(".hoverable");
const hoverablesBtn = document.querySelectorAll(".hoverableBtn");

hoverables.forEach((hoverable) => {
  hoverable.addEventListener("mouseover", () => {
    Object.assign(hoverable, {
      style:
        "border: 1px solid #FCA311; box-shadow: 0px 0px 4px 1px #FCA311; border-radius: 7px;",
    });
  });
  hoverable.addEventListener("mouseout", () => {
    Object.assign(hoverable, {
      style:
        "border: 1px solid #000000; box-shadow: 0px 0px 4px 1px #000000; border-radius: 7px;",
    });
  });
});
hoverablesBtn.forEach((hoverable) => {
  hoverable.addEventListener("mouseover", () => {
    Object.assign(hoverable, {
      style:
        "  background: #FCA311;border: 1px solid #000000;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 7px;",
    });
  });
  hoverable.addEventListener("mouseout", () => {
    Object.assign(hoverable, {
      style:
        "   border: 1px solid #000000;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 7px;",
    });
  });
});
// nameinput.addEventListener("mouseover", function () {
//     for (let i in nameinput) {
//     const changinput = {
//       style:
//         "width: 452px; height: 64px; background: #FFFFFF; border: 1px solid #FCA311; box-shadow: 0px 0px 4px 1px #FCA311;border-radius: 7px;",
//     };
//     Object.assign(nameinput[i], changinput);
//     console.log(nameinput[i]);
//   }
//   });

// for (let i in nameinput) {
//   nameinput[i].addEventListener("mouseout", function () {
//     const changinput = {
//       style:
//         "width: 452px; height: 64px; background: #FFFFFF; border: 1px solid #FCA311; box-shadow: 0px 0px 4px 1px #FCA311;border-radius: 7px;",
//     };
//     Object.assign(nameinput[i], changinput);
//   });

//   console.log(nameinput[i]);
// }
// const aBack = tagMaker('a',btnback,{href:'/src/views/html/login.html',style:'width:100%; height:100%;',innerText:'돌아가기'});
