"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transaction_helpers_1 = require("../services/transaction-helpers");
var TransSvc = /** @class */ (function () {
    function TransSvc(querySvc, user) {
        this.user = user;
        this.querySvc = querySvc;
        this.events = {
            snoozes: [],
            wakes: [],
            dismisses: []
        };
        this.totalEvents = 0;
        this.activeOrg = '';
        // this.formatTransactionInput = this.formatTransactionInput.bind(this)
    }
    TransSvc.prototype.getUnpaidEvents = function () {
        var _this = this;
        return this.querySvc.getUnpaidSnoozes([this.user.uuid, false])
            .then(function (snoozes) {
            _this.events.snoozes = snoozes;
            return _this.querySvc.getUnpaidWakes([_this.user.uuid, false]);
        })
            .then(function (wakes) {
            _this.events.wakes = wakes;
            return _this.querySvc.getUnpaidDismisses([_this.user.uuid, false]);
        })
            .then(function (dismisses) {
            _this.events.dismisses = dismisses;
            return null;
        });
    };
    TransSvc.prototype.getTotalCost = function () {
        var _this = this;
        return this.querySvc.getUserSettings([this.user.uuid])
            .then(function (settings) {
            var snoozePrice = parseFloat(settings.snooze_price);
            var dismissPrice = parseFloat(settings.dismiss_price);
            var wakePrice = parseFloat(settings.wake_price);
            var snoozeTot = (snoozePrice * _this.events.snoozes.length);
            var dismissTot = (dismissPrice * _this.events.dismisses.length);
            var wakeTot = (wakePrice * _this.events.wakes.length);
            _this.total = (snoozeTot + dismissTot + wakeTot);
            _this.org_trans_total = transaction_helpers_1.stripe.orgCut(_this.total);
            _this.revenue = transaction_helpers_1.stripe.revenue(_this.total);
            return null;
        });
    };
    TransSvc.prototype.formatTransactionInput = function () {
        return [
            this.user.uuid,
            this.activeOrg,
            this.active_payment,
            this.events.snoozes.length,
            this.events.wakes.length,
            this.events.dismisses.length,
            this.total
        ];
    };
    TransSvc.prototype.updateEventsToPaid = function (trans_uuid) {
        var payArr = [];
        for (var i = 0; i < this.events.snoozes.length; i++) {
            var input = [true, this.events.snoozes[i].snooze_uuid];
            var promise = this.querySvc.updateSnoozeToPaid(input);
            payArr.push(promise);
        }
        for (var i = 0; i < this.events.dismisses.length; i++) {
            var input = [true, this.events.dismisses[i].dismiss_uuid];
            var promise = this.querySvc.updateDismissesToPaid(input);
            payArr.push(promise);
        }
        for (var i = 0; i < this.events.wakes.length; i++) {
            var input = [true, this.events.wakes[i].wakes_uuid];
            var promise = this.querySvc.updateWakesToPaid(input);
            payArr.push(promise);
        }
        return Promise.all(payArr);
    };
    TransSvc.prototype.transact = function () {
        var _this = this;
        return this.getUnpaidEvents()
            .then(function () {
            console.log('one');
            return _this.querySvc.getActiveOrg([_this.user.uuid, true]);
        })
            .then(function (activeOrg) {
            _this.activeOrg = activeOrg.org_uuid;
            console.log('two', activeOrg);
            return _this.getTotalCost();
        })
            .then(function () {
            console.log('three');
            return _this.querySvc.getActiveFormOfPayment([_this.user.uuid, true]);
        })
            .then(function (activePayment) {
            console.log('four');
            _this.active_payment = activePayment;
            return _this.formatTransactionInput();
        })
            .then(function (inputs) {
            console.log('five', inputs);
            return _this.querySvc.insertTransaction(inputs);
        })
            .then(function (transaction) {
            console.log('six', transaction);
            _this.trans_uuid = transaction.trans_uuid;
            return _this.updateEventsToPaid(_this.trans_uuid);
        })
            .then(function () {
            console.log('seven');
            return _this.querySvc.insertOrgPayment([_this.trans_uuid, _this.user.uuid, _this.activeOrg, _this.org_trans_total, false]);
        })
            .then(function () {
            console.log('eight');
            return _this.querySvc.insertRevenue([_this.trans_uuid, _this.user.uuid, _this.revenue]);
        });
    };
    return TransSvc;
}());
exports.default = TransSvc;
//# sourceMappingURL=logic-trans.js.map