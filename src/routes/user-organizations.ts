import * as express from 'express';
import { db } from '../middleware/database';
import * as r from '../services/value-objects'
const orgs = express.Router();


orgs.route('/')
  .post((req, res) => {
    let org = req.body.org_uuid;
    let userOrgs;
    console.log(req.session.user)
    db.query('SELECT * FROM user_orgs WHERE user_uuid = $1', [req.session.user.uuid])
    .then((result) => {
      userOrgs = result.rows
      for (let i = 0; i < userOrgs.length; i++) {
        if (userOrgs[i].org_uuid === org) {
          throw new Error('You have already added this org!')
        }
      }
      if (result.rowCount >= 2) {
        throw new Error('You can only save 2 organizations to favorites right now.')
      }  else {
        console.log(req.session.user.uuid, org)
        db.query('INSERT INTO user_orgs(user_uuid, org_uuid) VALUES ($1, $2)', [req.session.user.uuid, org])
      }
    })
    .then((result) => {
      res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs' )
    })
    .catch((error) => {
      console.log(error);
      error = {error:error}
      res.render('/app/accounts/' + req.session.user.uuid + '/orgs', error)
    })
  })
  .get((req, res) => {
    let name:string,
        description:string,
        cause:string,
        link:string,
        defaultSet:boolean = false;

    let email = req.session.user.email;
    db.query('SELECT x.org_uuid, name, description, link, cause, active FROM orgs x INNER JOIN user_orgs y ON x.org_uuid = y.org_uuid AND (user_uuid = $1)', [req.session.user.uuid])
      .then((result) => {
        let organizationContent = result.rows;
        for (let i = 0; i < organizationContent.length; i++) {
          organizationContent[i].email = email;
          console.log( organizationContent[i].link)
          if (organizationContent[i].active) {
            defaultSet = true;
            name = organizationContent[i].name
            description = organizationContent[i].description
            link = organizationContent[i].link
            cause = organizationContent[i].cause
          }
        }
        console.log('@@@@@@@@@@@@@@@@ organization content get',organizationContent)
        res.render('account/organizations', {
          organizationContent:organizationContent,
          email: email,
          name:name,
          description:description,
          cause:cause,
          link:link,
          defaultSet:defaultSet
        })
      })

      .catch((err) => {
        console.log(err);
        res.render('account/organizations', { dbError: err });
      });
  })

orgs.route('/all')
  .post((req, res) => {
    // all happens via admin
  })
  .get((req, res) => {
    let user = r.UserSession.fromJSON(req.session.user)

    req.aQuery.selectOrgs([])
      .then((result) => {
        let organizationContent = result.rows;

        for (let i = 0; i < organizationContent.length; i++) {
          let org = r.OrgsDB.fromJSON(organizationContent[i]) // at least it catches problems
          organizationContent[i].email = user.email;
          // this was used for the jquery version of the front end to scroll to a name via click
          // organizationContent[i].frontEndID = idMaker(organizationContent[i].name)
        }

        res.render('account/all-organizations', {
          organizationContent:organizationContent,
          email: user.email
        })
      })
      .catch((err) => {
        console.log(err);
        res.render('account/all-organizations', { dbError: err });
      });
  })


// MUST FLIP BOOL
orgs.route('/:sku')
  .put((req,res) => {
    let userOrgs;
    let addingOrg = req.body.org_uuid
    console.log(addingOrg, req.body)
    db.query('UPDATE user_orgs SET active = $1 WHERE user_uuid = $2', [false, req.session.user.uuid])
      .then((result) =>{
        return db.query('UPDATE user_orgs SET active = $1 WHERE user_uuid = $2 AND org_uuid = $3', [true, req.session.user.uuid, addingOrg])
      })
      .then((result) => {
        res.redirect('/app/accounts/' + req.session.user.uuid + '/orgs/' )
      })
      .catch((error) => {
        console.log(error)
res.render('/app/accounts/' + req.session.user.uuid + '/orgs/', error)
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
      res.render('/app/accounts/' + req.session.user.uuid + '/orgs/', error)
    })
  })
  
export default orgs;
