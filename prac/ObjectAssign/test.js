function Tag(tagName, parent, Attribute) {
  const element = document.createElement(tagName);
  parent.appendChild(element);
  if (Attribute) {
    Object.assign(element,Attribute)
  };
  return element
};


// function TagTest(tagName, Attribute) {
  // const element = document.createElement(tagName);
  // parent.appendChild(element);
  // if (Attribute) {
    // Object.assign(element,Attribute)
  // };
  // return element
// };
// 
// const testdiv = document.createElement('div');

const root = Tag('div',document.body,{
  id:'root',
  style:'background-color:aqua; width:500px; height:500px',
  innerText:'아쿠아 민경'
});

const input = Tag('input',root,{type:'text',name:'민경이',placeholder:'태초마을이야'})

// const submit = Tag('input',document.body,{type:'submit'})

// const children = Tag('div',{id:'root', parentElement:root})
// console.log(root)

