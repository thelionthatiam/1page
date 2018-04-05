"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var transaction_calc_1 = require("../../functions/transaction-calc");
var r = require("../../resources/value-objects");
var mailer = require("../../middleware/emailer");
var router = express.Router();
router.use('/transact', mailer.mailer());
router.route('/transact')
    .post(function (req, res) {
    var dismisses;
    var unpaidDismisses;
    var dismissTot;
    var snoozes;
    var unpaidSnoozes;
    var snoozeTot;
    var wakes;
    var unpaidWakes;
    var wakeTot;
    var total;
    var payment_uuid;
    var recipient;
    var org_trans_total;
    var trans_uuid;
    var revenue;
    var snoozePrice;
    var dismissPrice;
    var wakePrice;
    var user = r.UserSession.fromJSON(req.session.user);
    req.querySvc.getUnpaidSnoozes([user.uuid, false])
        .then(function (result) {
        console.log('snoozes', result.rowCount);
        snoozes = result.rowCount;
        unpaidSnoozes = result.rows;
        return req.querySvc.getUnpaidDismisses([user.uuid, false]);
    })
        .then(function (result) {
        console.log('dismisses', result.rowCount);
        dismisses = result.rowCount;
        unpaidDismisses = result.rows;
        return req.querySvc.getUnpaidWakes([user.uuid, false]);
    })
        .then(function (result) {
        console.log('wakes', result.rowCount);
        wakes = result.rowCount;
        unpaidWakes = result.rows;
        return req.querySvc.getOrgsViaEmail([user.uuid]);
    })
        .then(function (result) {
        for (var i = 0; i < result.rows.length; i++) {
            var org = r.UserOrgsDB.fromJSON(result.rows[i]);
            if (org.active) {
                recipient = org.org_uuid;
            }
        }
        return req.querySvc.getSettingsViaEmail([user.uuid]);
    })
        .then(function (result) {
        var settings = r.UserSettings.fromJSON(result.rows[0]);
        snoozePrice = parseFloat(settings.snooze_price);
        dismissPrice = parseFloat(settings.dismiss_price);
        wakePrice = parseFloat(settings.wake_price);
        snoozeTot = (snoozePrice * snoozes);
        dismissTot = (dismissPrice * dismisses);
        wakeTot = (wakePrice * wakes);
        total = (snoozeTot + dismissTot + wakeTot);
        org_trans_total = transaction_calc_1.stripe.orgCut(total);
        revenue = transaction_calc_1.stripe.revenue(total);
        var inputs = [
            user.uuid,
            recipient,
            settings.active_payment,
            snoozes,
            dismisses,
            wakes,
            total
        ];
        return req.querySvc.insertTransaction(inputs);
    })
        .then(function (result) {
        trans_uuid = result.rows[0].trans_uuid;
        var payArr = [];
        for (var i = 0; i < unpaidSnoozes.length; i++) {
            var input = [true, unpaidSnoozes[i].snooze_uuid];
            var promise = req.querySvc.updateSnoozeToPaid(input);
            payArr.push(promise);
        }
        for (var i = 0; i < unpaidDismisses.length; i++) {
            var input = [true, unpaidDismisses[i].dismiss_uuid];
            var promise = req.querySvc.updateDismissesToPaid(input);
            payArr.push(promise);
        }
        for (var i = 0; i < unpaidWakes.length; i++) {
            var input = [true, unpaidWakes[i].wakes_uuid];
            var promise = req.querySvc.updateWakesToPaid(input);
            payArr.push(promise);
        }
        return Promise.all(payArr);
    })
        .then(function (info) {
        return req.querySvc.insertOrgPayment([trans_uuid, user.uuid, recipient, org_trans_total, false]);
    })
        .then(function (result) {
        return req.querySvc.insertRevenue([trans_uuid, user.uuid, revenue]);
    })
        .then(function (result) {
        var mail = {
            from: 'juliantheberge@gmail.com',
            to: 'fffff@mailinator.com',
            subject: 'Test',
            template: 'email/month-report',
            context: {
                snoozes: Math.trunc(snoozes),
                snoozePrice: snoozePrice,
                dismisses: Math.trunc(dismisses),
                dismissPrice: dismissPrice,
                wakes: Math.trunc(wakes),
                wakePrice: wakePrice,
                total: total,
                organization: recipient,
            }
        };
        return req.transporter.sendMail(mail);
    })
        .then(function (info) {
        console.log(info);
        res.redirect('/accounts/' + req.session.user.email + '/alarms');
    })
        .catch(function (error) {
        console.log(error);
        throw new Error('there was an error: ' + error);
    });
});
router.route('/pay-org')
    .post(function (req, res) {
    var user = r.UserSession.fromJSON(req.session.user);
    var recipient;
    req.querySvc.getOrgsViaEmail([user.uuid])
        .then(function (result) {
        for (var i = 0; i < result.rows.length; i++) {
            var org = r.UserOrgsDB.fromJSON(result.rows[i]);
            if (org.active) {
                recipient = org.org_uuid;
            }
        }
        return req.querySvc.getPendingPayments([recipient, false]);
    })
        .then(function (result) {
        var total;
        var unPaidTransactions;
        for (var i = 0; i < result.rows.length; i++) {
            unPaidTransactions.push(req.querySvc.updateOrgToPaid([true, result.rows[i].recipient]));
            total = total + result.rows[i].org_trans_total;
        }
        console.log(total);
        if (total > 5.00) {
            return Promise.all(unPaidTransactions);
        }
    })
        .then(function (result) {
        res.redirect('/accounts/' + req.session.user.email + '/alarms');
    })
        .catch(function (error) {
        console.log(error);
        res.redirect('/accounts/' + req.session.user.email + '/alarms');
    });
});
module.exports = router;
// set paid to true
//# sourceMappingURL=user-transactions.js.map