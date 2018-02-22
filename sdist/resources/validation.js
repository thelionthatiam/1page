"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var isUUID = require("is-uuid");
var UserException = /** @class */ (function () {
    function UserException(name, message) {
        this.message = message;
        this.name = name.toUpperCase();
    }
    return UserException;
}());
exports.UserException = UserException;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(name, message) {
        var _this = _super.call(this, message) || this;
        Error.captureStackTrace(_this); // will creae a stack trace.
        _this.message = message;
        _this.name = name;
        return _this;
    }
    ValidationError.isOkay = function () {
        return false;
    };
    ValidationError.prototype.toJSON = function () {
        return {
            name: this.name,
            message: this.message
        };
    };
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
var ValueScalar = /** @class */ (function () {
    function ValueScalar(value) {
        this._value = value;
    }
    ValueScalar.prototype.valueOf = function () {
        return this._value;
    };
    ValueScalar.prototype.toString = function () {
        return this._value;
    };
    ValueScalar.prototype.toJSON = function () {
        return this._value;
    };
    return ValueScalar;
}());
exports.ValueScalar = ValueScalar;
var Email = /** @class */ (function (_super) {
    __extends(Email, _super);
    function Email() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Email.fromJSON = function (value) {
        return Email.create(value);
    };
    Email.create = function (value) {
        var res = Email.validate(value);
        if (!res.isOkay)
            throw res;
        return new Email(value);
    };
    Email.validate = function (email) {
        var re = /^[A-Za-z0-9\._\$%\-]+@[A-Za-z0-9\-]+.[A-Za-z0-9]{2,6}$/;
        if (re.test(email)) {
            return { isOkay: true };
        }
        else {
            return new ValidationError('invalid type', 'This value -- ' + email + ' -- is not an email.');
        }
    };
    return Email;
}(ValueScalar));
exports.Email = Email;
var Permission = /** @class */ (function (_super) {
    __extends(Permission, _super);
    function Permission() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Permission.fromJSON = function (value) {
        return Permission.create(value);
    };
    Permission.create = function (value) {
        var res = Permission.validate(value);
        if (!res.isOkay)
            throw res;
        return new Permission(value);
    };
    Permission.validate = function (permission) {
        var re = /^(guest)$|^(user)$|^(admin)$/;
        if (re.test(permission)) {
            return { isOkay: true };
        }
        else {
            throw new ValidationError('invalid type', 'This value -- ' + permission + ' -- is not a permission.');
        }
    };
    return Permission;
}(ValueScalar));
exports.Permission = Permission;
var CharOnly = /** @class */ (function (_super) {
    __extends(CharOnly, _super);
    function CharOnly() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CharOnly.fromJSON = function (value) {
        return CharOnly.create(value);
    };
    CharOnly.create = function (value) {
        var res = CharOnly.validate(value);
        if (!res.isOkay)
            throw res;
        return new CharOnly(value);
    };
    CharOnly.validate = function (charOnly) {
        var re = /^[a-zA-Z ]+$/;
        if (re.test(charOnly)) {
            return { isOkay: true };
        }
        else {
            throw new ValidationError('invalid type', 'This value -- ' + charOnly + ' -- is not only chars.');
        }
    };
    return CharOnly;
}(ValueScalar));
exports.CharOnly = CharOnly;
var NumOnly = /** @class */ (function (_super) {
    __extends(NumOnly, _super);
    function NumOnly() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumOnly.fromJSON = function (value) {
        return NumOnly.create(value);
    };
    NumOnly.create = function (value) {
        var res = NumOnly.validate(value);
        if (!res.isOkay)
            throw res;
        return new NumOnly(value);
    };
    NumOnly.validate = function (numOnly) {
        var re = /^[0-9.]+$/;
        if (re.test(numOnly)) {
            return { isOkay: true };
        }
        else {
            throw new ValidationError('invalid type', 'This value -- ' + numOnly + ' -- is not only numbers.');
        }
    };
    return NumOnly;
}(ValueScalar));
exports.NumOnly = NumOnly;
var UUID = /** @class */ (function (_super) {
    __extends(UUID, _super);
    function UUID() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UUID.fromJSON = function (value) {
        return UUID.create(value);
    };
    UUID.create = function (value) {
        var res = UUID.validate(value);
        if (!res.isOkay)
            throw res;
        return new UUID(value);
    };
    UUID.validate = function (uuid) {
        if (isUUID.v4(uuid)) {
            return { isOkay: true };
        }
        else {
            return new ValidationError('invalid type', 'This value -- ' + uuid + ' -- is not a uuid.');
        }
    };
    return UUID;
}(ValueScalar));
exports.UUID = UUID;
var Bool = /** @class */ (function (_super) {
    __extends(Bool, _super);
    function Bool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bool.fromJSON = function (value) {
        return Bool.create(value);
    };
    Bool.create = function (value) {
        var res = Bool.validate(value);
        if (!res.isOkay)
            throw res;
        return new Bool(value);
    };
    Bool.validate = function (boolean) {
        if (typeof boolean === 'boolean') {
            return { isOkay: true };
        }
        else {
            return new ValidationError('invalid type', 'This value -- ' + boolean + ' -- is not a boolean.');
        }
    };
    return Bool;
}(ValueScalar));
exports.Bool = Bool;
var String = /** @class */ (function (_super) {
    __extends(String, _super);
    function String() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    String.fromJSON = function (value) {
        return String.create(value);
    };
    String.create = function (value) {
        var res = String.validate(value);
        if (!res.isOkay)
            throw res;
        return new String(value);
    };
    String.validate = function (string) {
        var re = /.+/;
        if (re.test(string)) {
            return { isOkay: true };
        }
        else {
            return new ValidationError('invalid type', 'This value -- ' + string + ' -- is not a string.');
        }
    };
    return String;
}(ValueScalar));
exports.String = String;
//# sourceMappingURL=validation.js.map