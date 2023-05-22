// ! 비밀번호 정규식을 이용하여 유효성 검사
export function checkPWValidation (pwValues) {
  // !  특문이 들어가야 하고 한자는 안된다.
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])(?!.*[\uD800-\uDBFF\uDC00-\uDFFF]).{8,}$/;
  if (passwordPattern.test(pwValues)) {
    console.log("유효한 비밀번호 입니다.");
    return true;
  } else {
    console.log("유효하지 않은 비밀번호 입니다.");
    return false;
  }
}


// ! 비밀번호 제대로 입력 하였는지 확인 하는 모듈
// ! 비밀번호 확인 하는 로직
export function checkPW(input, pw) {
  const errorElement = document.createElement("p");
  input.addEventListener("input", function (e) {
    // const pwCheck = e.target.value;
    if (pw.value === e.target.value) {
      errorElement.innerText = "비밀번호가 일치합니다.";
      input.insertAdjacentElement("afterend", errorElement);
    } else {
      errorElement.innerText = "비밀번호가 일치하지 않습니다.";
    }
  });
}


// function  test(pwValues) {
//   // !  특문이 들어가야 하고 한자는 안된다.
//   const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])(?!.*[\uD800-\uDBFF\uDC00-\uDFFF]).{8,}$/;
//   if (passwordPattern.test(pwValues)) {
//     console.log("유효한 비밀번호 입니다.");
//   } else {
//     console.log("유효하지 않은 비밀번호 입니다.");
//   }

// }

// test('newdevs123@')