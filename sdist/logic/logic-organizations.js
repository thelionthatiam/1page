"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrgSvc = /** @class */ (function () {
    function OrgSvc(orgClient, user, org) {
        this.orgClient = orgClient;
        this.user = user;
        this.org = org;
    }
    OrgSvc.prototype.selectOrgs = function () {
        console.log('selectOrgs');
        return this.orgClient.selectUserOrgs([this.user.uuid]);
    };
    OrgSvc.prototype.insertOrgs = function () {
        console.log('insertOrgs');
        return this.orgClient.insertUserOrgs([this.user.uuid, this.org]);
    };
    OrgSvc.prototype.canAddOrg = function (userOrgs) {
        var _this = this;
        console.log('canAddOrg');
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < userOrgs.length; i++) {
                if (userOrgs[i].org_uuid === _this.org) {
                    var err = 'You have already added this org!';
                    reject(err);
                }
            }
            if (userOrgs.length >= 2) {
                var err = 'You can only save 2 organizations to favorites right now.';
                reject(err);
            }
            resolve();
        });
    };
    OrgSvc.prototype.addToUserOrgs = function () {
        var _this = this;
        console.log('addToUserOrgs');
        return new Promise(function (resolve, reject) {
            _this.selectOrgs()
                .then(function (userOrgs) { return _this.canAddOrg(userOrgs); })
                .then(function () { return _this.insertOrgs(); })
                .then(function () { return resolve(); })
                .catch(function (e) { return reject(e); });
        });
    };
    return OrgSvc;
}());
exports.OrgSvc = OrgSvc;
//# sourceMappingURL=logic-organizations.js.map