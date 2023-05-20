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

    // ! wrapSecond : index.html 페이지의 두 번째 영역

    const wrapSecond = tagMaker("div", document.body, {
      id: "wrapSecond",
      style:
        " width:100vw; height:100vh; display:flex; justify-content:center; align-items:center;",
    });

    // ! containerSecond : wrapSecond 안에서 한번 더 감싸주는 div

    const containerSecond = tagMaker("div", wrapSecond, {
      id: "container_second",
    });

    // ! containerSecondHeader : containerSecond 안에서의 헤더.
    // ! containerSecondHeader 안에는 POKE X DIGI 타이틀와 회원가입 버튼이 들어갑니다.

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

    // ! containerSecondIntroduceOne : 헤더 바로 아래쪽에 위치한 두 개의 소개 영역 중 첫 번째.
    // ! 이 안에는 소개 사진과 소개 텍스트가 들어갑니다.

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

    // ! containerSecondIntroduceTwo : 헤더 바로 아래쪽에 위치한 두 개의 소개 영역 중 두 번째.
    // ! 이 안에는 소개 사진과 소개 텍스트가 들어갑니다.

    const containerSecondIntroduceTwo = tagMaker("div", containerSecond, {
      id: "container_second_introduce_two",
    });

    const containerSecondIntroduceTwoPictureBox = tagMaker(
      "div",
      containerSecondIntroduceTwo,
      {
        id: "container_second_introduce_two_picture_box",
      }
    );

    const containerSecondIntroduceTwoPictureBackground = tagMaker(
      "div",
      containerSecondIntroduceTwoPictureBox,
      {
        id: "container_second_introduce_two_picture_background",
      }
    );

    const containerSecondIntroduceTwoPicture = tagMaker(
      "div",
      containerSecondIntroduceTwoPictureBackground,
      {
        id: "container_second_introduce_two_picture",
      }
    );

    const containerSecondIntroduceTwoTextBox = tagMaker(
      "div",
      containerSecondIntroduceTwo,
      {
        id: "container_second_introduce_two_textbox",
      }
    );

    const containerSecondIntroduceTwoText = tagMaker(
      "span",
      containerSecondIntroduceTwoTextBox,
      {
        id: "container_second_introduce_one_text",
        innerText: "친구들과 소통하고 자신만의 방을 꾸며보세요.",
      }
    );

    // ! wrapThird : index.html 페이지의 세 번째 영역

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
