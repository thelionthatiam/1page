import * as bcrypt from 'bcrypt';
import * as R from '../services/value-objects';
import * as V from '../services/validation';
import QuerySvc from '../data-access/queries';

export default class CreateAcctSvc {
    inputs:{
        email:V.Email;
        phone:V.NumOnly;
        password:V.String;
        name:V.CharOnly;
    };
    userInputValues:[V.Email, V.NumOnly, V.String, V.CharOnly, V.String]
    querySvc:QuerySvc;
    user:R.UserDB;
    sessionID:string;


    constructor(querySvc, inputs, sessionID) {
        this.querySvc = querySvc;
        this.inputs = inputs;
        this.userInputValues = [this.inputs.email, this.inputs.phone, this.inputs.password, this.inputs.name, 'user']
        this.sessionID = sessionID;
        this.user;

        this.hash = this.hash.bind(this);
        this.randomString = this.randomString.bind(this)
    }

    hash() {
        return bcrypt.hash(this.inputs.password, 10)
            .then(hash => {
                this.userInputValues[2] = hash
                return null;
            })
            .catch(e => e)

    }

    randomString() {
        return new Promise (
            (resolve, reject) => {
                let string = "";
                let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=`,.<>/?;:'{}[]|";
                for (let i = 0; i <= 40; i++) {
                    string += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                if (typeof string === "undefined") {
                    let err = new Error ("randomString failed to create anything ")
                    console.log('err', err)
                    reject(err)
                }
                console.log(string)
                resolve(string);
            }
        )
    }

    createAcct() {
        return this.hash()
            .then(() => this.querySvc.insertUser(this.userInputValues))
            .then((user) => {
                this.user = user;
                return this.randomString()
            })
            .then((nonce) => this.querySvc.insertNonce(nonce))
            .then(() => this.querySvc.insertSession([this.user.user_uuid, this.sessionID]))
            .then(() => this.querySvc.insertSettings([this.user.user_uuid]))
            .then(() => null)
            .catch(e => e)
    }
}


// export function hash(input) {
//     return new Promise (
//         (resolve, reject) => {
//             bcrypt.hash(input, 10)
//             .then(hash => resolve(hash))
//             .catch(err => reject(err))
//         }
//     )
// }

// export function saveUserInformation(querySvc, email, phone, password, name) {
//     return new Promise (
//         (resolve, reject) => {
//             querySvc.insertUser([email, phone, password, name, 'user'])
//             .then((result) => {
//                 console.log(result)
//                 let u = result.rows[0]
//                 console.log(u)
//                 let user = R.UserDB.fromJSON({
//                     email:u.email,
//                     user_uuid:u.user_uuid,
//                     permission:u.permission,
//                     phone:u.phone,
//                     name:u.name,
//                     password:u.password
//                 })
//                 console.log(user)
//                 resolve(user)
//             })
//             .catch(err => reject(err))
//         }
//     )
// }

// export const randomString = new Promise((resolve, reject) => {
//     let string = "";
//     let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+-=`,." +
//             "<>/?;:'{}[]|";
//     for (let i = 0; i <= 40; i++) {
//         string += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     if (typeof string === "undefined") {
//         let err = new Error ("randomString failed to create anything ")
//         return reject(err)
//     }
//     return resolve(string);
// })

// export function insertUserNonce(querySvc, uuid, nonce) {
//     return new Promise (
//         (resolve, reject) => {
//             querySvc.insertNonce([uuid, nonce])
//             .then(result => resolve(result))
//             .catch(err => reject(err))
//         }
//     )
// }

// export function createUserSessionStorage(querySvc, uuid, sessionID) {
//     return new Promise (
//         (resolve, reject) => {
//             querySvc.insertSession([uuid, sessionID])
//             .then(result => resolve(result))
//             .catch(err => reject(err))
//         }
//     )
// }

// export function createUserSettings(querySvc, uuid) {
//     return new Promise (
//         (resolve, reject) => {
//             querySvc.insertSettings([uuid])
//             .then(result => resolve(result))
//             .catch(err => reject(err))
//         }
//     )
// }
