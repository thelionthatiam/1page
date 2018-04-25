"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var R = require("../services/value-objects");
// import * as mailer from '../../middleware/emailer'
var trans = express.Router();
// router.use('/transact', mailer.mailer())
trans.route('/')
    .get(function (req, res) {
    console.log('testing get trans');
    res.redirect('/app/accounts');
})
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
    res.redirect('/app/accounts');
    // req.querySvc.getUnpaidSnoozes([user.uuid, false])
    // .then((result) => {
    //   console.log('|||||||||||||||||', 'get unpaid snoozes', result.rows)
    //   console.log('|||||||||||||||||','snoozes', result.rowCount)
    //   snoozes = result.rowCount
    //   unpaidSnoozes = result.rows
    //   return req.querySvc.getUnpaidDismisses([user.uuid, false])
    // })
    // .then((result) => {
    //   console.log('|||||||||||||||||','dismisses', result.rowCount)
    //   dismisses = result.rowCount
    //   unpaidDismisses = result.rows
    //   return req.querySvc.getUnpaidWakes([user.uuid, false])
    // })
    // .then((result) => {
    //   console.log('|||||||||||||||||','wakes', result.rowCount)
    //   wakes = result.rowCount
    //   unpaidWakes = result.rows
    //   return req.querySvc.getUserOrgs([user.uuid])
    // })
    // .then((result) => {
    //   recipient = result.org_uuid;
    //   return req.querySvc.getUserSettings([user.uuid])
    // })
    // .then((result) => {
    //   let settings = R.UserSettings.fromJSON(result.rows[0])
    //   snoozePrice = parseFloat(settings.snooze_price);
    //   dismissPrice = parseFloat(settings.dismiss_price);
    //   wakePrice = parseFloat(settings.wake_price);
    //   snoozeTot = (snoozePrice * snoozes)
    //   dismissTot = (dismissPrice * dismisses)
    //   wakeTot = (wakePrice * wakes)
    //   total = ( snoozeTot + dismissTot + wakeTot )
    //   org_trans_total = stripe.orgCut(total);
    //   revenue = stripe.revenue(total);
    //   let inputs = [
    //         user.uuid,
    //         recipient,
    //         settings.active_payment,
    //         snoozes,
    //         dismisses,
    //         wakes,
    //         total
    //       ]
    //   return req.querySvc.insertTransaction(inputs)
    // })
    // .then((result) => {
    //   trans_uuid = result.rows[0].trans_uuid // could just return trans_uuid
    //   let payArr = [];
    //   for (let i = 0; i < unpaidSnoozes.length; i++ ) {
    //     let input = [ true, unpaidSnoozes[i].snooze_uuid]
    //     let promise = req.querySvc.updateSnoozeToPaid(input);
    //     payArr.push(promise)
    //   }
    //   for (let i = 0; i < unpaidDismisses.length; i++ ) {
    //     let input = [ true, unpaidDismisses[i].dismiss_uuid]
    //     let promise = req.querySvc.updateDismissesToPaid(input);
    //     payArr.push(promise)
    //   }
    //   for (let i = 0; i < unpaidWakes.length; i++ ) {
    //     let input = [ true, unpaidWakes[i].wakes_uuid]
    //     let promise = req.querySvc.updateWakesToPaid(input);
    //     payArr.push(promise)
    //   }
    //   return Promise.all(payArr)
    // })
    // .then((info) => { // why info?
    //   return req.querySvc.insertOrgPayment([trans_uuid, user.uuid, recipient, org_trans_total, false])
    // })
    // .then((result) => {
    //   return req.querySvc.insertRevenue([trans_uuid, user.uuid, revenue])
    // })
    // .then(() => res.redirect('/app/account'))
    // .catch((error) => {
    //   console.log(error)
    //   throw new Error('there was an error: ' + error)
    // })
});
trans.route('/pay-org')
    .post(function (req, res) {
    var user = R.UserSession.fromJSON(req.session.user);
    var recipient;
    req.querySvc.getUserOrgs([user.uuid]) // this probably won't work anymore
        .then(function (result) {
        for (var i = 0; i < result.rows.length; i++) {
            var org = R.UserOrgsDB.fromJSON(result.rows[i]);
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
exports.default = trans;
// set paid to true
//# sourceMappingURL=user-trans.js.map