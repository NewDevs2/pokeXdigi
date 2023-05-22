/**
 * ID유효성 검사하는 함수
 * @param {문자열} ID 
 * @returns {불리언}
 ** 유효성 : 영어,숫자, 언더바(_), 하이픈(-) 4~12글자
 ** 검증 완료된 ID는 true를 반환
 ** 유효성에 어긋나는 ID는 false를 반환
 */
export function idValidation(ID) {
  const regExp = /^[\w-]{4,12}$/
  if (regExp.test(ID)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 클라이언트측 ID중복검사 리퀘스트를 보내는 함수
 * @param {문자열} ID 
 * @returns {불리언}
 ** 아이디가 중복이라면 false를 반환
 ** 아이디가 중복이 아니라면 true를 반환
 */
export async function checkIdDuplicationRequest(ID) {
  const request  = await fetch(`/checkIdDuplication?id=${ID}`);
  const response = await request.json();
  if (response.result === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * 서버측 ID중복검사를 수행하는 함수
 ** 중복아이디가 있다면 false를 반환
 ** 중복아이디가 없다면 true를 반환
 * @param {req.url} url 
 * @param {DB사용자} DB
 * @return {json}
 ** 아이디가 중복이라면 false를 반환
 ** 아이디가 중복이 아니라면 true를 반환
 */
export function checkIdDuplication(url, DB, response) {
  const body = url.split('?');
  const id   = body[1].split('=')[1];
  DB.query(`SELECT * FROM user_information WHERE id = '${id}'`, (err, result)=>{
    if (err) throw err;
    if (result.length > 0) {
      response.writeHead(200, { 'Content-Type': 'text/json' });
      response.write(JSON.stringify({ result: false }));
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'text/json' });
      response.write(JSON.stringify({ result: true }));
      response.end();
    }
  })
}

export { idValidation, checkIdDuplicationRequest, checkIdDuplication };