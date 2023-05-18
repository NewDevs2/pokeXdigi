function test(clientInput) {
    let checkForm = /^(010|011)[- ]?[1-9][0-9][- ]?[1-9][0-9]$/;
    console.log(checkForm.test(clientInput));
    return checkForm.test(clientInput);
}
test('01033332222')
// 휴대폰 중간번호를 수정해야 함
test('01010112222')