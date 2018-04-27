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
    userOrgsData: Org[];
    userOrgRenderObjs: OrgRender[];
    activeOrgRenderObj: ActiveOrgRender;

    constructor(querySvc, user, org) {
        this.user = user;
        this.org = org;
        this.querySvc = querySvc;
        this.userOrgsData;
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

    userOrgRenderAdditions(orgs) {
        let renderVersion = []
        for (let i = 0; i < orgs.length; i++) {
            renderVersion[i] = orgs[i]
            renderVersion[i].email = this.user.email;
            renderVersion[i].user_orgs = true;
            renderVersion[i].loggedIn = this.user.permission === 'user' ? true : false; // substitute for res.locals
        }
        return renderVersion
    }

    activeOrgRender(ActiveOrg: Org) {
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

    activeOrgCheck(orgs) {
        for (let i = 0; i < orgs.length; i++) {
            if (orgs[i].active) {
                return this.activeOrgRender(orgs[i])
            }
        }
    }

    getUserOrgsAndActiveOrg() {
        return this.querySvc.getUserOrgsData([this.user.uuid])
            .then(orgs => {
                return {
                    organizationContent: this.userOrgRenderAdditions(orgs),
                    activeOrgContent: this.activeOrgCheck(orgs)
                }
            })
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
        return this.querySvc.getUserOrgsData([this.user.uuid])
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
        return this.querySvc.updateActiveOrg([false, this.user.uuid, this.org])
    }

    removeFromUserOrgs() {
        console.log('delete from user orgs', this.org, this)
        return this.querySvc.deleteFromUserOrgs([this.user.uuid, this.org])
    }
}


