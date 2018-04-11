"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var database_1 = require("../../middleware/database");
var router = express.Router();
//////////////
////////////// SHOW/CREATE USERS
//////////////
router.route('/accounts')
    .get(function (req, res) {
    var accountContent;
    var alarmContent;
    var alarmArray = [];
    var paymientContent;
    var paymentArray = [];
    var permission = false;
    if (req.session.user.permission === 'admin') {
        permission = true;
    }
    else {
        permission = false;
    }
    database_1.db.query("SELECT * FROM users", [])
        .then(function (result) {
        accountContent = result.rows;
        for (var i = 0; i < accountContent.length; i++) {
            alarmArray.push(database_1.db.query('SELECT * FROM alarms WHERE user_uuid = $1', [accountContent[i].user_uuid]));
        }
        return Promise.all(alarmArray);
    })
        .then(function (result) {
        for (var i = 0; i < result.length; i++) {
            accountContent[i].alarmContent = result[i].rows;
            for (var j = 0; j < accountContent[i].alarmContent.length; j++) {
                accountContent[i].alarmContent[j].permission = permission;
            }
        }
        for (var i = 0; i < accountContent.length; i++) {
            paymentArray.push(database_1.db.query('SELECT * FROM payment_credit WHERE user_uuid = $1', [accountContent[i].user_uuid]));
        }
        return Promise.all(paymentArray);
    })
        .then(function (result) {
        for (var i = 0; i < result.length; i++) {
            accountContent[i].paymentContent = result[i].rows;
            for (var j = 0; j < accountContent[i].paymentContent.length; j++) {
                accountContent[i].paymentContent[j].permission = permission;
                console.log(accountContent[i].paymentContent[j].permission);
            }
        }
        res.render('admin/accounts/accounts', {
            accountContent: accountContent,
        });
    })
        .catch(function (err) {
        console.log(err);
        res.render('error', {
            errName: err.message,
            errMessage: null
        });
    });
});
router.route('/accounts/:user_uuid')
    .delete(function (req, res) {
    var user_uuid = req.body.user_uuid;
    var query = 'DELETE FROM users WHERE user_uuid = $1';
    var input = [user_uuid];
    database_1.db.query(query, input)
        .then(function (result) {
        res;
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
});
////////////
//////////// EDIT/DELETE USER CONTACT
////////////
router.route('/accounts/:user_uuid/contact')
    .get(function (req, res) {
    var user_uuid = req.query.user_uuid;
    var permission = false;
    database_1.db.query("SELECT * FROM users WHERE user_uuid = $1", [user_uuid])
        .then(function (result) {
        var user = result.rows[0];
        if (req.session.user.permission === 'admin') {
            permission = true;
        }
        else {
            permission = false;
        }
        res.render('account/my-contact', {
            phone: user.phone,
            email: user.email,
            permission: permission,
            user_uuid: user_uuid
        });
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
})
    .put(function (req, res) {
    var email = req.body.a, phone = req.body.phone, user_uuid = req.body.user_uuid;
    var query = 'UPDATE users SET (email, phone) = ($1, $2) WHERE user_uuid = $3';
    var input = [email, phone, user_uuid];
    database_1.db.query(query, input)
        .then(function (result) {
        res.redirect('/admin/accounts');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
})
    .delete(function (req, res) {
    var user_uuid = req.body.user_uuid;
    database_1.db.query('DELETE FROM users WHERE user_uuid = $1', [user_uuid])
        .then(function (result) {
        res.redirect('/admin/accounts');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
});
////////////
//////////// EDIT/DELETE USER ALARM
////////////
router.route('/accounts/:user_uuid/alarms/:alarm_uuid')
    .get(function (req, res) {
    console.log('ALARM ACCOUNT ROUTE');
    var user_uuid = req.query.user_uuid;
    var alarm_uuid = req.query.alarm_uuid;
    var permission = false;
    var alarm;
    console.log(user_uuid, alarm_uuid, permission);
    database_1.db.query("SELECT * FROM alarms WHERE user_uuid = $1 AND alarm_uuid = $2", [user_uuid, alarm_uuid])
        .then(function (result) {
        alarm = result.rows[0];
        console.log(alarm);
        if (req.session.user.permission === 'admin') {
            permission = true;
        }
        else {
            permission = false;
        }
        res.render('alarms/edit-alarm', {
            title: alarm.title,
            awake: alarm.awake,
            active: alarm.active,
            alarm_uuid: alarm_uuid,
            permission: permission,
            user_uuid: user_uuid
        });
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
})
    .put(function (req, res) {
    var user_uuid = req.body.user_uuid;
    var alarm_uuid = req.body.alarm_uuid;
    var title = req.body.title;
    var awake = req.body.awake;
    var active = req.body.active;
    var query = 'UPDATE alarms SET (title, awake, active) = ($1, $2, $3) WHERE user_uuid = $4 AND alarm_uuid = $5';
    var input = [title, awake, active, user_uuid, alarm_uuid];
    database_1.db.query(query, input)
        .then(function (result) {
        res.redirect('/admin/accounts');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
})
    .delete(function (req, res) {
    var user_uuid = req.body.user_uuid;
    var alarm_uuid = req.body.alarm_uuid;
    database_1.db.query('DELETE FROM alarms WHERE user_uuid = $1 AND alarm_uuid =$2', [user_uuid, alarm_uuid])
        .then(function (result) {
        res.redirect('/admin/accounts');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
});
////////////
//////////// EDIT/DELETE USER PAYMENTS
////////////
router.route('/accounts/:user_uuid/payment/:card_number')
    .get(function (req, res) {
    var user_uuid = req.query.user_uuid;
    var card_number = req.query.card_number;
    var permission = false;
    var payment;
    console.log(user_uuid, card_number, permission);
    database_1.db.query("SELECT * FROM payment_credit WHERE user_uuid = $1 AND card_number = $2", [user_uuid, card_number])
        .then(function (result) {
        payment = result.rows[0];
        console.log(payment);
        if (req.session.user.permission === 'admin') {
            permission = true;
        }
        else {
            permission = false;
        }
        res.render('payment/edit-payment', {
            name: payment.name,
            card_number: payment.card_number,
            exp_date: payment.exp_date,
            exp_month: payment.exp_month,
            cvv: payment.cvv,
            address_1: payment.address_1,
            city: payment.city,
            state: payment.state,
            zip: payment.zip,
            user_uuid: user_uuid,
            permission: permission
        });
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
})
    .put(function (req, res) {
    var oldCard = req.body.oldCard;
    var inputs = {
        name: req.body.name,
        cardNumber: req.body.cardNumber,
        expDay: req.body.expDay,
        expMonth: req.body.expMonth,
        cvv: req.body.cvv,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
    };
    var user_uuid = req.body.user_uuid;
    var query = 'UPDATE payment_credit SET (card_number, name, exp_month, exp_date, cvv, address_1, city, state, zip) = ($1, $2, $3, $4, $5, $6, $7, $8, $9) WHERE user_uuid = $10 AND card_number = $11';
    var input = [inputs.cardNumber, inputs.name, inputs.expMonth, inputs.expDay, inputs.cvv, inputs.address, inputs.city, inputs.state, inputs.zip, user_uuid, oldCard];
    database_1.db.query(query, input)
        .then(function (result) {
        res.redirect('/admin/accounts');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
})
    .delete(function (req, res) {
    var user_uuid = req.body.user_uuid;
    var card_number = req.body.card_number;
    var query = 'DELETE FROM payment_credit WHERE user_uuid = $1 AND card_number =$2';
    var input = [req.session.user.uuid, card_number];
    database_1.db.query(query, input)
        .then(function (result) {
        res.redirect('/admin/accounts');
    })
        .catch(function (err) {
        console.log(err.stack);
        res.render('error', { dbError: err.stack });
    });
});
module.exports = router;
//# sourceMappingURL=admin-accounts.js.map