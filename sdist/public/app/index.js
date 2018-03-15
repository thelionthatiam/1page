"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var new_account_page_1 = require("./new-account-page");
var login_page_1 = require("./login-page");
var allTags = document.body.getElementsByTagName('*');
var ids = [];
for (var tg = 0; tg < allTags.length; tg++) {
    var tag = allTags[tg];
    if (tag.id) {
        ids.push(tag.id);
    }
}
console.log(ids);
for (var i = 0; i < ids.length; i++) {
    if (ids[i] === 'new-user') {
        console.log('create account page');
        new_account_page_1.default();
    }
    else if (ids[i] === 'login') {
        console.log('login page');
        login_page_1.default();
    }
}
//# sourceMappingURL=index.js.map