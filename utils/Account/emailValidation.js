export default function (text) {
  const regExp = /^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
  if (regExp.test(text)) {
    return true;
  } else {
    return false;
  }
}