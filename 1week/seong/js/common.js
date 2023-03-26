const CreateDoc = (Tag, parents, prop) => {
  const element = document.createElement(Tag);
  parents.appendChild(element);
  if (prop !== undefined) {
    for (let attri in prop) {
      element.setAttribute(attri, prop[attri]);
    }
  }
}

document.body.style = 'height:100vh; width:100vw; display:flex; justify-content:center; align-items:center';

