export default test(clientInput) {
    let checkForm = /^(010|011)[1-9][0-9]{7}$/;
    // console.log(checkForm.test(clientInput));
    return checkForm.test(clientInput);
}
// test('0103333222')
// // 휴대폰 중간번호를 수정해야 함
// test('01010111222')