function test(clientInput) {
    let checkForm = /^[0-1]{3}[- ]?[1-9]{1}[0-9]{3}[[- ]?[1-9]{1}[0-9]{3}$/;
    console.log(checkForm.test(clientInput));
    return checkForm.test(clientInput);
}
test('010-3333-2222')
// 휴대폰 중간번호를 수정해야 함
test('01010112222')