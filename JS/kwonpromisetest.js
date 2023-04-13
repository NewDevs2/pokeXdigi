let promise = new Promise(function(resolve, reject) {

  // ! executor (제작 코드, '가수') 
  // ! new Promise에 전달되는 함수는  executor(실행자,실행 함수)
  // * executor는 new Promise 가 만들어질 때 자동으로 실행되는데 , 결과를 최종적으로 만들어내는 제작 코드를 포함합니다.
  // 프라미스가 만들어지면 executor 함수는 자동으로 실행됩니다.

  // 1초 뒤에 일이 성공적으로 끝났다는 신호가 전달되면서 result는 '완료'가 됩니다.
  setTimeout(() => resolve(console.log("완료")), 2000);
});

const testfunction = () => {
  console.log("이건 그냥 함수 호출이야");
}
testfunction();

let promisetest = new Promise(function(resolve, reject) {
  
  setTimeout(() => resolve(console.log("test완료")), 1000);
});
