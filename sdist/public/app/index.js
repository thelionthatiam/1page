"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var new_account_1 = require("./pages/new-account");
var login_1 = require("./pages/login");
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
    console.log(ids[i]);
    if (ids[i] === 'new-user') {
        new_account_1.default();
    }
    else if (ids[i] === 'login') {
        login_1.default();
    }
}
//# sourceMappingURL=index.js.map