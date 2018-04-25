"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var payPalInfo = {
    name: 'payPal',
    percent: .029,
    fixed: .30,
    max: null
};
var achInfo = {
    name: 'ach',
    percent: .008,
    fixed: 0,
    max: 5
};
var aliPayInfo = {
    name: 'aliPay',
    percent: .029,
    fixed: .30,
    max: null
};
var googlePlayInfo = {
    name: 'googlePlay',
    percent: 0.30,
    fixed: 0,
    max: null
};
var stripeInfo = {
    name: 'payPal',
    percent: .029,
    fixed: .30,
    max: null
};
var Cut = /** @class */ (function () {
    function Cut(obj) {
        this.name = obj.name;
        this.percent = obj.percent;
        this.fixed = obj.fixed;
        this.max = obj.max;
        this.sylPercent = .30,
            this.sylStatic = 0;
    }
    Cut.prototype.orgCut = function (total) {
        var transCut = this.transactionCut(total);
        var revenue = this.revenue(total);
        var withTransCut = total - transCut;
        var orgTotal = total - (transCut + revenue);
        var obj = {
            total: total,
            transPercent: this.percent * total,
            transCut: transCut,
            sylPercent: this.sylPercent * total,
            revenue: revenue,
            withTransCut: withTransCut,
            withAllCuts: orgTotal
        };
        console.log(obj);
        if (withTransCut < 0) {
            throw Error('Total not enough to pay transactor: $' + Number((orgTotal).toFixed(3)));
        }
        else if (orgTotal < 0) {
            throw Error('Total not enough to cover costs: $' + Number((orgTotal).toFixed(3)));
        }
        else {
            return Number((orgTotal).toFixed(3));
        }
    };
    Cut.prototype.revenue = function (total) {
        var sylSubTotal = (this.sylPercent * total) + this.sylStatic;
        return sylSubTotal;
    };
    Cut.prototype.transactionCut = function (total) {
        var transCut = (this.percent * total) + this.fixed;
        return transCut;
    };
    return Cut;
}());
var payPal = new Cut(payPalInfo);
exports.payPal = payPal;
var ach = new Cut(achInfo);
exports.ach = ach;
var aliPay = new Cut(aliPayInfo);
exports.aliPay = aliPay;
var googlePlay = new Cut(googlePlayInfo);
exports.googlePlay = googlePlay;
var stripe = new Cut(stripeInfo);
exports.stripe = stripe;
//# sourceMappingURL=transaction-helpers.js.map