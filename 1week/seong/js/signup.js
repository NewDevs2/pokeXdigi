const CreateDoc = (Tag, parents, prop) => {
  const element = document.createElement(Tag);
  parents.appendChild(element);
  if (prop !== undefined) {
    for (let attri in prop) {
      element.setAttribute(attri, prop[attri]);
    }
  }
}

const formSignupwriteprop = {
  'method': 'POST',
  'action': 'Signupform',
  'id': 'formSignupWrite',
  'accept-charset': 'utf-8'
};
CreateDoc('form', document.body, formSignupwriteprop);

const Signupform = document.getElementById('formSignupWrite');

CreateDoc('label', Signupform);
Signupform.children[0].innerHTML = '</br> ID';
const inputTextIdprop = {
  'type': 'text',
  'name': 'id'
}
CreateDoc('input', Signupform.children[0], inputTextIdprop);

CreateDoc('label', Signupform);
Signupform.children[1].innerHTML = '</br> Password';
const inputTextPassprop = {
  'type': 'password',
  'name': 'password'
}
CreateDoc('input', Signupform.children[1], inputTextPassprop);

CreateDoc('label', Signupform);
Signupform.children[2].innerHTML = '</br> 이 름';
const inputTextNameprop = {
  'type': 'text',
  'name': 'name'
}
CreateDoc('input', Signupform.children[2], inputTextNameprop);

CreateDoc('label', Signupform);
Signupform.children[3].innerHTML = '</br> 이메일';
const inputTextEmailprop = {
  'type': 'email',
  'name': 'email'
}
CreateDoc('input', Signupform.children[3], inputTextEmailprop);

CreateDoc('label', Signupform);
Signupform.children[4].innerHTML = '</br> 생년월일';
const inputTextBirthprop = {
  'type': 'date',
  'name': 'birthday'
}
CreateDoc('input', Signupform.children[4], inputTextBirthprop);


const inputSubmitSignupFinishprop = {
  'type': 'submit',
  'value': '회원가입완료'
};
CreateDoc('input', Signupform, inputSubmitSignupFinishprop);

