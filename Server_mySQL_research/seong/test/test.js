function checkGET () {
  // a가 request.method라고 가정
  let a = 1 // 1은 'GET'이라고 가정
  let url = '/index02.html' // 변수 url은 req.url이라고 가정
  function Cincludes(first) { // url에 매개변수 문자열이 포함되어있다면 true
    return url.includes(first)
  }
  if (a === 1) {
    switch (true) {
      case 'index.html' :
        console.log('첫 번째 케이스');
        break
      case 'index02.html' :
        console.log('두 번째 케이스');
        break
      case 'index02.html' :
        console.log('세 번째 케이스');
        break
      case Cincludes('/index02.html') :
        console.log('네 번째 케이스')
        break
      case '/index02.html' :
        console.log('다섯 번째 케이스')
        break
    }
  }
}
console.log(checkGET())