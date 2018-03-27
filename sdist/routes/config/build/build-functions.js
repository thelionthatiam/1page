"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var prompt = require("prompt");
var fs = require("fs");
var tableDrop = psqlCommand(["DROP TABLE nonce", "DROP TABLE users"]);
exports.tableDrop = tableDrop;
function applyDefaults(obj) {
    for (var k in obj) {
        if (k === 'database' && obj[k] === '') {
            obj.database = 'formapp';
            console.log(obj[k], "is the database");
        }
        else if (k === 'user' && obj[k] === '') {
            obj.user = 'formadmin';
            console.log(obj[k], "is the user");
        }
        else if (k === 'password' && obj[k] === '') {
            obj.password = 'formpassword';
            console.log(obj[k], "is the password");
        }
        else if (k === 'host' && obj[k] === '') {
            obj.host = 'localhost';
            console.log(obj[k], "is the host");
        }
    }
    return obj;
}
exports.applyDefaults = applyDefaults;
function psqlCommand(array) {
    var command = " --command=";
    var finarr = [];
    for (var i = 0; i < array.length; i++) {
        finarr.push(command);
        array[i] = '"' + array[i] + '"';
        finarr.push(array[i]);
    }
    return finarr.join('');
}
exports.psqlCommand = psqlCommand;
function connectCommand(user, host, database, password) {
    var connectCommand = "PGPASSWORD=" + password +
        " psql" +
        " -U " + user +
        " -h " + host +
        " -d " + database;
    return connectCommand;
}
exports.connectCommand = connectCommand;
function prompter(promptObj, cb) {
    prompt.start();
    prompt.get(promptObj, function (err, result) {
        if (err) {
            console.log("something went wrong", err);
            cb(err);
        }
        else {
            cb(null, result);
        }
    });
}
exports.prompter = prompter;
function childProcess(string, cb) {
    child_process_1.exec(string, function (error, stdout, stderr) {
        if (error) {
            cb(error);
        }
        else {
            cb(null, stdout, stderr);
        }
    });
}
exports.childProcess = childProcess;
var tablesExist = psqlCommand(["SELECT * FROM users", "SELECT * FROM nonce"]);
exports.tablesExist = tablesExist;
function fileChecker(path) {
    try {
        var file = require(path);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.fileChecker = fileChecker;
function filesInDir(dir, cb) {
    fs.readdir(dir, function (err, files) {
        if (err) {
            cb(err);
        }
        else {
            cb(null, files);
        }
    });
}
exports.filesInDir = filesInDir;
function stringOfFiles(dir, array, version, rev) {
    var finalArr = [];
    if (rev) {
        for (var i = array.length - 1; i >= version; i--) {
            finalArr.push("-f " + dir + '/' + array[i]);
        }
        return " -a " + finalArr.join(' ');
    }
    else {
        for (var i = 0; i < version; i++) {
            finalArr.push("-f " + dir + '/' + array[i]);
        }
        return " -a " + finalArr.join(' ');
    }
}
exports.stringOfFiles = stringOfFiles;
var makeJSONfromObj = function (path, obj, cb) {
    var data = JSON.stringify(obj);
    fs.writeFile(path, data, function (err) {
        if (err) {
            cb(err);
        }
    });
};
exports.makeJSONfromObj = makeJSONfromObj;
var removeConfig = function (path, cb) {
    fs.unlink(path, function (err) {
        if (err) {
            cb(err);
        }
    });
};
exports.removeConfig = removeConfig;
//# sourceMappingURL=build-functions.js.map