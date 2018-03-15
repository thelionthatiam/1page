import newAccount from './new-account-page';
import login from './login-page'

var allTags = document.body.getElementsByTagName('*');
var ids = [];
for (var tg = 0; tg< allTags.length; tg++) {
    var tag = allTags[tg];
    if (tag.id) {
            ids.push(tag.id);
     }
}
console.log(ids)

for (let i = 0; i < ids.length; i ++) {
  if (ids[i] === 'new-user') {
    console.log('create account page')
    newAccount();
  } else if (ids[i] === 'login') {
    console.log('login page')
    login();
  }
}
