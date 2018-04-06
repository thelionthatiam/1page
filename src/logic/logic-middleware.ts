import QuerySvc from '../data-access/queries';
import * as R from '../services/value-objects';
import * as V from '../services/validation';


export class SessionCheckSvc {
    querySvc:QuerySvc;
    user: R.UserSession;

    constructor(querySvc, user) {
        this.querySvc = querySvc;
        this.user = user;
    }


    getPermissions() {
        return this.querySvc.getSessionID([this.user.uuid])
            .then(result => this.querySvc.getUser([this.user.uuid]))
            .then(result => result.permission)
    }
}