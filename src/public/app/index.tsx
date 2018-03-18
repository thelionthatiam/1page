import newAccount from './pages/new-account';
import login from './pages/login'

var allTags = document.body.getElementsByTagName('*');
var ids = [];
for (var tg = 0; tg< allTags.length; tg++) {
    var tag = allTags[tg];
    if (tag.id) {
            ids.push(tag.id);
     }
}

for (let i = 0; i < ids.length; i++) {
  if (ids[i] === 'new-user') {
    newAccount();
  } else if (ids[i] === 'login') {
    login();
  }
}
