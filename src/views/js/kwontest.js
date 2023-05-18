
const pw = document.getElementById('password');
const errorElement = document.createElement('p');
pw.addEventListener('input', function(event) {
  const password = event.target.value;
  // !  특문이 들어가야 하고 한자는 안된다.

  const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9가-힣!@#$%^&*][\u3131-\u3163\uac00-\ud7a3\uD83C-\uD83E\uDD00-\uDDFF]/;
// ! 자리수와 이모지도 못 들어가게 하였다.
  const test = /^[\x00-\x7F]{4,24}$/;


  const existingErrorElement = document.getElementById('password-error');

  if (!password.match(passwordRegex)) {
    errorElement.id = 'password-error';
    errorElement.innerText = "유효하지 않은 비밀번호입니다.";

    if (!existingErrorElement) {
      pw.insertAdjacentElement('afterend', errorElement);
    }
  } 
  if (!password.match(test)) {
    errorElement.id = 'password-error';
    errorElement.innerText = "비밀번호는 4~24자리 입니다.";

    if (!existingErrorElement) {
      pw.insertAdjacentElement('afterend', errorElement);
    }
  } else {
    if (existingErrorElement) {
      existingErrorElement.parentNode.removeChild(existingErrorElement);
    }
  }
});
// pw.addEventListener('input', function(event) {
//   // ! 클라이언트에서 입력하는 데이터를 확인하다
//   const password = event.target.value;
//   //! 정규식을 이용하여 특수문자 하나 이상이여야 하고 한자는 못 넣는다.
//   const passwordRegex = /^(?=.*[!@#$%^&*])(?!.*[\u3131-\u3163\uac00-\ud7a3\uD83C-\uD83E\uDD00-\uDDFF]).{8,}$/;


//   if (password.match(passwordRegex)) {
   
//     errorElement.innerText ="유효하지 않은 비밀번호입니다.";
//     pw.insertAdjacentElement('afterend', errorElement);

//     // pw.appendChild(errorElement)
//     console.log("유효하지 않은 비밀번호입니다.");
//   } else {
//     console.log("유효한 비밀번호입니다.");
//   }
  

  // if (password.length < 8) {
  //   if (!passwordError) {
  //     const p = document.createElement('p');
  //     p.id = 'password-error';
  //     p.textContent = "비밀번호는 최소 8자 이상이어야 합니다.";
  //     passwordInput.parentNode.appendChild(p);
  //   }
  // } else {
  //   if (passwordError) {
  //     passwordError.parentNode.removeChild(passwordError);
  //   }
  // }

  // if (password.length < 8) {
  //   // 오류 메시지를 화면에 표시하는 방법
  //   // const errorElement = document.getElementById('password-error');
  //   errorElement.innerText = "비밀번호는 최소 8자 이상이어야 합니다.";
   
  //   // 필요한 경우 스타일을 변경하거나 클래스를 추가하여 오류 메시지를 시각적으로 강조할 수도 있습니다.
  // } else {
  
  //   errorElement.textContent = ""; // 오류 메시지를 삭제합니다.
  // }
// });




