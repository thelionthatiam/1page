import { Query } from '../data-access/queries';
import * as bcrypt from 'bcrypt';
import * as R from '../services/value-objects';
import * as uuidv4 from 'uuid/v4';

// AUTHORIZATION

export class AuthSvc {
    client: Query;
    sessionID: string;
    user: R.UserDB;
    inputs: inputs;
    req: Request;

    constructor(client, user, inputs, sessionID) {
        this.sessionID = sessionID;
        this.client = client;
        this.user = user;
        this.inputs = inputs;

        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.updateSession = this.updateSession.bind(this);
        this.defineSession = this.defineSession.bind(this);
        this.doAuth = this.doAuth.bind(this);
    }

    checkEmail() {
        return new Promise (
            (resolve, reject) => {
                this.client.selectUser([this.inputs.email])
                .then((result) => {
                    if (result.rows.length === 0) {
                        throw new Error("Email not found");
                    } else {
                        resolve(R.UserDB.fromJSON(result.rows[0]));
                    }
                })
                .catch(err => reject(err))
            }
        )
    }

    checkPassword() {
        return new Promise (
            (resolve, reject) => {
                bcrypt.compare(this.inputs.password, this.user.password)
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
    updateSession() {
        // console.log('~~~~~~ session id after regnerate', this.sessionID)
        return new Promise (
            (resolve, reject) => {
                this.client.updateSessionID([this.sessionID, this.user.user_uuid])
                .then((result) => {
                    resolve(result)
                })
                .catch(err => reject(err))
            }
        )
    }
    defineSession() {
        let session = R.UserSession.fromJSON({
            email:this.user.email,
            uuid:this.user.user_uuid,
            permission:this.user.permission,
            name:this.user.name
            })
        return session;
    }

    doAuth() {
        // console.log('%%%%%%%%%%%1', this)
        return new Promise (
            (resolve, reject) => {
                // console.log('%%%%%%%%%%%2', this)
                this.checkEmail()
                    .then((result) => {
                        // console.log('%%%%%%%%%%%3', this)
                        this.user = result;
                        return this.checkPassword();
                    })
                    .then(() => {
                        // console.log('%%%%%%%%after regen', this.sessionID)
                        return this.updateSession();
                    })
                    .then((result) => {
                        let userSession = this.defineSession();
                        // console.log('final promise do auth', this.sessionID)
                        resolve(userSession);
                    })
                    .catch((err) => reject(err))
            }
        )
    }
}


export function regenerateSession(session) {
    // console.log('~~~~~~ session id before regnerate', session.id)
  return new Promise (
    (resolve, reject) => {
      session.regenerate(function(err) {
        if (err) {
            reject(err)
        } else {
            // console.log('~~~~~~ session id after regnerate', session.id)
            resolve();
        }
      })
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
