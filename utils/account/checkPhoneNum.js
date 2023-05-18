function test(clientInput) {
    let checkForm = /^[0-1]{3}[- ]?[1-9]{3}[- ]?[1-9]{3}$/;
    console.log(checkForm.test(clientInput));
    return checkForm.test(clientInput);
}
test('010-3333-2222')