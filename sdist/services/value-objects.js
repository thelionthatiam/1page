"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
var validation_1 = require("./validation");
// THIS COULD LIVE SOMEWHERE ELSE
var ValidationResult = /** @class */ (function () {
    function ValidationResult() {
    }
    ValidationResult.isValid = function (args, obj) {
        for (var k in obj) {
            if (args.hasOwnProperty(k)) {
                var res = obj[k];
                if (!res.isOkay)
                    return res;
            }
            else {
                var message = 'MISSING PROPERTY: ' + k;
                throw new validation_1.ValidationError(null, message);
            }
        }
    };
    Object.defineProperty(ValidationResult.prototype, "isOkay", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    return ValidationResult;
}());
var UserSession = /** @class */ (function () {
    function UserSession(args) {
        if (args === void 0) { args = {}; }
        this.email = args.email;
        this.uuid = args.uuid;
        this.permission = args.permission;
        this.name = args.name;
    }
    UserSession.fromJSON = function (args) {
        var res = UserSession.validate(args);
        if (res.isOkay) {
            var res_1 = new UserSession({
                email: validation_1.Email.create(args.email),
                uuid: validation_1.UUID.create(args.uuid),
                permission: validation_1.Permission.create(args.permission),
                name: validation_1.CharOnly.create(args.name),
            });
            return res_1.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    };
    UserSession.validate = function (args) {
        var propValidation = {
            email: validation_1.Email.validate(args.email),
            uuid: validation_1.UUID.validate(args.uuid),
            permission: validation_1.Permission.validate(args.permission),
            name: validation_1.CharOnly.validate(args.name),
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    };
    UserSession.prototype.toJSON = function () {
        return {
            email: this.email.toString(),
            uuid: this.uuid.toString(),
            permission: this.permission.toString(),
            name: this.name.toString()
        };
    };
    return UserSession;
}());
exports.UserSession = UserSession;
var UserInputs = /** @class */ (function () {
    function UserInputs(args) {
        if (args === void 0) { args = {}; }
        this.email = args.email;
        this.phone = args.phone;
        this.name = args.name;
        this.password = args.password;
    }
    UserInputs.fromJSON = function (args) {
        var res = UserInputs.validate(args);
        if (res.isOkay) {
            var res_2 = new UserInputs({
                email: validation_1.Email.create(args.email),
                phone: validation_1.NumOnly.create(args.phone),
                name: validation_1.CharOnly.create(args.name),
                password: args.password
            });
            return res_2.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    };
    UserInputs.validate = function (args) {
        var propValidation = {
            email: validation_1.Email.validate(args.email),
            phone: validation_1.NumOnly.validate(args.phone),
            name: validation_1.CharOnly.validate(args.name),
            password: validation_1.String.validate(args.password)
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    };
    UserInputs.prototype.toJSON = function () {
        return {
            email: this.email.toString(),
            phone: this.phone.toString(),
            name: this.name.toString(),
            password: this.password.toString()
        };
    };
    return UserInputs;
}());
exports.UserInputs = UserInputs;
var UserDB = /** @class */ (function () {
    function UserDB(args) {
        if (args === void 0) { args = {}; }
        this.email = args.email;
        this.user_uuid = args.user_uuid;
        this.permission = args.permission;
        this.phone = args.phone;
        this.name = args.name;
        this.password = args.password;
    }
    UserDB.fromJSON = function (args) {
        var res = UserDB.validate(args);
        if (res.isOkay) {
            var res_3 = new UserDB({
                email: validation_1.Email.create(args.email),
                user_uuid: validation_1.UUID.create(args.user_uuid),
                permission: validation_1.Permission.create(args.permission),
                phone: validation_1.NumOnly.create(args.phone),
                name: validation_1.CharOnly.create(args.name),
                password: args.password
            });
            return res_3.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    };
    UserDB.validate = function (args) {
        var propValidation = {
            email: validation_1.Email.validate(args.email),
            user_uuid: validation_1.UUID.validate(args.user_uuid),
            permission: validation_1.Permission.validate(args.permission),
            phone: validation_1.NumOnly.validate(args.phone),
            name: validation_1.CharOnly.validate(args.name),
            password: validation_1.String.validate(args.password)
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    };
    UserDB.prototype.toJSON = function () {
        return {
            email: this.email.toString(),
            user_uuid: this.user_uuid.toString(),
            permission: this.permission.toString(),
            phone: this.phone.toString(),
            name: this.name.toString(),
            password: this.password.toString()
        };
    };
    return UserDB;
}());
exports.UserDB = UserDB;
var AuthInputs = /** @class */ (function () {
    function AuthInputs(args) {
        if (args === void 0) { args = {}; }
        this.email = args.email;
        this.password = args.password;
    }
    AuthInputs.fromJSON = function (args) {
        var res = AuthInputs.validate(args);
        if (res.isOkay) {
            var res_4 = new AuthInputs({
                email: validation_1.Email.create(args.email),
                password: args.password
            });
            return res_4.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    };
    AuthInputs.validate = function (args) {
        var propValidation = {
            email: validation_1.Email.validate(args.email),
            password: validation_1.String.validate(args.password)
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    };
    AuthInputs.prototype.toJSON = function () {
        return {
            email: this.email.toString(),
            password: this.password.toString()
        };
    };
    return AuthInputs;
}());
exports.AuthInputs = AuthInputs;
var UserOrgsDB = /** @class */ (function () {
    function UserOrgsDB(args) {
        if (args === void 0) { args = {}; }
        this.user_uuid = args.user_uuid;
        this.org_uuid = args.org_uuid;
        this.active = args.active;
    }
    UserOrgsDB.fromJSON = function (args) {
        var res = UserOrgsDB.validate(args);
        if (res.isOkay) {
            var res_5 = new UserOrgsDB({
                user_uuid: validation_1.UUID.create(args.user_uuid),
                org_uuid: validation_1.UUID.create(args.org_uuid),
                active: validation_1.Bool.create(args.active),
            });
            return res_5.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    };
    UserOrgsDB.validate = function (args) {
        var propValidation = {
            user_uuid: validation_1.UUID.validate(args.user_uuid),
            org_uuid: validation_1.UUID.validate(args.org_uuid),
            active: validation_1.Bool.validate(args.active),
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    };
    UserOrgsDB.prototype.toJSON = function () {
        return {
            user_uuid: this.user_uuid.toString(),
            org_uuid: this.org_uuid.toString(),
            active: this.active.toString(),
        };
    };
    return UserOrgsDB;
}());
exports.UserOrgsDB = UserOrgsDB;
var CartDB = /** @class */ (function () {
    function CartDB(args) {
        if (args === void 0) { args = {}; }
        this.user_uuid = args.user_uuid;
        this.cart_uuid = args.cart_uuid;
        this.card_number = args.card_number;
    }
    CartDB.fromJSON = function (args) {
        var res = CartDB.validate(args);
        if (res.isOkay) {
            var res_6 = new CartDB({
                user_uuid: validation_1.UUID.create(args.user_uuid),
                cart_uuid: validation_1.UUID.create(args.cart_uuid),
                card_number: validation_1.NumOnly.create(args.card_number),
            });
            return res_6.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    };
    CartDB.validate = function (args) {
        var propValidation = {
            user_uuid: validation_1.UUID.validate(args.user_uuid),
            cart_uuid: validation_1.UUID.validate(args.cart_uuid),
            card_number: validation_1.NumOnly.validate(args.card_number),
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    };
    CartDB.prototype.toJSON = function () {
        return {
            user_uuid: this.user_uuid.toString(),
            cart_uuid: this.cart_uuid.toString(),
            card_number: this.card_number.toString(),
        };
    };
    return CartDB;
}());
exports.CartDB = CartDB;
var OrgsDB = /** @class */ (function () {
    function OrgsDB(args) {
        if (args === void 0) { args = {}; }
        this.org_uuid = args.org_uuid;
        this.org_sku = args.org_sku;
        this.name = args.name;
        this.description = args.description;
        this.cause = args.cause;
        this.link = args.link;
        this.img = args.img;
    }
    OrgsDB.fromJSON = function (args) {
        var res = OrgsDB.validate(args);
        if (res.isOkay) {
            var res_7 = new OrgsDB({
                org_uuid: validation_1.UUID.create(args.org_uuid),
                org_sku: validation_1.String.create(args.org_sku),
                name: validation_1.CharOnly.create(args.name),
                description: validation_1.String.create(args.description),
                cause: validation_1.CharOnly.create(args.cause),
                link: validation_1.String.create(args.link),
                img: args.img
            });
            return res_7.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    };
    OrgsDB.validate = function (args) {
        var propValidation = {
            org_uuid: validation_1.UUID.validate(args.org_uuid),
            org_sku: validation_1.String.validate(args.org_sku),
            name: validation_1.CharOnly.validate(args.name),
            description: validation_1.String.validate(args.description),
            cause: validation_1.CharOnly.validate(args.cause),
            link: validation_1.String.validate(args.link),
            img: args.img
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    };
    OrgsDB.prototype.toJSON = function () {
        return {
            org_uuid: this.org_uuid.toString(),
            org_sku: this.org_sku.toString(),
            name: this.name.toString(),
            description: this.description.toString(),
            cause: this.cause.toString(),
            link: this.link.toString(),
            img: this.img.toString()
        };
    };
    return OrgsDB;
}());
exports.OrgsDB = OrgsDB;
var UserSettings = /** @class */ (function () {
    function UserSettings(args) {
        if (args === void 0) { args = {}; }
        this.user_uuid = args.user_uuid;
        this.payment_scheme = args.payment_scheme;
        this.snooze_price = args.snooze_price;
        this.dismiss_price = args.dismiss_price;
        this.wake_price = args.wake_price;
        this.month_max = args.month_max;
        this.snooze_max = args.snooze_max;
        this.active_payment = args.active_payment;
    }
    UserSettings.fromJSON = function (args) {
        var res = UserSettings.validate(args);
        if (res.isOkay) {
            var res_8 = new UserSettings({
                user_uuid: validation_1.UUID.create(args.user_uuid),
                payment_scheme: validation_1.String.create(args.payment_scheme),
                snooze_price: validation_1.NumOnly.create(args.snooze_price),
                dismiss_price: validation_1.NumOnly.create(args.dismiss_price),
                wake_price: validation_1.NumOnly.create(args.wake_price),
                month_max: validation_1.NumOnly.create(args.month_max),
                snooze_max: validation_1.NumOnly.create(args.snooze_max),
                active_payment: validation_1.UUID.create(args.active_payment)
            });
            return res_8.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    };
    UserSettings.validate = function (args) {
        var propValidation = {
            user_uuid: validation_1.UUID.validate(args.user_uuid),
            payment_scheme: validation_1.String.validate(args.payment_scheme),
            snooze_price: validation_1.NumOnly.validate(args.snooze_price),
            dismiss_price: validation_1.NumOnly.validate(args.dismiss_price),
            wake_price: validation_1.NumOnly.validate(args.wake_price),
            month_max: validation_1.NumOnly.validate(args.month_max),
            snooze_max: validation_1.NumOnly.validate(args.snooze_max),
            active_payment: validation_1.UUID.validate(args.active_payment)
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    };
    UserSettings.prototype.toJSON = function () {
        return {
            user_uuid: this.user_uuid.toString(),
            payment_scheme: this.payment_scheme.toString(),
            snooze_price: this.snooze_price.toString(),
            dismiss_price: this.dismiss_price.toString(),
            wake_price: this.wake_price.toString(),
            month_max: this.month_max.toString(),
            snooze_max: this.snooze_max.toString(),
            active_payment: this.active_payment.toString()
        };
    };
    return UserSettings;
}());
exports.UserSettings = UserSettings;
// THIS MAY HAVE BEEN USELESS 
var UserOrgsJoin = /** @class */ (function () {
    function UserOrgsJoin(args) {
        if (args === void 0) { args = {}; }
        this.org_uuid = args.org_uuid;
        this.user_uuid = args.user_uuid;
        this.org_sku = args.org_sku;
        this.name = args.name;
        this.description = args.description;
        this.cause = args.cause;
        this.link = args.link;
        this.img = args.img;
        this.active = args.active;
    }
    UserOrgsJoin.fromJSON = function (args) {
        var res = UserOrgsJoin.validate(args);
        if (res.isOkay) {
            var res_9 = new UserOrgsJoin({
                org_uuid: validation_1.UUID.create(args.org_uuid),
                user_uuid: validation_1.UUID.create(args.user_uuid),
                org_sku: args.org_sku,
                name: args.name,
                description: args.description,
                cause: args.cause,
                link: args.link,
                img: args.img,
                active: validation_1.Bool.create(args.active)
            });
            return res_9.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    };
    UserOrgsJoin.validate = function (args) {
        var propValidation = {
            org_uuid: validation_1.UUID.validate(args.org_uuid),
            user_uuid: validation_1.UUID.validate(args.user_uuid),
            org_sku: args.org_sku,
            name: args.name,
            description: args.description,
            cause: args.cause,
            link: args.link,
            img: args.img,
            active: validation_1.Bool.validate(args.active)
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    };
    UserOrgsJoin.prototype.toJSON = function () {
        return {
            user_uuid: this.user_uuid.toString(),
            org_sku: this.org_sku.toString(),
            name: this.name.toString(),
            description: this.description.toString(),
            cause: this.cause.toString(),
            link: this.link.toString(),
            img: this.img.toString(),
            active: this.active.toString(),
        };
    };
    return UserOrgsJoin;
}());
exports.UserOrgsJoin = UserOrgsJoin;
//# sourceMappingURL=value-objects.js.map