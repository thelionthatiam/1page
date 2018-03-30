"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var new_account_1 = require("./new-account");
var login_1 = require("./login");
var home_1 = require("./home");
var allTags = document.body.getElementsByTagName('*');
var ids = [];
for (var tg = 0; tg < allTags.length; tg++) {
    var tag = allTags[tg];
    if (tag.id) {
        ids.push(tag.id);
    }
}
for (var i = 0; i < ids.length; i++) {
    if (ids[i] === 'new-user') {
        new_account_1.default();
    }
    else if (ids[i] === 'login') {
        login_1.default();
    }
    else if (ids[i] === 'app') {
        app_1.default();
    }
    else if (ids[i] === 'home') {
        home_1.default();
    }
    // else if (ids[i] === 'root') {
    //   ReactDOM.render(
    //   <Tester userData = {window.data}/>,
    //   document.getElementById('root')
    //   );
    // } 
}
//# sourceMappingURL=index.js.map