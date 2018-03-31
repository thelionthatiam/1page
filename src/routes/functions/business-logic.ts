import { Query } from './queries';
import * as bcrypt from 'bcrypt';
import * as help from '../functions/helpers';
import * as r from '../resources/value-objects';
import * as uuidv4 from 'uuid/v4';

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
                    resolve(result);
                }
            })
            .catch(err => reject(err));
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

// NEW ACCOUNT

export function hash(input) {
    return new Promise (
        (resolve, reject) => {
            bcrypt.hash(input, 10)
            .then(hash => resolve(hash))
            .catch(err => reject(err))
        }
    )
}

export function saveUserInformation(client, email, phone, password, name) {
    return new Promise (
        (resolve, reject) => {
            client.insertUser([email, phone, password, name, 'user'])
            .then((result) => {
                console.log(result)
                let u = result.rows[0]
                console.log(u)
                let user = r.UserDB.fromJSON({
                    email:u.email,
                    user_uuid:u.user_uuid,
                    permission:u.permission,
                    phone:u.phone,
                    name:u.name,
                    password:u.password
                }) 
                console.log(user)
                resolve(user)
            })
            .catch(err => reject(err))
        }
    )
}

export const randomString = new Promise((resolve, reject) => {
    let string = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=`,." +
            "<>/?;:'{}[]|";
    for (let i = 0; i <= 40; i++) {
        string += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    if (typeof string === "undefined") {
        let err = new Error ("randomString failed to create anything ")
        return reject(err)
    }
    return resolve(string);
})

export function insertUserNonce(client, uuid, nonce) {
    return new Promise (
        (resolve, reject) => {
            client.insertNonce([uuid, nonce])
            .then(result => resolve(result))
            .catch(err => reject(err))
        }
    )
}

export function createUserSessionStorage(client, uuid, sessionID) {
    return new Promise (
        (resolve, reject) => {
            client.insertSession([uuid, sessionID])
            .then(result => resolve(result))
            .catch(err => reject(err))
        }
    )
}

export function createUserSettings(client, uuid) {
    return new Promise (
        (resolve, reject) => {
            client.insertSettings([uuid])
            .then(result => resolve(result))
            .catch(err => reject(err))
        }
    )
}

// LOGOUT

export function updateToInactiveSessionID(client, uuid) {
    return new Promise (
        (resolve, reject) => {
            let inactive = uuidv4();
            client.updateSessionID([inactive, uuid])
                .then(result => resolve())
                .catch(err => reject(err))
        }
    )
}

export function destroySession(session) {
    return new Promise (
        (resolve, reject) => {
            session.destroy((err) => {
                err ? reject(err) : resolve()
            })
        }
    )
}


export { checkEmail, checkPassword, regenerateSession, updateSession, defineSession };