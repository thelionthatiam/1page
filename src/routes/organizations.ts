import * as express from 'express';
import { deepMerge } from '../services/merge'
import { db } from '../middleware/database';
const allOrgs = express.Router();

allOrgs.route('/all')
  .post((req, res) => {
    // all happens via admin
  })
  .get((req, res) => {
    let email;

    res.locals.loggedIn ? email = req.session.user.email : email = undefined;

    req.querySvc.getOrgs([])
      .then((result) => {
        let organizationContent = result.rows;

        for (let i = 0; i < organizationContent.length; i++) {
          organizationContent[i].loggedIn = res.locals.loggedIn;
          organizationContent[i].email = email;
        }
        res.render('account/all-organizations', {
          organizationContent:organizationContent,
          loggedIn:res.locals.loggedIn
          
        })
      })
      .catch((err) => {
        console.log(err);
        res.render('account/all-organizations', { dbError: err });
      });
  })


export default allOrgs;
