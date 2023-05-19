export default function(clientInput) {
    let checkForm = /^[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[1-4](0[0-9]|[1-8][0-9]|9[0-5])[0-9]{4}$/;
    return checkForm.test(clientInput);
}