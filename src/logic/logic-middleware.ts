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

// THIS IS OLD AND TERRIBLE
interface Everything {
    alarms?: R.AlarmDB[];
    formsOfPayment?: FormsOfPayment[]; // still require real validation
    settings?: Settings[]; // still require real validation
    orgs?: Orgs[]; // still require real validation
    profile?: R.UserDB;
}

export class RenderStateSvc {
    querySvc : QuerySvc;
    sessionUser : R.UserSession;
    user: Everything;

    constructor(querySvc, sessionUser) {
        this.querySvc = querySvc;
        this.sessionUser = sessionUser;
        this.user = {};
    }
    getEverything() {
        // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%start get everything', this)
        return this.querySvc.getUser([this.sessionUser.uuid])
            .then(profile => {
                this.user.profile = profile
                // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%one', this.user)
                return this.querySvc.getUserAlarms([this.sessionUser.uuid])
            })
            .then(alarms => {
                this.user.alarms = alarms
                // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%five', this.user)
                return this.user
            })
    }

}


            // NOT CURRENTLY USING THIS CONCEPT
            // .then(result => {
            //     this.userData.formsOfPayment = result
            //     console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%two', this.userData)
            //     return this
            //         .querySvc
            //         .getUserSettings([this.user.uuid])
            // })

            // NOT CURRENLTY USING THIS CONCEPT
            // .then(result => {
            //     this.userData.settings = result;
            //     console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%three', this.userData)
            //     return this
            //         .querySvc
            //         .getUserOrgs([this.user.uuid])
            // })

            // NOT CURRENTLY USING THIS CONCEPT
            // .then(result => {
            //     this.userData.orgs = result
            //     console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%four', this.userData)
            //     return this
            //         .querySvc
            //         .getUserAlarms([this.user.uuid]) // wrong
            // })
