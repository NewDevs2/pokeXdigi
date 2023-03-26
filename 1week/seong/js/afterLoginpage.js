const CreateDoc = (Tag, parents, prop) => {
  const element = document.createElement(Tag);
  parents.appendChild(element);
  if (prop !== undefined) {
    for (let attri in prop) {
      element.setAttribute(attri, prop[attri]);
    }
  }
}

const mainDivprop = {
  'id':'main'
}

CreateDoc ('div',document.body, mainDivprop)
const mainDiv = document.getElementById('main');

CreateDoc ('h2', mainDiv);

