function emailTest(val:string) {
  var emailCheck = /^[a-zA-Z0-9\._\$%\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9]{2,6}/;
  if (emailCheck.test(val) === true) {
      return "OK";
  }
  else {
      return "That's not a valid email. Try again";
  }
}

function phoneTest(val:string) {
    var phoneCheck = /^[0-9]+$/;
    if (phoneCheck.test(val) === true) {
        return "OK";
    }
    else {
        return "Somehow you used something other than numbers. It's a phone number, so stick to numbers.";
    }
}

function nameTest(val:string) {
  var check = /^[a-zA-Z -]+$/;
  if (check.test(val) === true) {
      return "OK";
  }
  else {
      return "Honestly, if this is your name, sorry. This is a very weak regex right now.";
  }
}

function textFormValidation(type:string, val:string) {
  if (type === 'email') {
    return emailTest(val)
  } else if (type === 'phone') {
    return phoneTest(val)
  } else if (type === 'name' ) {
    return nameTest(val)
  }  else {
    return 'this code is broken'
  }
}


export { textFormValidation };
