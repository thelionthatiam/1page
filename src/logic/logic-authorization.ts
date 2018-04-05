import QuerySvc from '../data-access/queries';
import * as bcrypt from 'bcrypt';
import * as R from '../services/value-objects';
import * as V from '../services/validation';
import * as uuidv4 from 'uuid/v4';

// AUTHORIZATION

export default class AuthSvc {
    querySvc: QuerySvc;
    sessionID: string;
    user: R.UserDB;
    inputs: { email: V.Email, password: String };
    req: Request;

    constructor(querySvc, inputs, sessionID) {
        this.sessionID = sessionID;
        this.querySvc = querySvc;
        this.inputs = inputs;
        this.user;

        this.checkPassword = this.checkPassword.bind(this);
        this.defineSessionData = this.defineSessionData.bind(this);
        this.doAuth = this.doAuth.bind(this);
    }

    checkPassword() {
        bcrypt.compare(this.inputs.password, this.user.password) 
            .then((result : boolean) => {
                if (result === false) {
                    throw new Error('Password incorrect');
                } else {
                    return result;
                }
            })
            .catch(err => err);
    }

    defineSessionData() {
        let session = R.UserSession.fromJSON({
            email:this.user.email,
            uuid:this.user.user_uuid,
            permission:this.user.permission,
            name:this.user.name
        })

        return session;
    }

    doAuth() {
        return this.querySvc.getUserViaEmail([this.inputs.email])
            .then((result) => {
                this.user = result;
                return this.checkPassword();
            })
            .then(() => this.querySvc.updateSessionID([this.sessionID, this.user.user_uuid]))
            .then(() => {
                let userDataForSession = this.defineSessionData();
                return userDataForSession;
            })
            .catch(err => err)
    }
}


export function regenerateSession(session) {
    return new Promise (
        (resolve, reject) => {
            session.regenerate(function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve()
                }
            })
        }
    )
}

// LOGOUT

export function updateToInactiveSessionID(querySvc, uuid) {
    let inactive = uuidv4();
    return querySvc.updateSessionID([inactive, uuid])
            .then(() => {})
            .catch(err => err)
}

export function destroySession(session) {
    return new Promise (
        (resolve, reject) => {
            session.destroy(err => err ? reject(err) : resolve())
        }
    )
}

