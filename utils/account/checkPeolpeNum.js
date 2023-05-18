// export default
 function test(clientInput) {
    let checkForm = /^[0-9]{6}[- ]?[1-4][0-9]{6}$/;
    console.log(checkForm.test(clientInput))
    // return checkForm.test(clientInput);
}
test('123456123456')