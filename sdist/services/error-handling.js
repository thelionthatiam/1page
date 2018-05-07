"use strict";
// should have limited imports for flexibility 
Object.defineProperty(exports, "__esModule", { value: true });
// ERROR REGEX
exports.serverErrorFileNotFound = /Failed to lookup/;
function dbErrTranslator(error) {
    console.log('error from error translator', error);
    var emailChecker = /(email)/g;
    var phoneChecker = /(phone)/g;
    var nameChecker = /(name)/g;
    var keyChecker = /(key)/g;
    var checkChecker = /(check)/g;
    var passChecker = /(password)/g;
    var lengthChecker = /(value too long)/g;
    var alarms = /(alarms)/g;
    var time = /(time)/g;
    var title = /(title)/g;
    if (emailChecker.test(error)) {
        if (keyChecker.test(error)) {
            return "The email you put in has already been used. Try again.";
        }
        else {
            return "You did not submit a valid email. Try again.";
        }
    }
    else if (phoneChecker.test(error)) {
        if (keyChecker.test(error)) {
            return "The phone number you put in has already been used. Try again.";
        }
        else {
            return "You did not submit a valid phone number. Try again.";
        }
    }
    else if (nameChecker.test(error)) {
        return "You did not submit a valid name. If this is your real name, we are sorry, please use the contact form to let us know.";
    }
    else if (passChecker.test(error)) {
        return error;
    }
    else if (lengthChecker.test(error)) {
        return "You typed in something over 100 characters. Keep things a shorter and try again.";
    }
    else if (alarms.test(error)) {
        if (time.test(error)) {
            return "You need to use military time. If the it is before 10:00, use leading zeros like this 06:00.";
        }
        else if (title.test(error)) {
            return "Keep your title withing 25 characters. Other than that, you should be able to do whatever you want. Title is not mandatory.";
        }
    }
    else {
        console.log("ERROR", error);
        return "There was an error. Try again.";
    }
}
exports.dbErrTranslator = dbErrTranslator;
function cardinalityGuess(password) {
    var cardinality = 0;
    var lowerCase = /[a-z]/, upperCase = /[A-Z]/, numbers = /\d/, symbols = /[`~!@#$%^&*()\-_=+\[\]\\\{\};"':,<\.>\/?|]/;
    if (password.match(lowerCase)) {
        cardinality = cardinality + 26;
    }
    if (password.match(upperCase)) {
        cardinality = cardinality + 26;
    }
    if (password.match(numbers)) {
        cardinality = cardinality + 10;
    }
    if (password.match(symbols)) {
        cardinality = cardinality + 33;
    }
    return cardinality;
}
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
//simple brute-force scorer
function scorer(password) {
    if (password.length === 0) {
        return 0;
    }
    var cardinality = cardinalityGuess(password);
    var symbolOptions = Math.pow(cardinality, password.length);
    var entropy = password.length * (Math.log2(cardinality));
    return round(entropy, 2);
}
function passChecker(password) {
    return new Promise(function (resolve, reject) {
        var score = scorer(password);
        if (score <= 28) {
            reject('password was < 28 bits = Very Weak; might keep out family members trying to get on to your computer');
        }
        else if (score > 28 && score <= 35) {
            reject('password was 28 - 35 bits = Weak; should keep out most physical attacks, often good for desktop login passwords');
        }
        else if (score > 35 && score <= 59) {
            reject('password was 36 - 59 bits = Reasonable; not good for credit card information, but fairly secure passwords for network and company passwords');
        }
        else if (score > 59 && score <= 127) {
            resolve();
        }
        else if (score > 127) {
            resolve();
        }
        else {
            reject('Password checker doesnt understand your password. That is an error, sorry.');
        }
    });
}
exports.passChecker = passChecker;
// password strength checker
// https://www.bennish.net/password-strength-checker/
// < 28 bits = Very Weak; might keep out family members trying to get on to your computer
// 28 - 35 bits = Weak; should keep out most physical attacks, often good for desktop login passwords
// 36 - 59 bits = Reasonable; not good for credit card information, but fairly secure passwords for network and company passwords
// 60 - 127 bits = Strong; can be good for guarding financial information
// 128+ bits = Very Strong; often overkill
exports.default = scorer;
//# sourceMappingURL=error-handling.js.map