// 변수에 새로운 프로미스 사용
const promise = new Promise((resolve,reject)=> {
  console.log('initial')
  let resloveData = "하이"
  resolve(resloveData)
})
.then((resloveData) => console.log(resloveData))
.catch(error=> {throw new error})

// 함수의 return으로 새로운 프로미스 선언
function promise() {
  return new Promise((resolve, reject)=> {
    let data = "인사"
    resolve(data)
  })
}
promise()
.then((data)=> {console.log(data)})

.catch((error)=> {throw new error})