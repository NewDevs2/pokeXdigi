export default function(clientInput) {
    // [0-9]0~9까지의 숫자
    //  {6}자리와
    // [- ]? 0~1개의 공백
    // [1-4] 1~4까지의 성별 나타내는 숫자
    // [0-9]$ 0~9 숫자 {6자리의 숫자} -> 고유 번호
    // $ 문자의 끝
    let checkForm = /^[0-9]{6}[- ]?[1-4][0-9]{5}$/;
    // console.log(checkForm.test(clientInput))
    // return checkForm.test(clientInput);
}
// true
// test('123456-123456');
// // false
// test('123457523456');