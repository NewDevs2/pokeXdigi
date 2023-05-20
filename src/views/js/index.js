import tagMaker from "../../models/tag/tagMaker.js";
import { sendCookie } from "../../../utils/Cookie/cookieManager.js";
// ! body 태그와 같은 크기를 준다.
// const wrap = tagMaker("div", document.body, {
//   id: "wrap",
//   style:
//     " width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;",
// });

// //! 테스트
// const colorPaper = tagMaker("div", wrap, { id: "colorPaper" });
// const container = tagMaker("div", wrap, { id: "container" });

// //! 버튼 만들기
// const btnback = tagMaker("button", container, { innerText: "sign-in" });
// btnback.addEventListener("click", function () {
//   location.href = "/src/views/html/login.html";
// });
// const btnback2 = tagMaker("button", container, { innerText: "sign-up" });
// btnback2.addEventListener("click", function () {
//   location.href = "/src/views/html/createAccount.html";
// });

sendCookie((data) => {
  console.log(data);
  if (data.login === "true") {
    const wrap = tagMaker("div", document.body, {
      id: "wrap",
      style:
        " width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;",
    });

    //! 로그인 하지 않았을 경우 나오는 페이지

    const titleText = tagMaker("h1", wrap, {
      id: "titleText",
      innerText: "POKE X DIGI",
    });
    const colorPaper = tagMaker("div", wrap, { id: "colorPaper" });
    const container = tagMaker("div", wrap, { id: "container" });
    const btnback = tagMaker("button", container, {
      id: "buttons",
      innerText: "입장",
    });
    btnback.addEventListener("click", function () {
      location.href = "/src/views/html/chatting.html";
    });

    const btnLogOut = tagMaker("button", container, {
      id: "buttons",
      innerText: "로그아웃",
    });
    btnLogOut.addEventListener("click", function () {
      location.href = "/logout";
    });
  } else {
    // ! 로그인 했을 경우 보여줄 페이지
    const wrap = tagMaker("div", document.body, {
      id: "wrap",
      style:
        " width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;",
    });

    const wrapSecond = tagMaker("div", document.body, {
      id: "wrapSecond",
      style:
        " width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;",
    });

    const containerSecond = tagMaker("div", wrapSecond, {
      id: "container_second",
    });

    const containerSecondHeader = tagMaker("div", containerSecond, {
      id: "container_second_header",
    });

    const containerSecondHeaderTitle = tagMaker("h1", containerSecondHeader, {
      id: "container_second_header_title",
      innerText: "POKE X DIGI",
    });

    const containerSecondSignInButton = tagMaker(
      "button",
      containerSecondHeader,
      {
        id: "container_second_sign_in_button",
        innerText: "회원가입",
      }
    );

    const containerSecondIntroduceOne = tagMaker("div", containerSecond, {
      id: "container_second_introduce_one",
    });

    const containerSecondIntroduceOnePictureBox = tagMaker(
      "div",
      containerSecondIntroduceOne,
      {
        id: "container_second_introduce_one_picture_box",
      }
    );

    const containerSecondIntroduceOnePictureBackground = tagMaker(
      "div",
      containerSecondIntroduceOnePictureBox,
      {
        id: "container_second_introduce_one_picture_background",
      }
    );

    const containerSecondIntroduceOnePicture = tagMaker(
      "div",
      containerSecondIntroduceOnePictureBackground,
      {
        id: "container_second_introduce_one_picture",
      }
    );

    const containerSecondIntroduceOneTextBox = tagMaker(
      "div",
      containerSecondIntroduceOne,
      {
        id: "container_second_introduce_one_textbox",
      }
    );

    const containerSecondIntroduceOneText = tagMaker(
      "span",
      containerSecondIntroduceOneTextBox,
      {
        id: "container_second_introduce_one_text",
        innerText: "여러분만의 포켓몬과 디지몬을 모으세요.",
      }
    );

    const containerSecondIntroduceTwo = tagMaker("div", containerSecond, {
      id: "container_second_introduce_two",
    });

    const wrapThird = tagMaker("div", document.body, {
      id: "wrapThird",
      style:
        " width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;",
    });

    const titleText = tagMaker("h1", wrap, {
      id: "titleText",
      innerText: "POKE X DIGI",
    });
    const colorPaper = tagMaker("div", wrap, { id: "colorPaper" });
    const colorPaperSecond = tagMaker("div", wrapSecond, { id: "colorPaper" });
    const colorPaperThird = tagMaker("div", wrapThird, { id: "colorPaper" });
    const container = tagMaker("div", wrap, { id: "container" });

    //! 버튼 만들기
    const btnback = tagMaker("button", container, {
      id: "buttons",
      innerText: "로그인",
    });
    btnback.addEventListener("click", function () {
      location.href = "/src/views/html/login.html";
    });
    const btnback2 = tagMaker("button", container, {
      id: "buttons",
      innerText: "회원가입",
    });
    btnback2.addEventListener("click", function () {
      location.href = "/src/views/html/createAccount.html";
    });
    let currentSection = 1;

    function handleMouseWheel(event) {
      // 마우스 휠 이벤트 발생 시 실행될 함수
      event.preventDefault(); // 기본 스크롤 동작 막기

      const delta = event.wheelDelta || -event.detail;

      if (delta > 0 && currentSection > 1) {
        // 마우스 휠을 위로 굴릴 때 이전 섹션으로 스크롤
        currentSection--;
      } else if (delta < 0 && currentSection < 3) {
        // 마우스 휠을 아래로 굴릴 때 다음 섹션으로 스크롤
        currentSection++;
      }

      scrollToSection();
    }

    function scrollToSection() {
      // 현재 섹션에 해당하는 영역으로 스크롤
      if (currentSection === 1) {
        wrap.scrollIntoView({ behavior: "smooth" });
      } else if (currentSection === 2) {
        wrapSecond.scrollIntoView({ behavior: "smooth" });
      } else if (currentSection === 3) {
        wrapThird.scrollIntoView({ behavior: "smooth" });
      }
    }

    // 마우스 휠 이벤트 리스너 등록
    window.addEventListener("wheel", handleMouseWheel, { passive: false });
  }
});
