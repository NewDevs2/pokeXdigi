/**
 * 
 * @param {문자열} name
 * @returns {불리언}
 ** 유효성 : 한글,영어(공백미포함) 2~10글자
 ** 이름이 유효성을 통과하면 true를 반환
 ** 이름이 유효성을 통과하지 못하면 false를 반환
 */
export default function (name) {
  const regExp = /^[가-힣a-zA-Z]{2,10}$/
  if (regExp.test(name)) {
    return true;
  } else {
    return false;
  }
}