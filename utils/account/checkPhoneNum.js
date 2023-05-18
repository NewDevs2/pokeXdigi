function test(clientInput) {
    let checkForm = /^[0-1]{3}[- ]?[1-9]{3}[- ]?[1-9]{3}$/
    return checkForm.test(clientInput);
}