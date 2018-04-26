"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var transaction_helpers_1 = require("../services/transaction-helpers");
var R = require("../services/value-objects");
// import * as mailer from '../../middleware/emailer'
var trans = express.Router();
// router.use('/transact', mailer.mailer())
trans.route('/')
    .post(function (req, res) {
    console.log('|||||||||||||||||', 'transaction started');
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
    var user = R.UserSession.fromJSON(req.session.user);
    req.querySvc.getUnpaidSnoozes([user.uuid, false])
        .then(function (result) {
        console.log('|||||||||||||||||', 'get unpaid snoozes', result.rows);
        console.log('|||||||||||||||||', 'snoozes', result.rowCount);
        snoozes = result.rowCount;
        unpaidSnoozes = result.rows;
        console.log(req.querySvc);
        return req.querySvc.getUnpaidDismisses([user.uuid, false]);
    })
        .then(function (result) {
        console.log('|||||||||||||||||', 'dismisses', result.rowCount);
        dismisses = result.rowCount;
        unpaidDismisses = result.rows;
        return req.querySvc.getUnpaidWakes([user.uuid, false]);
    })
        .then(function (result) {
        console.log('|||||||||||||||||', 'wakes', result.rowCount);
        wakes = result.rowCount;
        unpaidWakes = result.rows;
        return req.querySvc.getActiveOrg([user.uuid, true]);
    })
        .then(function (activeOrg) {
        recipient = activeOrg.org_uuid;
        console.log('|||||||||||||||||', recipient);
        return req.querySvc.getUserSettings([user.uuid]);
    })
        .then(function (settings) {
        snoozePrice = parseFloat(settings.snooze_price);
        dismissPrice = parseFloat(settings.dismiss_price);
        wakePrice = parseFloat(settings.wake_price);
        snoozeTot = (snoozePrice * snoozes);
        dismissTot = (dismissPrice * dismisses);
        wakeTot = (wakePrice * wakes);
        total = (snoozeTot + dismissTot + wakeTot);
        org_trans_total = transaction_helpers_1.stripe.orgCut(total);
        revenue = transaction_helpers_1.stripe.revenue(total);
        return req.querySvc.getActiveFormOfPayment([user.uuid, true]);
    })
        .then(function (active_payment) {
        var inputs = [
            user.uuid,
            recipient,
            active_payment,
            snoozes,
            dismisses,
            wakes,
            total
        ];
        console.log('|||||||||||||||||', inputs);
        return req.querySvc.insertTransaction(inputs);
    })
        .then(function (result) {
        trans_uuid = result.rows[0].trans_uuid; // could just return trans_uuid
        console.log('|||||||||||||||||||', result.rows[0]);
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
        .then(function () { return res.redirect('/app/account'); })
        .catch(function (error) {
        console.log(error);
        throw new Error('there was an error: ' + error);
    });
});
// trans.route('/pay-org')
//   .post((req, res) => {
//     let user = R.UserSession.fromJSON(req.session.user);
//     let recipient:UUID;
//     req.querySvc.getUserOrgs([user.uuid]) // this probably won't work anymore
//       .then((result) => {
//         for (let i = 0; i < result.rows.length; i++) {
//           let org = R.UserOrgsDB.fromJSON(result.rows[i])
//           if (org.active) {
//             recipient = org.org_uuid;
//           }
//         }
//         return req.querySvc.getPendingPayments([recipient, false])
//       })
//       .then((result) => {
//         let total:number;
//         let unPaidTransactions:UUID[];
//         for (let i = 0; i < result.rows.length; i++) {
//           unPaidTransactions.push(req.querySvc.updateOrgToPaid([true, result.rows[i].recipient]))
//           total = total + result.rows[i].org_trans_total;
//         }
//         console.log(total)
//         if (total > 5.00) { // determine threshold for sending money to org
//           return Promise.all(unPaidTransactions)
//         }
//       })
//       .then((result) => {
//         res.redirect('/accounts/' + req.session.user.email + '/alarms')
//       })
//       .catch((error) => {
//         console.log(error)
//         res.redirect('/accounts/' + req.session.user.email + '/alarms')
//       })
//   })
exports.default = trans;
// set paid to true
//# sourceMappingURL=user-trans.js.map