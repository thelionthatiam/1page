import * as bcrypt from 'bcrypt';
import * as E from '../services/error-handling';
import * as R from '../services/value-objects';
import * as V from '../services/validation';
import QuerySvc from '../data-access/queries';

export default class CreateAcctSvc {
    inputs:{
        email:V.Email;
        phone:V.NumOnly;
        password:V.String;
        name:V.CharOnly;
        hashedPassword?:string;
    };
    querySvc:QuerySvc;
    user:R.UserDB;
    sessionID:string;


    constructor(querySvc, inputs, sessionID) {
        this.querySvc = querySvc;
        this.inputs = inputs;
        this.sessionID = sessionID;
        this.user;

        this.hash = this.hash.bind(this);
        this.randomString = this.randomString.bind(this)
    }

    hash() {
        return bcrypt.hash(this.inputs.password, 10)
            .then(hash => {
                console.log('hashed completed,', hash)
                this.inputs.hashedPassword = hash
                return null;
            })
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
                console.log('random string completed,', string)
                resolve(string);
            }
        )
    }

    createAcct() {
        return E.passChecker(this.inputs.password)
            .then(() => this.hash())
            .then(() => this.querySvc.insertUser([
                this.inputs.email,
                this.inputs.phone,
                this.inputs.hashedPassword, 
                this.inputs.name,
                'user'])
            ) 
            .then((user) => {
                console.log('user inserted', user)
                this.user = user;
                return this.randomString()
            })
            .then((nonce) => {
                console.log('nonce created', nonce)
                this.querySvc.insertNonce([this.user.user_uuid, nonce])
            })
            .then(() => {
                console.log('nonce inserted')
                console.log('session inputs', this.user.user_uuid, this.sessionID)
                this.querySvc.insertSession([this.user.user_uuid, this.sessionID])
            })
            .then((sessionInDB) => {
                console.log('insert session completed', sessionInDB)
                this.querySvc.insertSettings([this.user.user_uuid])
            })
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
