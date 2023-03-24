const CreateDoc = (Tag, parents, prop) => {
  const element = document.createElement(Tag);
  parents.appendChild(element);
  if (prop !== undefined) {
    for (let attri in prop) {
      element.setAttribute(attri, prop[attri]);
    }
  }
}

const formprop = {
  'method': 'POST',
  'action': 'login',
  'accept-charset': 'utf-8',
  'id': 'formTag'
}
CreateDoc('form', document.body, formprop);

const form = document.getElementById('formTag');
form.style.cssText = 'width:200px; height:100px;'

CreateDoc('label',form);
form.children[0].textContent = 'ID'

const inputTextIdprop = {
  'type': 'text',
  'name': 'id'
}
CreateDoc('input', form.children[0], inputTextIdprop);

CreateDoc('label',form);
form.children[1].textContent = 'Password'

const inputTextPassprop = {
  'type': 'password',
  'name': 'password'
}
CreateDoc('input', form.children[1], inputTextPassprop);


const inputSubmitLoginprop = {
  'type': 'submit',
  'value': '로그인'
}
CreateDoc('input', form, inputSubmitLoginprop);


const formSignupprop = {
  'method': 'GET',
  'action': 'Signup',
  'id': 'formSingup'
}
CreateDoc('form', document.body, formSignupprop);
const formSignup = document.getElementById('formSingup');

const inputSubmitSignupprop = {
  'type': 'submit',
  'value': '회원가입'
};
CreateDoc('input', formSignup, inputSubmitSignupprop);
