import app from './app'
import newAccount from './new-account';
import login from './login'
import home from './home'
import Tester from './test'
import * as React from 'react';
import * as ReactDOM from 'react-dom';



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
  } else if (ids[i] === 'app') {
    app();
  } else if (ids[i] === 'home') {
    home();
  } 
  // else if (ids[i] === 'root') {
  //   ReactDOM.render(
  //   <Tester userData = {window.data}/>,
  //   document.getElementById('root')
  //   );
  // } 
}
