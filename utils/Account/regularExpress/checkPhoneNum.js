export default function(clientInput) {
  // 휴대폰 앞번호는 010~019 등만 가능 하고 뒤 네자리 수 중에
  // 첫번째 숫자는 0이 불가능 하다!
  let checkForm = /^(010|011|016|017|018|019)[1-9][0-9]{3}[1-9][0-9]{3}$/;
  return checkForm.test(clientInput)
}