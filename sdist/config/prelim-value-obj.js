import * as isUUID from 'is-uuid';
// CONCEPTS TO APPLY IN-MEETING
// classes map to value items
// static methods
// private values
// not using raw values for constructor
// validating that the correct properties are present in constructor classes
function emailValid(email) {
    var re = /^[A-Za-z0-9\._\$%\-]+@[A-Za-z0-9\-]+.[A-Za-z0-9]{2,6}$/;
    if (re.test(email)) {
        return email;
    }
    else {
        throw new Error('Not a real email.');
    }
}
function uuidValid(uuid) {
    if (isUUID.v4(uuid)) {
        return (uuid);
    }
    else {
        throw new Error('Not a real uuid.');
    }
}
function permissionValid(permission) {
    var re = /(guest)|(user)|(admin)/;
    if (re.test(permission)) {
        return permission;
    }
    else {
        throw new Error('Not a real permission');
    }
}
var UserSession = /** @class */ (function () {
    function UserSession(userSession) {
        this.email = emailValid(userSession.email);
        this.uuid = uuidValid(userSession.uuid);
        this.cart_uuid = uuidValid(userSession.cart_uuid);
        this.permission = permissionValid(userSession.permission);
    }
    return UserSession;
}());
//# sourceMappingURL=prelim-value-obj.js.map