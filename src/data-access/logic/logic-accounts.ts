import * as bcrypt from 'bcrypt';
import * as E from '../services/error-handling';
import * as R from '../services/value-objects';
import * as V from '../services/validation';
import QuerySvc from '../data-access/queries';


export default class CreateAcctSvc {
    inputs:R.UserInputs
    querySvc:QuerySvc;
    user:R.UserDB;
    sessionID:string;



    constructor(querySvc, inputs, sessionID) {
        console.log('constructor of create account', inputs)
        this.querySvc = querySvc;
        this.inputs = R.UserInputs.fromJSON(inputs);
        this.sessionID = sessionID;
        this.user;

        this.hash = this.hash.bind(this);
        this.randomString = this.randomString.bind(this)
    }

    hash() {
        return bcrypt.hash(this.inputs.password, 10)
    }

    formatInputs(hashPass:string) {
        let hashPassUserInputs: [V.Email, V.NumOnly, V.CharOnly, string,  V.Permission] 
        hashPassUserInputs = [
            this.inputs.email,
            this.inputs.phone,
            this.inputs.name,
            hashPass,
            'user'
        ]

        return hashPassUserInputs;
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
                    reject(err)
                }
                resolve(string);
            }
        )
    }

    createAcct() {
        return E.passChecker(this.inputs.password)
            .then(() => this.hash())
            .then(hash => this.querySvc.insertUser(this.formatInputs(hash))) 
            .then((user) => {
                this.user = user;
                return this.randomString()
            })
            .then((nonce) => { this.querySvc.insertNonce([this.user.user_uuid, nonce]) })
            .then(() => { this.querySvc.insertSession([this.user.user_uuid, this.sessionID]) })
            .then((sessionInDB) => { this.querySvc.insertSettings([this.user.user_uuid]) })
    }
}
