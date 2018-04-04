import * as express from 'express';
import { db } from '../middleware/database';
import { OrgSvc } from '../logic/logic-organizations';
import * as R from '../services/value-objects';
const orgs = express.Router();


orgs.route('/')
  .post((req, res) => {
    let org = req.body.org_uuid;

    let userSession = R.UserSession.fromJSON(req.session.user);

    // db.query('SELECT * FROM user_orgs WHERE user_uuid = $1', [req.session.user.uuid])
    // .then((result) => {
    //   userOrgs = result.rows
    //   for (let i = 0; i < userOrgs.length; i++) {
    //     if (userOrgs[i].org_uuid === org) {
    //       throw new Error('You have already added this org!')
    //     }
    //   }
    //   if (result.rowCount >= 2) {
    //     throw new Error('You can only save 2 organizations to favorites right now.')
    //   }  else {
    //     console.log(req.session.user.uuid, org)
    //     db.query('INSERT INTO user_orgs(user_uuid, org_uuid) VALUES ($1, $2)', [req.session.user.uuid, org])
    //   }
    // })

    req.OrgSvc = new OrgSvc(req.aQuery, userSession, org)

    req.OrgSvc.addToUserOrgs()
      .then(() => {
        res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs')
      })
      .catch((error) => {
        console.trace('HEY YOU')
        console.log(error);

        res.render('account/organizations', error)
      })
  })
  .get((req, res) => {
    let name:string,
        description:string,
        cause:string,
        link:string,
        defaultSet:boolean = false,
        img:string,
        uuid:string;

    let email = req.session.user.email;
    db.query('SELECT x.org_uuid, name, description, link, cause, active, img, org_sku, user_uuid FROM orgs x INNER JOIN user_orgs y ON x.org_uuid = y.org_uuid AND (user_uuid = $1)', [req.session.user.uuid])
      .then((result) => {
        let organizationContent = result.rows;
        for (let i = 0; i < organizationContent.length; i++) {
          organizationContent[i].email = email;
          organizationContent[i].user_orgs = true;
          organizationContent[i].loggedIn = res.locals.loggedIn;
          if (organizationContent[i].active) {
            defaultSet = true;
            name = organizationContent[i].name
            description = organizationContent[i].description
            link = organizationContent[i].link
            cause = organizationContent[i].cause
            img = organizationContent[i].img
            uuid = organizationContent[i].org_uuid
          } 
        }
        // console.log('get user organizations', organizationContent)
        res.render('account/organizations', {
          organizationContent:organizationContent,
          email: email,
          name:name,
          description:description,
          cause:cause,
          link:link,
          defaultSet:defaultSet,
          img:img,
          uuid:uuid
        })
      })

      .catch((err) => {
        console.log(err);
        res.render('account/organizations', { dbError: err });
      });
  })


// MUST FLIP BOOL
orgs.route('/:sku')
  .put((req,res) => {
    let addingOrg = req.body.org_uuid
    // console.log('put change default donation', addingOrg)

    db.query('SELECT FROM user_orgs WHERE org_uuid = $1', [addingOrg])
      .then((result) => {
        if (result.rowCount === 0) {
          console.log('case where the org isnt even added to the user orgs yet')
          return db.query('INSERT INTO user_orgs (org_uuid, active, user_uuid) VALUES ($1, $2, $3)', [addingOrg, true, req.session.user.uuid])
        } else {
          db.query('SELECT active, org_uuid FROM user_orgs where active = $1 AND user_uuid = $2', [ true, req.session.user.uuid])
            .then((result) => {
              if (result.rowCount === 0) {
                // console.log('case where nothing is saved to the database with active')
                // console.log('case where they are different')
                return db.query('UPDATE user_orgs SET active = $1 WHERE user_uuid = $2', [false, req.session.user.uuid])
                .then((result) =>{
                  // console.log('all are set to false')
                  return db.query('UPDATE user_orgs SET active = $1 WHERE user_uuid = $2 AND org_uuid = $3', [true, req.session.user.uuid, addingOrg])
                })
              } else if (result.rows[0].org_uuid === addingOrg) {
                // console.log('case where uuid is the same as being added')
                return db.query('UPDATE user_orgs SET active = $1 WHERE user_uuid = $2 AND org_uuid = $3', [false, req.session.user.uuid, addingOrg])
              } else {
                // console.log('case where they are different')
                return db.query('UPDATE user_orgs SET active = $1 WHERE user_uuid = $2', [false, req.session.user.uuid])
                .then((result) =>{
                  // console.log('all are set to false')
                  return db.query('UPDATE user_orgs SET active = $1 WHERE user_uuid = $2 AND org_uuid = $3', [true, req.session.user.uuid, addingOrg])
                })
              }
            })
        }
      })
      .then((result) => {
        console.log('result res redirect')
        res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs/' )
      })
      .catch((error) => {
        console.log('err case')
        console.log(error)
        res.render('accounts/organizations', error)
      })
  })
  .delete((req,res) => {
    let org_uuid = req.body.org_uuid;
    db.query('DELETE FROM user_orgs WHERE user_uuid = $1 AND org_uuid = $2', [req.session.user.uuid, org_uuid])
    .then((result) => {
      res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs/' )
    })
    .catch((error) => {
      console.log(error)
      res.render('accounts/organizations', error)
    })
  })
  
export default orgs;
