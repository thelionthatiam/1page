import CreateAcctSvc from '../logic/logic-accounts';
import { dbErrTranslator } from '../services/error-handling';
import * as express from 'express';
const accts = express.Router();

//to sign up page
accts.get('/new-account', (req, res) => res.render('new-account'));

// this seems to do nothing
accts.post('/delete', function (req, res, next) {
  res.render('login', {
    accountDelete:true
  });
});

accts.route('/accounts')
  .post((req,res) => {
    let inputs = {
      email: req.body.email,
      phone: req.body.phone,
      password:req.body.password,
      name:req.body.name,
    };
    
    req.CreateAcctSvc = new CreateAcctSvc(req.querySvc, inputs, req.sessionID)
    
    req.CreateAcctSvc.createAcct()
      .then((result)=> {
        res.render('login');
      })
      .catch((err) => {
        let stack = new Error().stack
        console.log('error', err, 'stack', stack)
        res.render('new-account', {
          dbError:dbErrTranslator(err)
        })
      })
  })


export default accts;
