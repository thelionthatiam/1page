import * as express from 'express';
import {
  payPal,
  ach,
  aliPay,
  googlePlay,
  stripe } from '../services/transaction-helpers';
import * as R from '../services/value-objects';
import * as V from '../services/validation'
// import * as mailer from '../../middleware/emailer'
const trans = express.Router();

// router.use('/transact', mailer.mailer())

trans.route('/')
  .post((req, res) => {
    console.log('|||||||||||||||||', 'transaction started')
    let dismisses: number;
    let unpaidDismisses: any;
    let dismissTot: number;
    let snoozes: number;
    let unpaidSnoozes: any;
    let snoozeTot: number;
    let wakes: number;
    let unpaidWakes: any;
    let wakeTot: number;
    let total: number;
    let payment_uuid: string;
    let recipient: V.UUID;
    let org_trans_total: number;
    let trans_uuid: V.UUID;
    let revenue: number;
    let snoozePrice: number;
    let dismissPrice: number;
    let wakePrice: number;

    let user = R.UserSession.fromJSON(req.session.user);
    req.querySvc.getUnpaidSnoozes([user.uuid, false])
      .then((result) => {
        console.log('|||||||||||||||||', 'get unpaid snoozes', result.rows)
        console.log('|||||||||||||||||', 'snoozes', result.rowCount)
        snoozes = result.rowCount
        unpaidSnoozes = result.rows
        console.log(req.querySvc)
        return req.querySvc.getUnpaidDismisses([user.uuid, false])
      })
      .then((result) => {
        console.log('|||||||||||||||||', 'dismisses', result.rowCount)
        dismisses = result.rowCount
        unpaidDismisses = result.rows
        return req.querySvc.getUnpaidWakes([user.uuid, false])
      })
      .then((result) => {
        console.log('|||||||||||||||||', 'wakes', result.rowCount)
        wakes = result.rowCount
        unpaidWakes = result.rows
        return req.querySvc.getActiveOrg([user.uuid, true])
      })
      .then((activeOrg) => {
        recipient = activeOrg.org_uuid;
        console.log('|||||||||||||||||', recipient)
        return req.querySvc.getUserSettings([user.uuid])
      })
      .then((settings) => {
        snoozePrice = parseFloat(settings.snooze_price);
        dismissPrice = parseFloat(settings.dismiss_price);
        wakePrice = parseFloat(settings.wake_price);

        snoozeTot = (snoozePrice * snoozes)
        dismissTot = (dismissPrice * dismisses)
        wakeTot = (wakePrice * wakes)
        total = (snoozeTot + dismissTot + wakeTot)

        org_trans_total = stripe.orgCut(total);
        revenue = stripe.revenue(total);
        return req.querySvc.getActiveFormOfPayment([user.uuid, true])
      })
      .then(active_payment => {
        let inputs = [
          user.uuid,
          recipient,
          active_payment,
          snoozes,
          dismisses,
          wakes,
          total
        ]
        console.log('|||||||||||||||||', inputs)
        return req.querySvc.insertTransaction(inputs)
      })
      .then((result) => {
        trans_uuid = result.rows[0].trans_uuid // could just return trans_uuid
        console.log('|||||||||||||||||||', result.rows[0])
        let payArr = [];

        for (let i = 0; i < unpaidSnoozes.length; i++) {
          let input = [true, unpaidSnoozes[i].snooze_uuid]
          let promise = req.querySvc.updateSnoozeToPaid(input);
          payArr.push(promise)
        }

        for (let i = 0; i < unpaidDismisses.length; i++) {
          let input = [true, unpaidDismisses[i].dismiss_uuid]
          let promise = req.querySvc.updateDismissesToPaid(input);
          payArr.push(promise)
        }

        for (let i = 0; i < unpaidWakes.length; i++) {
          let input = [true, unpaidWakes[i].wakes_uuid]
          let promise = req.querySvc.updateWakesToPaid(input);
          payArr.push(promise)
        }

        return Promise.all(payArr)
      })
      .then((info) => { // why info?
        return req.querySvc.insertOrgPayment([trans_uuid, user.uuid, recipient, org_trans_total, false])
      })
      .then((result) => {
        return req.querySvc.insertRevenue([trans_uuid, user.uuid, revenue])
      })
      .then(() => res.redirect('/app/account'))
      .catch((error) => {
        console.log(error)
        throw new Error('there was an error: ' + error)
      })

  })


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

export default trans;
// set paid to true
