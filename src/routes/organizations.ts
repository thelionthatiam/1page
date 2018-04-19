import * as express from 'express';
const allOrgs = express.Router();

allOrgs.route('/all')
  .post((req, res) => {
    // all happens via admin
  })
  .get((req, res) => {
    let email;
    console.log('all orgs get route running')
    res.locals.loggedIn ? email = req.session.user.email : email = undefined;

    req.querySvc.getOrgs([])
      .then(orgs => {
        for (let i = 0; i < orgs.length; i++) {
          orgs[i].loggedIn = res.locals.loggedIn;
          orgs[i].email = email;
        }
        res.render('all-organizations', {
          organizationContent:orgs
        })
      })
      .catch((err) => {
        console.log(err);
        res.render('all-organizations', { dbError: err });
      });
  })


export default allOrgs;
