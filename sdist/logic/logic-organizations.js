"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrgSvc = /** @class */ (function () {
    function OrgSvc(querySvc, user, org) {
        this.user = user;
        this.org = org;
        this.querySvc = querySvc;
    }
    OrgSvc.prototype.canAddOrg = function (userOrgs) {
        var _this = this;
        // console.log('canAddOrg')
        // console.log(userOrgs)
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < userOrgs.length; i++) {
                if (userOrgs[i].org_uuid === _this.org) {
                    console.log('already have');
                    var err = 'You have already added this org!';
                    reject(err);
                }
            }
            if (userOrgs.length >= 2) {
                console.log('only two orgrs');
                var err = 'You can only save 2 organizations to favorites right now.';
                reject(err);
            }
            console.log('you passed the test');
            resolve();
        });
    };
    OrgSvc.prototype.addToUserOrgs = function () {
        var _this = this;
        // console.log('add to user org')
        return this.querySvc.getUserOrgs([this.user.uuid])
            .then(function (userOrgs) { return _this.canAddOrg(userOrgs); })
            .then(function () { return _this.querySvc.insertUserOrgs([_this.user.uuid, _this.org]); })
            .then(function () {
            // console.log('success?')
            return null;
        })
            .catch(function (e) { return e; });
    };
    return OrgSvc;
}());
exports.default = OrgSvc;
//# sourceMappingURL=logic-organizations.js.map