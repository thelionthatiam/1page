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
    active:boolean;    
}

interface OrgRender extends Org {
    email?:V.Email;
    user_orgs?:boolean;
    loggedIn?:boolean;
}


interface ActiveOrgRender extends Org {
    defaultSet:boolean;
}


export default class OrgSvc {
    querySvc:QuerySvc;
    user: R.UserSession;
    org: V.UUID;
    userOrgData: Org[];
    userOrgRenderObjs: OrgRender[];
    activeOrgRenderObj: ActiveOrgRender;

    constructor(querySvc, user, org) {
        this.user = user;
        this.org = org;
        this.querySvc = querySvc;
        this.userOrgData;
        this.userOrgRenderObjs;
        this.activeOrgRenderObj;
    }

    canAddOrg(userOrgs:Org[]) {
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
        return this.querySvc.getUserOrgs([this.user.uuid])
            .then((userOrgs) => this.canAddOrg(userOrgs))
            .then(() => this.querySvc.insertUserOrg([this.user.uuid, this.org]))
            .then(() => null)
            .catch((e) => e)
    }

    activeOrgRender(ActiveOrg:Org) {
        return {
            defaultSet: true,
            active: true,
            name: ActiveOrg.name,
            description: ActiveOrg.description,
            link: ActiveOrg.link,
            cause: ActiveOrg.cause,
            img: ActiveOrg.img,
            org_uuid: ActiveOrg.org_uuid,
            org_sku: ActiveOrg.org_sku
        }
    }

    userOrgRenderAdditions() {
        this.userOrgRenderObjs = this.userOrgData
        for (let i = 0; i < this.userOrgRenderObjs.length; i++) {
          this.userOrgRenderObjs[i].email = this.user.email;
          this.userOrgRenderObjs[i].user_orgs = true;
          this.userOrgRenderObjs[i].loggedIn = this.user.permission === 'user' ? true : false; // substitute for res.locals
          if (this.userOrgData[i].active) {
            this.activeOrgRenderObj = this.activeOrgRender(this.userOrgRenderObjs[i]) 
          }
        }
    }

    formatRenderObj() {
        if (this.activeOrgRenderObj) {
            return {
                organizationContent:this.userOrgRenderObjs,
                email: this.user.email,
                name:this.activeOrgRenderObj.name,
                description:this.activeOrgRenderObj.description,
                cause:this.activeOrgRenderObj.cause,
                link:this.activeOrgRenderObj.link,
                defaultSet:this.activeOrgRenderObj.defaultSet,
                img:this.activeOrgRenderObj.img,
                uuid:this.activeOrgRenderObj.org_uuid
            }
        } else {
            return {
                organizationContent:this.userOrgRenderObjs,
                email:this.user.email
            }
        }
    }

    getUserOrgsAndActiveOrg() {
        return this.querySvc.getUserOrgData([this.user.uuid])
            .then(result => {
                this.userOrgData = result;
                this.userOrgRenderAdditions() // needs validation
                return this.formatRenderObj()
            })
            .catch(e => e)
    }

    // separate out from can add?

    alreadyAddedOrg(userOrgs:Org[]) {
        for (let i = 0;i < userOrgs.length; i++) {
            if (userOrgs[i].org_uuid === this.org) {
                return true;
            }
        }
        return false;
    }

    // separate out from can add?

    isActiveOrg(userOrgs:Org[]) {
        for (let i = 0;i < userOrgs.length; i++) {
            if (userOrgs[i].org_uuid === this.org && userOrgs[i].active) {
                return true;
            }
        }
        return false;
    }

    setDefaultOrg() {
        return this.querySvc.getUserOrgData([this.user.uuid])
            .then((userOrgs) => {
                if (this.alreadyAddedOrg(userOrgs)) {
                    console.log('org already added')
                    if (this.isActiveOrg(userOrgs)) {
                        let err = new Error ('This org is already your default!')
                        throw err;
                    } 
                    return false;
                } else {
                    console.log('org not added, adding')
                    return this.querySvc.insertUserOrg([this.user.uuid, this.org])
                }
            })
            .then(() => this.querySvc.updateAllUserOrgsToFalse([false, this.user.uuid]))
            .then(() => this.querySvc.updateActiveOrg([true, this.user.uuid, this.org]))
    }


    unsetDefaultOrg() {
        console.log('update default org')
        return this.querySvc.updateActiveOrg([false, this.user.uuid, this.org])
    }
}


