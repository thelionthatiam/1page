"use strict";
// should have limited imports for flexibility 
Object.defineProperty(exports, "__esModule", { value: true });
// ERROR REGEX
exports.serverErrorFileNotFound = /Failed to lookup/;
function dbErrTranslator(error) {
    var emailChecker = /(email)/g;
    var phoneChecker = /(phone)/g;
    var keyChecker = /(key)/g;
    var checkChecker = /(check)/g;
    var passChecker = /(password)/g;
    var lengthChecker = /(value too long)/g;
    var alarms = /(alarms)/g;
    var awake = /(awake)/g;
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
    else if (passChecker.test(error)) {
        return "There was an error with your password. Contact the administrator.";
    }
    else if (lengthChecker.test(error)) {
        return "You typed in something over 100 characters. Keep things a shorter and try again.";
    }
    else if (alarms.test(error)) {
        if (awake.test(error)) {
            return "You need to use military time. If the it is before 10:00, use leading zeros like" +
                " this 06:00.";
        }
        else if (title.test(error)) {
            return "Keep your title withing 15 characters. Other than that, you should be able to do" +
                " whatever you want.";
        }
    }
    else {
        console.log("ERROR", error);
        return "There was an error. Try again.";
    }
}
exports.dbErrTranslator = dbErrTranslator;
//# sourceMappingURL=errors.js.map