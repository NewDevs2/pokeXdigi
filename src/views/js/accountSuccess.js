// 공용 태그 생성 함수
import tagMaker from "../../models/tag/tagMaker.js"

// const wrap = document.getElementById("wrap");
tagMaker("div",document.body, {
  id:"wrap",
  style:"width:1920px; height:1080px;  background-color:gray;display:flex;justify-content:center;"
})

// 컨테이너
const container = tagMaker("div", wrap, {
  id:"container",
  style:"width:45%; height:100%; background-color:white;display:flex;justify-content:center;align-items:center; "
})
// 박스
const box = tagMaker("div", container, {
  id:"box",
  style:"width:100%; height:100%; display:flex; justify-content:space-evenly;align-items:center; flex-direction:column;"
})
// 박스의 자식 요소들
const checkImg =tagMaker("div",box,{
  id:"checkImg",
  style:"width:400px; height:400px;background-color:gray; border-radius: 50%;"
})
// tagMaker("div",checkImg,{
//   style:'display: block;width: 40px;height: 40px;border: 4px solid white;border-radius: 50%;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%) rotate(45deg);'
// })

tagMaker("div",box,{
  innerHTML:"계정이 생성되었습니다!",
  style:"font-size:30px; display:flex; align-items:center;"
})
tagMaker("div",box,{
  innerHTML:"지금 바로 PokeDigi를 이용해보세요."
})
const loginButton = tagMaker("input",box,{
  type:"button",
  value:"로그인",
  id:"login",
  style:"width:500px; height:100px; font-size:40px;"
})
// 로그인 버튼 이벤트
loginButton.addEventListener("click", () => {
  window.location.href = "/src/views/html/login.html";
});
