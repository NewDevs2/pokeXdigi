function test(clientInput) {
    let checkForm = /^[0-1]{3}[- ]?[1-9]{4}[- ]?[1-9]{4}$/;
    console.log(checkForm.test(clientInput));
    return checkForm.test(clientInput);
}
test('010-3333-2222')