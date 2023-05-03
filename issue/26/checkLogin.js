window.onload = ()=>{
  const container = document.getElementById('container');
  const button_1  = document.getElementsByTagName('button')[0];
  const button_2  = document.getElementsByTagName('button')[1];
  // console.log(container, button_1, button_2);
  async function check() {
    const response = await fetch('/checkcheckLogin');
    const result   = await response.json();
    if (result.uid) {
      const element = document.createElement('div');
      element.innerHTML = `<h1>[ ${result.uid} ]님</h1><br><p>환영합니다~</p>`;
      container.appendChild(element);

      function displayNone(node) {
        node.style.display = 'none';
      }

      displayNone(button_1);
      displayNone(button_2);
    }
  };
  // 
  check();
}