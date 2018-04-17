"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_1 = require("../services/merge");
var SettingsSvc = /** @class */ (function () {
    function SettingsSvc(querySvc, user, inputs) {
        this.user = user;
        this.querySvc = querySvc;
        this.settingsRenderObj;
        this.inputs = inputs;
    }
    SettingsSvc.prototype.getUserSettingsAndRender = function () {
        var _this = this;
        return this.querySvc.getUserSettings([this.user.uuid])
            .then(function (result) {
            return merge_1.deepMerge(result, _this.user);
        });
    };
    SettingsSvc.prototype.changePaymentScheme = function () {
        return this.querySvc.updatePaymentScheme([this.inputs.payment_scheme, this.user.uuid]);
    };
    SettingsSvc.prototype.changeMonthMax = function () {
        var _this = this;
        return this.querySvc.getUserSettings([this.user.uuid])
            .then(function (result) {
            // this.settingsRenderObj = deepMerge(result, this.user)
            if (_this.inputs.month_max < result.dismiss_price) {
                throw new Error('You should probably select a monthly max that is more than the dismiss price');
            }
            else {
                return _this.querySvc.updateMonthMax([_this.inputs.month_max, _this.user.uuid]);
            }
        });
    };
    SettingsSvc.prototype.changePricePerSnooze = function () {
        var _this = this;
        return this.querySvc.getUserSettings([this.user.uuid])
            .then(function (result) {
            if (_this.inputs.snooze_price > result.dismiss_price) {
                throw new Error('You should probably select a snooze price that is less than the dismiss price');
            }
            else {
                return _this.querySvc.updatePricePerSnooze([_this.inputs.snooze_price, _this.user.uuid]);
            }
        });
    };
    SettingsSvc.prototype.changePricePerDismiss = function () {
        var _this = this;
        return this.querySvc.getUserSettings([this.user.uuid])
            .then(function (result) {
            if (_this.inputs.dismiss_price > result.month_max) {
                throw new Error('You should probably select a dismiss price that is less than the dismiss price');
            }
            else {
                return _this.querySvc.updatePricePerDismiss([_this.inputs.dismiss_price, _this.user.uuid]);
            }
        });
    };
    SettingsSvc.prototype.changeQuietAfter = function () {
        var _this = this;
        console.log('anew route', this.inputs);
        return this.querySvc.getUserSettings([this.user.uuid])
            .then(function (result) { return _this.querySvc.updateQuietAfter([_this.inputs.quiet_after, _this.user.uuid]); });
    };
    SettingsSvc.prototype.changeSnoozeDuration = function () {
        var _this = this;
        console.log('bnew route', this.inputs);
        return this.querySvc.getUserSettings([this.user.uuid])
            .then(function (result) { return _this.querySvc.updateSnoozeLength([_this.inputs.snooze_length, _this.user.uuid]); });
    };
    return SettingsSvc;
}());
exports.default = SettingsSvc;
//# sourceMappingURL=logic-settings.js.map