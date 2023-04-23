import bcrypt from 'bcrypt';

export class UserData {
  constructor(ID,PW,name,Email,ID_number,phone_number,person_info_agreement,marketing_agreement,recommend=null) {
    this.ID                    = ID
    this._PASSWORD             = PW
    this.NAME                  = name
    this.EMAIL                 = Email
    this.ID_NUMBER             = ID_number
    this.PHONE_NUMBER          = phone_number
    this.PERSON_INFO_AGREEMENT = person_info_agreement
    this.MARKETING_AGREEMENT   = marketing_agreement
    this.RECOMMEND             = recommend
  }

  set _PASSWORD(value) {
    this.PASSWORD = bcrypt.hashSync(value,12);
  }

  get column() {
    return Object.keys(test).join()
  }

  get value() {
    return Object.values(test).map(element=>`\'${element}\'`).join()
  }

  // column() {
  //   return Object.keys(test).join()
  // }

  // value() {
  //   return Object.values(test).map(element=>`\'${element}\'`).join()
  // }
}

const test = new UserData('test','test','kwakyounho','kwakdm95@gmail.com',1122233455678,11111111111,1,0)
// console.log(test);
// console.log(Object.keys(test).join());
// console.log(Object.values(test).map(element=>`\'${element}\'`).join());
// console.log(test.column);
console.log(test.value);