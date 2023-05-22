import peopleNum from './checkPeopleNum.js';
import phoneNum from '/checkPhoneNum.js';
import email from './emailValidation.js';
import { idValidation } from './idValidation.js';
import nameVal from './nameValidation.js';
import {checkPWValidation} from './checkPWValidation.js';

export function validation(formData) {
  let check = [];
  switch (false) {
    case idValidation(formData.id) :
      check.push('id');
    case checkPWValidation(formData.password) :
      check.push('password');
    case nameVal(formData.name) :
      check.push('name');
    case email(formData.email) :
      check.push('email');
    case phoneNum(formData.phone_number) :
      check.push('phone_number');
    case peopleNum(formData.id_number) :
      check.push('id_number');
  }
  if (check.length === 0) {
    form.submit();
  } else {
    return check;
  }
}

export function valTypeError(formData) {
  if (Array.isArray(validation(formData))) {
  }
}

