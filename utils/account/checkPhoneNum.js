function sss(clientInput) {
    let checkForm = /^(010|011|016|017|018|019)[1-9][0-9]{3}[1-9][0-9]{3}$/;
    console.log(checkForm.test(clientInput));
    // return checkForm.test(clientInput);
}
// test('0103333222')
// // 휴대폰 중간번호를 수정해야 함
sss('01020111222')