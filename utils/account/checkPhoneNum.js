export default function(clientInput) {
    let checkForm = /^(010|011|016|017|018|019)[1-9][0-9]{3}[1-9][0-9]{3}$/;
    return checkForm.test(clientInput)
}