import QuerySvc from '../data-access/queries';
import * as R from '../services/value-objects';
import * as V from '../services/validation';



// move to Validation file
interface Org {
    org_uuid:V.UUID;
    org_sku:string;
    name:string;
    description:string;
    cause:string;
    link:string;
    img:string;
}


export default class OrgSvc {
    querySvc:QuerySvc;
    user: R.UserSession;
    org: V.UUID;


    constructor(querySvc, user, org) {
        this.user = user;
        this.org = org;
        this.querySvc = querySvc;
    }

    canAddOrg(userOrgs:Org[]) {
        // console.log('canAddOrg')
        // console.log(userOrgs)
        return new Promise (
            (resolve, reject) => {
                for (let i = 0; i < userOrgs.length; i++) {
                    if (userOrgs[i].org_uuid === this.org) {
                        console.log('already have')
                    let err = 'You have already added this org!';
                    reject(err)
                    }
                }
                if (userOrgs.length >= 2) {
                    console.log('only two orgrs')
                    let err = 'You can only save 2 organizations to favorites right now.';
                    reject(err)
                }
                console.log('you passed the test')
                resolve()
            }
        )
    }

    addToUserOrgs() {
        // console.log('add to user org')
        return this.querySvc.getUserOrgs([this.user.uuid])
            .then((userOrgs) => this.canAddOrg(userOrgs))
            .then(() => this.querySvc.insertUserOrgs([this.user.uuid, this.org]))
            .then(() => {
                // console.log('success?')
                return null
            })
            .catch((e) => e)
    }
}