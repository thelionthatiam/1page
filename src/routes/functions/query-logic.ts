import { Query } from './queries';
import * as bcrypt from 'bcrypt';
import * as help from '../functions/helpers';
import * as r from '../resources/value-objects'

// AUTHORIZATION

function checkEmail(client, email) {
    return new Promise (
        (resolve, reject) => {
            client.selectUser([email])
            .then((result) => {
                if (result.rows.length === 0) {
                    throw new Error("Email not found");
                } else {
                    resolve(r.UserDB.fromJSON(result.rows[0]));
                }
            })
            .catch(err => reject(err))
        }
    )
}

function checkPassword(inputPass, realPass) {
    console.log(inputPass, realPass)
    return new Promise (
        (resolve, reject) => {
            bcrypt.compare(inputPass, realPass)
            .then((result : boolean) => {
                if (result === false) {
                    throw new Error('Password incorrect');
                } else {
                    resolve(result)
                }
            })
            .catch(err => reject(err))
        }
    )
}

function regenerateSession(session) {
  return new Promise (
    (resolve, reject) => {
      session.regenerate(function(err) {
        if (err) reject(err)
        else resolve();
      })
    }
  )
}


function updateSession(client, sessionID, uuid) {
    return new Promise (
        (resolve, reject) => {
            client.updateSessionID([sessionID, uuid])
            .then((result) => {
                resolve(result)
            })
            .catch(err => reject(err))
        }
    )  
}

function defineSession(user) {
    let session = r.UserSession.fromJSON({
          email:user.email,
          uuid:user.user_uuid,
          permission:user.permission,
          name:user.name
        })
    return session;
}
        

export { checkEmail, checkPassword, regenerateSession, updateSession, defineSession }; 