import * as express from 'express';
import SettingsSvc from '../logic/logic-settings';
const settings = express.Router();


// group routes
settings.route('/alarm-prices')
  .get((req, res) => {
    // validate user at session check
    req.SettingsSvc = new SettingsSvc(req.querySvc, req.session.user, null)
    req.SettingsSvc.getUserSettingsAndRender()
      .then((renderObj) => {
        res.render('settings/alarm-prices', renderObj)
      })
      .catch((error) => {
        console.log(error)
        res.render('error', { errMessage: error })
      })
    })
  .put((req, res) => {
  req.SettingsSvc = new SettingsSvc(req.querySvc, req.session.user, req.body)

  req.SettingsSvc.changeAlarmPrices()
    .then(() => {
      res.redirect('/app/accounts/' + req.session.user.email + '/settings/alarm-prices')
    })
    .catch((error) => {
      console.log(error)
      res.render('error', { errMessage: error })
    })
})

settings.route('/alarm-setting')
  .get((req, res) => {
    // validate user at session check
    req.SettingsSvc = new SettingsSvc(req.querySvc, req.session.user, null)
    req.SettingsSvc.getUserSettingsAndRender()
      .then((renderObj) => {
        res.render('settings/alarm-settings', renderObj)
      })
      .catch((error) => {
        console.log(error)
        res.render('error', { errMessage: error })
      })
  })
  .put((req, res) => {
    req.SettingsSvc = new SettingsSvc(req.querySvc, req.session.user, req.body)

    req.SettingsSvc.changeAlarmSettings()
      .then(() => {
        res.redirect('/app/accounts/' + req.session.user.email + '/settings/alarm-settings')
      })
      .catch((error) => {
        console.log(error)
        res.render('error', { errMessage: error })
      })
  })


// individual routes

settings.route('/')
  .get((req, res) => {
    // validate user at session check
    req.SettingsSvc = new SettingsSvc(req.querySvc, req.session.user, null)
    req.SettingsSvc.getUserSettingsAndRender()
      .then((renderObj) => {
        res.render('settings', renderObj)
      })
      .catch((error) => {
        console.log(error)
        res.render('error', { errMessage: error })
      })
  })


settings.put('/payment-scheme', (req, res) => {
  let inputs = { payment_scheme:req.body.payment_scheme }
  req.SettingsSvc = new SettingsSvc(req.querySvc, req.session.user, inputs)

  req.SettingsSvc.changePaymentScheme()
    .then(() => {
      res.redirect('/app/accounts/' + req.session.user.email + '/settings')
    })
    .catch((error) => {
      console.log(error)
      res.render('error', { errMessage:error })
    })
})

settings.put('/monthly-max', (req, res) => {
  let inputs = { month_max:req.body.month_max }
  req.SettingsSvc = new SettingsSvc(req.querySvc, req.session.user, inputs)

  req.SettingsSvc.changeMonthMax()
    .then(() => res.redirect('/app/accounts/' + req.session.user.email + '/settings'))
    .catch((error) => {
      console.log(error)
      res.render('error', { errMessage:error })
    })
})

settings.put('/price-per-snooze', (req, res) => {
  let inputs = { snooze_price:req.body.snooze_price }
  req.SettingsSvc = new SettingsSvc(req.querySvc, req.session.user, inputs)

  req.SettingsSvc.changePricePerSnooze()
    .then(() => res.redirect('/app/accounts/' + req.session.user.email + '/settings'))
    .catch((error) => {
      console.log(error)
      res.render('error', { errMessage:error })
    })
})


settings.put('/price-per-dismiss', (req, res) => {
  let inputs = { dismiss_price:req.body.dismiss_price }
  req.SettingsSvc = new SettingsSvc(req.querySvc, req.session.user, inputs)

  req.SettingsSvc.changePricePerDismiss()
    .then(() => res.redirect('/app/accounts/' + req.session.user.email + '/settings'))
    .catch((error) => {
      console.log(error)
      res.render('error', { errMessage:error })
    })
})

settings.put('/quiet-after', (req, res) => {
  req.SettingsSvc = new SettingsSvc(req.querySvc, req.session.user, req.body)

  req.SettingsSvc.changeQuietAfter()
    .then(() => res.redirect('/app/accounts/' + req.session.user.email + '/settings'))
    .catch((error) => {
      console.log(error)
      res.render('error', { errMessage: error })
    })
})

settings.put('/snooze-length', (req, res) => {
  req.SettingsSvc = new SettingsSvc(req.querySvc, req.session.user, req.body)

  req.SettingsSvc.changeSnoozeDuration()
    .then(() => res.redirect('/app/accounts/' + req.session.user.email + '/settings'))
    .catch((error) => {
      console.log(error)
      res.render('error', { errMessage: error })
    })
})

export default settings;

