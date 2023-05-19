// ! 검사함ㄴ 하는 모듈
const pw = document.getElementById('password');
const pw_check = document.getElementById('password_check');
const errorElement = document.createElement('p');
pw.addEventListener('input', function(event) {
  const password = event.target.value;
  // !  특문이 들어가야 하고 한자는 안된다.
  // const passwordRegex = /^(?=.*[!@#$%^&*])[\u3131-\u3163\uac00-\ud7a3\uD83C-\uD83E\uDD00-\uDDFF]$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*([!@#$%^&*])\1)[a-zA-Z0-9!@#$%^&*]{4,}$/;
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

pw_check.addEventListener('input',function(e) {
  const pwdata = pw.value;
  const pwCheck = e.target.value;
  if (pwCheck === pwdata) {
    errorElement.innerText = '비밀번호가 일치합니다.';
    pw_check.insertAdjacentElement('afterend', errorElement);
  } else {
    errorElement.innerText = '비밀번호가 일치하지 않습니다.';
  }
})

// ! 비밀번호 확인 하는 로직
export default function(input, pwValue){
const errorElement = document.createElement('p');
  input.addEventListener("input", function(e){
    const pwCheck = e.target.value;
    if(pwValue === pwCheck){
      errorElement.innerText = '비밀번호가 일치합니다.';
      pw_check.insertAdjacentElement('afterend', errorElement);
    }
    else {
      errorElement.innerText = '비밀번호가 일치하지 않습니다.';
    }
  });

}