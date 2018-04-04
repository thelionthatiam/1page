import * as R from '../services/value-objects';
import * as V from '../services/validation';

export class OrgSvc {
    orgClient : Client; // this is wrong
    insertUserOrgs: Client;
    user: R.UserSession;
    org: V.UUID;


    constructor(orgClient, user, org) {
        this.orgClient = orgClient;
        this.user = user;
        this.org = org;
    }

    selectOrgs() {
        console.log('selectOrgs')
        return this.orgClient.selectUserOrgs([this.user.uuid])
    }

    insertOrgs() {
        console.log('insertOrgs')
        return this.orgClient.insertUserOrgs([this.user.uuid, this.org])
    }

    canAddOrg(userOrgs) {
        console.log('canAddOrg')
        return new Promise (
            (resolve, reject) => {
                for (let i = 0; i < userOrgs.length; i++) {
                    if (userOrgs[i].org_uuid === this.org) {
                    let err = 'You have already added this org!';
                    reject(err)
                    }
                }
                if (userOrgs.length >= 2) {
                    let err = 'You can only save 2 organizations to favorites right now.';
                    reject(err)
                }
                resolve()
            }
        )
    }

    addToUserOrgs() {
        console.log('addToUserOrgs')
        return new Promise (
            (resolve, reject) => {
                this.selectOrgs()
                    .then((userOrgs) => this.canAddOrg(userOrgs))
                    .then(() => this.insertOrgs())
                    .then(() => resolve())
                    .catch((e) => reject(e))
            }
        )
        
    }
}