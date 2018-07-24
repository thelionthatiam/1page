"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
const validation_1 = require("./validation");
// THIS COULD LIVE SOMEWHERE ELSE
class ValidationResult {
    static isValid(args, obj) {
        for (let k in obj) {
            if (args.hasOwnProperty(k)) {
                let res = obj[k];
                if (!res.isOkay)
                    return res;
            }
            else {
                let message = 'MISSING PROPERTY: ' + k;
                throw new validation_1.ValidationError(null, message);
            }
        }
    }
    get isOkay() { return false; }
}
class UserSession {
    constructor(args = {}) {
        this.email = args.email;
        this.uuid = args.uuid;
        this.permission = args.permission;
        this.name = args.name;
    }
    static fromJSON(args) {
        let res = UserSession.validate(args);
        if (res.isOkay) {
            let res = new UserSession({
                email: validation_1.Email.create(args.email),
                uuid: validation_1.UUID.create(args.uuid),
                permission: validation_1.Permission.create(args.permission),
                name: validation_1.CharOnly.create(args.name),
            });
            return res.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    }
    static validate(args) {
        let propValidation = {
            email: validation_1.Email.validate(args.email),
            uuid: validation_1.UUID.validate(args.uuid),
            permission: validation_1.Permission.validate(args.permission),
            name: validation_1.CharOnly.validate(args.name),
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    }
    toJSON() {
        return {
            email: this.email.toString(),
            uuid: this.uuid.toString(),
            permission: this.permission.toString(),
            name: this.name.toString()
        };
    }
}
exports.UserSession = UserSession;
class UserInputs {
    constructor(args = {}) {
        this.email = args.email;
        this.phone = args.phone;
        this.name = args.name;
        this.password = args.password;
    }
    static fromJSON(args) {
        let res = UserInputs.validate(args);
        if (res.isOkay) {
            let res = new UserInputs({
                email: validation_1.Email.create(args.email),
                phone: validation_1.NumOnly.create(args.phone),
                name: validation_1.CharOnly.create(args.name),
                password: args.password
            });
            return res.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    }
    static validate(args) {
        let propValidation = {
            email: validation_1.Email.validate(args.email),
            phone: validation_1.NumOnly.validate(args.phone),
            name: validation_1.CharOnly.validate(args.name),
            password: validation_1.String.validate(args.password)
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    }
    toJSON() {
        return {
            email: this.email.toString(),
            phone: this.phone.toString(),
            name: this.name.toString(),
            password: this.password.toString()
        };
    }
}
exports.UserInputs = UserInputs;
class UserDB {
    constructor(args = {}) {
        this.email = args.email;
        this.user_uuid = args.user_uuid;
        this.permission = args.permission;
        this.phone = args.phone;
        this.name = args.name;
        this.password = args.password;
    }
    static fromJSON(args) {
        let res = UserDB.validate(args);
        if (res.isOkay) {
            let res = new UserDB({
                email: validation_1.Email.create(args.email),
                user_uuid: validation_1.UUID.create(args.user_uuid),
                permission: validation_1.Permission.create(args.permission),
                phone: validation_1.NumOnly.create(args.phone),
                name: validation_1.CharOnly.create(args.name),
                password: args.password
            });
            return res.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    }
    static validate(args) {
        let propValidation = {
            email: validation_1.Email.validate(args.email),
            user_uuid: validation_1.UUID.validate(args.user_uuid),
            permission: validation_1.Permission.validate(args.permission),
            phone: validation_1.NumOnly.validate(args.phone),
            name: validation_1.CharOnly.validate(args.name),
            password: validation_1.String.validate(args.password)
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    }
    toJSON() {
        return {
            email: this.email.toString(),
            user_uuid: this.user_uuid.toString(),
            permission: this.permission.toString(),
            phone: this.phone.toString(),
            name: this.name.toString(),
            password: this.password.toString()
        };
    }
}
exports.UserDB = UserDB;
class AlarmInputs {
    // readonly user_uuid?: UUID;
    constructor(args = {}) {
        this.title = args.title,
            this.time = args.time;
        // this.user_uuid = args.user_uuid
    }
    static fromJSON(args) {
        let res = AlarmInputs.validate(args);
        if (res.isOkay) {
            let res = new AlarmInputs({
                title: args.title,
                time: validation_1.MilitaryTime.create(args.time),
            });
            return res.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    }
    static validate(args) {
        let propValidation = {
            title: args.title,
            time: validation_1.MilitaryTime.validate(args.time),
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    }
    toJSON() {
        return {
            title: this.title.toString(),
            time: this.time.toString(),
        };
    }
}
exports.AlarmInputs = AlarmInputs;
class AlarmDB {
    constructor(args = {}) {
        this.title = args.title,
            this.time = args.time,
            this.user_uuid = args.user_uuid,
            this.alarm_uuid = args.alarm_uuid,
            this.active = args.active,
            this.state = args.state,
            this.mon = args.mon,
            this.tues = args.tues,
            this.wed = args.wed,
            this.thur = args.thur,
            this.fri = args.fri,
            this.sat = args.sat,
            this.sun = args.sun,
            // this.triggered =  args.triggered,
            this.repeat = args.repeat,
            this.archive = args.archive,
            this.snooze_tally = args.snooze_tally;
    }
    static fromJSON(args) {
        let res = AlarmDB.validate(args);
        if (res.isOkay) {
            let res = new AlarmDB({
                title: args.title,
                time: validation_1.MilitaryTime.create(args.time),
                user_uuid: validation_1.UUID.create(args.user_uuid),
                alarm_uuid: validation_1.UUID.create(args.alarm_uuid),
                active: validation_1.Bool.create(args.active),
                state: validation_1.AlarmState.create(args.state),
                mon: validation_1.Bool.create(args.mon),
                tues: validation_1.Bool.create(args.tues),
                wed: validation_1.Bool.create(args.wed),
                thur: validation_1.Bool.create(args.thur),
                fri: validation_1.Bool.create(args.fri),
                sat: validation_1.Bool.create(args.sat),
                sun: validation_1.Bool.create(args.sun),
                // triggered: Bool.create(args.triggered),
                repeat: validation_1.Bool.create(args.repeat),
                archive: validation_1.Bool.create(args.archive),
                snooze_tally: validation_1.NumOnly.create(args.snooze_tally)
            });
            return res.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    }
    static validate(args) {
        let propValidation = {
            title: args.title,
            time: validation_1.MilitaryTime.validate(args.time),
            user_uuid: validation_1.UUID.validate(args.user_uuid),
            alarm_uuid: validation_1.UUID.validate(args.alarm_uuid),
            active: validation_1.Bool.validate(args.active),
            state: validation_1.AlarmState.validate(args.state),
            mon: validation_1.Bool.validate(args.mon),
            tues: validation_1.Bool.validate(args.tues),
            wed: validation_1.Bool.validate(args.wed),
            thur: validation_1.Bool.validate(args.thur),
            fri: validation_1.Bool.validate(args.fri),
            sat: validation_1.Bool.validate(args.sat),
            sun: validation_1.Bool.validate(args.sun),
            // triggered: Bool.validate(args.triggered),
            repeat: validation_1.Bool.validate(args.repeat),
            archive: validation_1.Bool.validate(args.archive),
            snooze_tally: validation_1.NumOnly.validate(args.snooze_tally)
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    }
    toJSON() {
        return {
            title: this.title.toString(),
            time: this.time.toString(),
            user_uuid: this.user_uuid.toString(),
            alarm_uuid: this.alarm_uuid.toString(),
            active: this.active.toString(),
            state: this.state.toString(),
            mon: this.mon.toString(),
            tues: this.tues.toString(),
            wed: this.wed.toString(),
            thur: this.thur.toString(),
            fri: this.fri.toString(),
            sat: this.sat.toString(),
            sun: this.sun.toString(),
            // triggered: this.triggered.toString(),
            repeat: this.repeat.toString(),
            archive: this.archive.toString(),
            snooze_tally: this.snooze_tally.toString()
        };
    }
}
exports.AlarmDB = AlarmDB;
class AuthInputs {
    constructor(args = {}) {
        this.email = args.email;
        this.password = args.password;
    }
    static fromJSON(args) {
        let res = AuthInputs.validate(args);
        if (res.isOkay) {
            let res = new AuthInputs({
                email: validation_1.Email.create(args.email),
                password: args.password
            });
            return res.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    }
    static validate(args) {
        let propValidation = {
            email: validation_1.Email.validate(args.email),
            password: validation_1.String.validate(args.password)
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    }
    toJSON() {
        return {
            email: this.email.toString(),
            password: this.password.toString()
        };
    }
}
exports.AuthInputs = AuthInputs;
class UserOrgsDB {
    constructor(args = {}) {
        this.user_uuid = args.user_uuid;
        this.org_uuid = args.org_uuid;
        this.active = args.active;
    }
    static fromJSON(args) {
        let res = UserOrgsDB.validate(args);
        if (res.isOkay) {
            let res = new UserOrgsDB({
                user_uuid: validation_1.UUID.create(args.user_uuid),
                org_uuid: validation_1.UUID.create(args.org_uuid),
                active: validation_1.Bool.create(args.active),
            });
            return res.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    }
    static validate(args) {
        let propValidation = {
            user_uuid: validation_1.UUID.validate(args.user_uuid),
            org_uuid: validation_1.UUID.validate(args.org_uuid),
            active: validation_1.Bool.validate(args.active),
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    }
    toJSON() {
        return {
            user_uuid: this.user_uuid.toString(),
            org_uuid: this.org_uuid.toString(),
            active: this.active.toString(),
        };
    }
}
exports.UserOrgsDB = UserOrgsDB;
class CartDB {
    constructor(args = {}) {
        this.user_uuid = args.user_uuid;
        this.cart_uuid = args.cart_uuid;
        this.card_number = args.card_number;
    }
    static fromJSON(args) {
        let res = CartDB.validate(args);
        if (res.isOkay) {
            let res = new CartDB({
                user_uuid: validation_1.UUID.create(args.user_uuid),
                cart_uuid: validation_1.UUID.create(args.cart_uuid),
                card_number: validation_1.NumOnly.create(args.card_number),
            });
            return res.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    }
    static validate(args) {
        let propValidation = {
            user_uuid: validation_1.UUID.validate(args.user_uuid),
            cart_uuid: validation_1.UUID.validate(args.cart_uuid),
            card_number: validation_1.NumOnly.validate(args.card_number),
        };
        ValidationResult.isValid(args, propValidation);
        return { isOkay: true };
    }
    toJSON() {
        return {
            user_uuid: this.user_uuid.toString(),
            cart_uuid: this.cart_uuid.toString(),
            card_number: this.card_number.toString(),
        };
    }
}
exports.CartDB = CartDB;
class OrgsDB {
    constructor(args = {}) {
        this.org_uuid = args.org_uuid;
        this.org_sku = args.org_sku;
        this.name = args.name;
        this.description = args.description;
        this.cause = args.cause;
        this.link = args.link;
        this.img = args.img;
    }
    static fromJSON(args) {
        let res = OrgsDB.validate(args);
        if (res.isOkay) {
            let res = new OrgsDB({
                org_uuid: validation_1.UUID.create(args.org_uuid),
                org_sku: validation_1.String.create(args.org_sku),
                name: validation_1.CharOnly.create(args.name),
                description: validation_1.String.create(args.description),
                cause: validation_1.CharOnly.create(args.cause),
                link: validation_1.String.create(args.link),
                img: args.img
            });
            return res.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    }
    static validate(args) {
        let propValidation = {
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
    }
    toJSON() {
        return {
            org_uuid: this.org_uuid.toString(),
            org_sku: this.org_sku.toString(),
            name: this.name.toString(),
            description: this.description.toString(),
            cause: this.cause.toString(),
            link: this.link.toString(),
            img: this.img.toString()
        };
    }
}
exports.OrgsDB = OrgsDB;
class UserSettings {
    constructor(args = {}) {
        this.user_uuid = args.user_uuid;
        this.payment_scheme = args.payment_scheme;
        this.snooze_price = args.snooze_price;
        this.dismiss_price = args.dismiss_price;
        this.wake_price = args.wake_price;
        this.month_max = args.month_max;
        this.snooze_max = args.snooze_max;
        this.active_payment = args.active_payment;
    }
    static fromJSON(args) {
        let res = UserSettings.validate(args);
        if (res.isOkay) {
            let res = new UserSettings({
                user_uuid: validation_1.UUID.create(args.user_uuid),
                payment_scheme: validation_1.String.create(args.payment_scheme),
                snooze_price: validation_1.NumOnly.create(args.snooze_price),
                dismiss_price: validation_1.NumOnly.create(args.dismiss_price),
                wake_price: validation_1.NumOnly.create(args.wake_price),
                month_max: validation_1.NumOnly.create(args.month_max),
                snooze_max: validation_1.NumOnly.create(args.snooze_max),
                active_payment: validation_1.UUID.create(args.active_payment)
            });
            return res.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    }
    static validate(args) {
        let propValidation = {
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
    }
    toJSON() {
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
    }
}
exports.UserSettings = UserSettings;
// THIS MAY HAVE BEEN USELESS 
class UserOrgsJoin {
    constructor(args = {}) {
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
    static fromJSON(args) {
        let res = UserOrgsJoin.validate(args);
        if (res.isOkay) {
            let res = new UserOrgsJoin({
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
            return res.toJSON();
        }
        else {
            throw new Error('error happens at fromJSON');
        }
    }
    static validate(args) {
        let propValidation = {
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
    }
    toJSON() {
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
    }
}
exports.UserOrgsJoin = UserOrgsJoin;
//# sourceMappingURL=value-objects.js.map