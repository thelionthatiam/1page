import QuerySvc from '../data-access/queries';
import * as R from '../services/value-objects';
import * as V from '../services/validation';

export class SessionCheckSvc {
    querySvc : QuerySvc;
    user : R.UserSession;

    constructor(querySvc, user) {
        this.querySvc = querySvc;
        this.user = user;
    }

    getPermissions() {
        return this.querySvc.getSessionID([this.user.uuid])
            .then(result => {
                return this.querySvc.getUser([this.user.uuid])
            })
            .then(result => result.permission)
    }
}

// validation missing!!
interface Everything {
    alarms?: Alarm[];
    formsOfPayment?: FormsOfPayment[];
    settings?: Settings[];
    orgs?: Orgs[];
    user?: R.UserDB;
}

export class RenderStateSvc {
    querySvc : QuerySvc;
    user : R.UserSession;
    userData : Everything;

    constructor(querySvc, user) {
        this.querySvc = querySvc;
        this.user = user;
        this.userData = {};
    }
    getEverything() {
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%start get everything', this)
        return this
            .querySvc
            .getUser([this.user.uuid])
            .then(result => {
                this.userData.user = result;
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%one', this.userData)
                return this
                    .querySvc
                    .getUserFormsOfPayment([this.user.uuid])
            })
            .then(result => {
                this.userData.formsOfPayment = result
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%two', this.userData)
                return this
                    .querySvc
                    .getUserSettings([this.user.uuid])
            })
            .then(result => {
                this.userData.settings = result;
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%three', this.userData)
                return this
                    .querySvc
                    .getUserOrgs([this.user.uuid])
            })
            .then(result => {
                this.userData.orgs = result
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%four', this.userData)
                return this
                    .querySvc
                    .getUserAlarms([this.user.uuid])
            })
            .then(result => {
                this.userData.alarms = result
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%five', this.userData)
                return this.userData
            })
    }

}