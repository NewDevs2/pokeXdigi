import bcrypt from "bcrypt";

class CreateUser {
  // 생성자 함수
  constructor(object) {
    this.id                    = object.id;
    this._password             = object.password;
    this.name                  = object.name;
    this.email                 = object.email;
    this.phone_number          = object.phone_number;
    this.id_number             = object.id_number;
    this.person_info_agreement = object.person_info_agreement;
    this.marketing_agreement   = object.marketing_agreement;
  }

  // 비밀번호 암호화 저장
  set _password(value) {
    // salting값(랜덤값)을 12로 지정
    this.password = bcrypt.hashSync(value, 12);
  }
}

// 암호 비교 함수
function checkPassword(input, comparison) {
  if (bcrypt.compareSync(input, comparison)) {
    return true;
  } else {
    return false
  }
}

export {CreateUser, checkPassword};