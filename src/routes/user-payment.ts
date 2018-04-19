import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as url from 'url';
import PaymentsSvc from '../logic/logic-payments'
const payment = express.Router();

payment.route('/')
  .get((req, res) => {
    req.PaymentsSvc = new PaymentsSvc(req.querySvc, req.session.user, null)
    req.PaymentsSvc.getFormsOfPayment()
      .then((paymentContent) => {
        res.render('payment/payments', {
          paymentContent:paymentContent,
        })
      })
      .catch((error) => {
        console.log(error)
        res.render('payment/payments', {dbError:error,})
      })
  })
  .post((req, res) => {
    req.PaymentsSvc = new PaymentsSvc(req.querySvc, req.session.user, req.body)

    req.PaymentsSvc.addNewFormOfPayment()
      .then(result =>
        res.redirect('/app/accounts/' + req.session.user.email + '/payment')
      )
      .catch((error) => {
        console.log(error)
        res.render('payment/new-payment', {dbError:error})
      })
  })

payment.get('/new-payment', (req, res) => res.render('payment/new-payment'))

payment.route('/active-payment')
  .put((req, res) => {
    req.PaymentsSvc = new PaymentsSvc(req.querySvc, req.session.user, req.body)

    req.PaymentsSvc.changeActivePayement()
      .then((result) => res.redirect('/app/accounts/' + req.session.user.email + '/payment'))
      .catch((error) => {
        console.log(error)
        res.render('payment/payments', { dbError:error })
      })
  })


payment.route('/:card_number')
  .get((req, res) => {
    console.log(req.query)
    req.PaymentsSvc = new PaymentsSvc(req.querySvc, req.session.user, req.query)

    req.PaymentsSvc.getFormOfPayement()
      .then(result => res.render('payment/edit-payment', result))
      .catch((error) => {
        console.log(error)
        res.render('payment/payments', {dbError:error})
      })
  })
  .put((req, res) => {
    req.PaymentsSvc = new PaymentsSvc(req.querySvc, req.session.user, req.body)
    console.log(req.body)
    req.PaymentsSvc.updateFormOfPayment()
      .then((result)=>{
        res.redirect('/app/accounts/' + req.session.user.email + '/payment')
      })
      .catch((error) => {
        console.log(error)
        res.render('payment/payments', {dbError:error})
      })
  })
  .delete((req, res) => {
    req.PaymentsSvc = new PaymentsSvc(req.querySvc, req.session.user, req.body)

    req.PaymentsSvc.deleteFormOfPayment()
      .then((result) => {
        res.redirect('/app/accounts/' + req.session.user.email + '/payment')
      })
      .catch((error) => {
        console.log(error)
        res.render('payment/payments', {dbError:error})
      })
  })

export default payment;
