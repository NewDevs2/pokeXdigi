import {sendCookie} from "../../../utils/Cookie/cookieManager.js"
// console.log(sendCookie)
// 공용 태그 생성 함수
import tagMaker from "../../models/tag/tagMaker.js"
// wrap = body
tagMaker("div", document.body, {
  id:"wrap",
  style:"display:flex;justify-content:center;"
})
// 컬러 페이퍼
const colorPaper = tagMaker("div", wrap, {
  id:"colorPaper"
});
// 컨테이너
const container = tagMaker("div", wrap, {
  id:"container",
  style:"width:660px; height:100%; background-color:white;display:flex;justify-content:center;align-items:center; "
})
// 박스
const box = tagMaker("div", container, {
  id:"box",
  style:"width:100%; height:640px; display:flex; justify-content:space-evenly;align-items:center; flex-direction:column;"
})
// 박스의 자식 요소들
const checkImg =tagMaker("div",box,{
  id:"checkImg",
  style:"width:350px; height:350px; border-radius: 50%;background-color:#FCA311;display:flex; align-items:center; justify-content:center;"
})
// 체크모양 이미지
tagMaker("div",checkImg,{
  style : "width : 270px; height : 210px;background-image : url('/src/views/img/whiteCheckMark.png');background-size: cover;"
})

tagMaker("div",box,{
  innerHTML:"계정이 생성되었습니다!",
  style:"font-size:56px; display:flex; align-items:center;;"
})
tagMaker("div",box,{
  innerHTML:"지금 바로 PokeDigi를 이용해보세요.",
  style: "font-size: 28px;"
})
const loginButton = tagMaker("input",box,{
  type:"button",
  value:"로그인",
  id:"login",
  style:"width:500px; height:100px; font-size:40px; background-color:#FCA311; color:white;"
})
// 로그인 버튼 이벤트
loginButton.addEventListener("click", () => {
  window.location.href = "/src/views/html/login.html";
});
loginButton.addEventListener("mouseover",() => {
  // console.dir(loginButton.style)
  loginButton.style.border ="1px yellow solid"
})
loginButton.addEventListener("mouseout",() => {
  // console.dir(loginButton.style)
  loginButton.style.border ="1px black solid"
})


// function test() {

// }
// console.log(sendCookie())
sendCookie((data)=> {
  // console.log(data)
  // console.log(data.login)
  if(data.login === "true") {
    // console.log("로그인이 트루입니다")
    alert("이미 로그인 상태입니다")
    window.location.href = "/src/views/html/index.html";
  }
})

