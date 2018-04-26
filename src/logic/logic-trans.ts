import {
    payPal,
    ach,
    aliPay,
    googlePlay,
    stripe
} from '../services/transaction-helpers';
import * as E from '../services/error-handling';
import * as R from '../services/value-objects';
import * as V from '../services/validation';
import QuerySvc from '../data-access/queries';


export default class TransSvc {
    querySvc:QuerySvc;
    user:R.UserSession;
    events:{
        snoozes:any,
        wakes:any,
        dismisses:any
    }
    totalEvents: number;
    activeOrg: V.UUID;
    active_payment: V.UUID;
    trans_uuid: V.UUID;
    org_trans_total: number;
    revenue: number;
    total: number;

    constructor(querySvc, user) {
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

    getUnpaidEvents() {
        return this.querySvc.getUnpaidSnoozes([this.user.uuid, false])
            .then(snoozes => {
                this.events.snoozes = snoozes
                return this.querySvc.getUnpaidWakes([this.user.uuid, false])
            })
            .then(wakes => {
                this.events.wakes = wakes
                return this.querySvc.getUnpaidDismisses([this.user.uuid, false])
            })
            .then(dismisses=> {
                this.events.dismisses = dismisses
                return null
            })
    }

    getTotalCost() {
        return this.querySvc.getUserSettings([this.user.uuid])
            .then(settings => {
                let snoozePrice = parseFloat(settings.snooze_price);
                let dismissPrice = parseFloat(settings.dismiss_price);
                let wakePrice = parseFloat(settings.wake_price);

                let snoozeTot = (snoozePrice * this.events.snoozes.length)
                let dismissTot = (dismissPrice * this.events.dismisses.length)
                let wakeTot = (wakePrice * this.events.wakes.length)
                this.total = (snoozeTot + dismissTot + wakeTot)

                this.org_trans_total = stripe.orgCut(this.total);
                this.revenue = stripe.revenue(this.total);
                return null;
            })
        
    }

    formatTransactionInput() {
        return [
            this.user.uuid,
            this.activeOrg,
            this.active_payment,
            this.events.snoozes.length,
            this.events.wakes.length,
            this.events.dismisses.length,
            this.total
        ]
    }

    updateEventsToPaid(trans_uuid) {
        let payArr = [];

        for (let i = 0; i < this.events.snoozes.length; i++) {
            let input = [true, this.events.snoozes[i].snooze_uuid]
            let promise = this.querySvc.updateSnoozeToPaid(input);
            payArr.push(promise)
        }

        for (let i = 0; i < this.events.dismisses.length; i++) {
            let input = [true, this.events.dismisses[i].dismiss_uuid]
            let promise = this.querySvc.updateDismissesToPaid(input);
            payArr.push(promise)
        }

        for (let i = 0; i < this.events.wakes.length; i++) {
            let input = [true, this.events.wakes[i].wakes_uuid]
            let promise = this.querySvc.updateWakesToPaid(input);
            payArr.push(promise)
        }

        return Promise.all(payArr)
    }

    transact() {
        return this.getUnpaidEvents()
            .then(() => {
                console.log('one')
                return this.querySvc.getActiveOrg([this.user.uuid, true])})
            .then(activeOrg => {
                this.activeOrg = activeOrg.org_uuid
                console.log('two', activeOrg)
                return this.getTotalCost()
            })
            .then(() => {console.log('three')
                return this.querySvc.getActiveFormOfPayment([this.user.uuid, true])})
            .then(activePayment => {
                console.log('four')
                this.active_payment = activePayment
                return this.formatTransactionInput()
            })
            .then(inputs => {
                console.log('five', inputs)
                return this.querySvc.insertTransaction(inputs)})
            .then(transaction => {
                console.log('six', transaction);
                this.trans_uuid = transaction.trans_uuid;
                return this.updateEventsToPaid(this.trans_uuid);
            })
            .then(() => {
                console.log('seven')
                return this.querySvc.insertOrgPayment([this.trans_uuid, this.user.uuid, this.activeOrg, this.org_trans_total, false])})
            .then(() => {
                console.log('eight')
                return this.querySvc.insertRevenue([this.trans_uuid, this.user.uuid, this.revenue])
            })
    }


}