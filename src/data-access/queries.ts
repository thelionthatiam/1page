import * as V from '../services/validation';
import * as R from '../services/value-objects';
import { Client } from '../../typings/typings';
 
export default class QuerySvc {
  conn:Client;

  constructor(conn:Client) {
    this.conn = conn;
  }

  // select
  returnUser(values:V.Email[]) {
    const text = "SELECT * FROM users WHERE email = $1"
    this.conn.query(text, values)
      .then(res => R.UserDB.fromJSON(res.rows[0]))
      .catch(e => e)
  }

  selectAuthenticatedUser(values:string[]) {
    const text = "SELECT * FROM users WHERE user_uuid = $1";
    return this.conn.query(text, values);
  }

  selectUserOrgs(values:string[]) {
    const text = "SELECT * FROM user_orgs WHERE user_uuid = $1"
    return this.conn.query(text, values);
  }

  selectOrder(values:string[]) {
    const text = "SELECT * FROM orders WHERE user_uuid = $1"
    return this.conn.query(text, values);
  }

  selectCart(values:string[]) {
    const text = 'SELECT * FROM cart WHERE user_uuid = $1'
    return this.conn.query(text, values);
  }

  selectOrgs(values:string[]) {
    const text = 'SELECT * FROM orgs'
    return this.conn.query(text, values);
  }

  selectAlarms(values:string[]) {
    const text = 'SELECT * FROM alarms WHERE user_uuid = $1'
    return this.conn.query(text, values);
  }

  selectUnpaidSnoozes(values:string[]) {
    const text = 'SELECT * FROM snoozes WHERE user_uuid = $1 AND paid = $2'
    return this.conn.query(text, values);
  }

  selectUnpaidDismisses(values:string[]) {
    const text = 'SELECT * FROM dismisses WHERE user_uuid = $1 AND paid = $2'
    return this.conn.query(text, values);
  }

  selectUnpaidWakes(values:string[]) {
    const text = 'SELECT * FROM wakes WHERE user_uuid = $1 AND paid = $2'
    return this.conn.query(text, values);
  }

  selectUserSettings(values:string[]) {
    const text = 'SELECT * FROM user_settings where user_uuid = $1'
    return this.conn.query(text, values)
  }

  selectPendingPayments(values:string[]) {
    const text = 'SELECT org_trans_total FROM org_transactions WHERE org_uuid = $1 AND sent = $2';
    return this.conn.query(text, values)
  }



  // insert

  insertUser(values:string[]) {
    const text = 'INSERT INTO users(email, phone, password, name, permission) VALUES($1, $2, $3, $4, $5) RETURNING *'
    return this.conn.query(text, values)
  }

  insertNonce(values:string[]) {
    const text = 'INSERT INTO session (user_uuid, sessionID) VALUES ($1, $2)';
    return this.conn.query(text, values);
  }

  insertSession(values:string[]) {
    const text = 'INSERT INTO session (user_uuid, sessionID) VALUES ($1, $2)';
    return this.conn.query(text, values);
  }

  insertSettings(values:string[]) {
    const text = 'INSERT INTO user_settings(user_uuid) VALUES ($1)';
    return this.conn.query(text, values);
  }

  insertSnooze(values:string[]) {
    const text = 'INSERT INTO snooze(user_uuid, alarm_uuid, recipient, org_trans_total, sent) VALUES ($1, $2, $3, $4, $5)';
    return this.conn.query(text, values);
  }

  insertTransaction(values:string[]) {
    const text = 'INSERT INTO transactions(user_uuid, recipient, payment_uuid, snoozes, dismisses, wakes, total) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    return this.conn.query(text, values)
  }

  insertOrgPayment(values:string[]) {
    const text = 'INSERT INTO org_transactions(trans_uuid, user_uuid, recipient, org_trans_total, sent) VALUES ($1, $2, $3, $4, $5)'
    return this.conn.query(text, values)
  }

  insertRevenue(values:string[]) {
    const text = 'INSERT INTO revenue(trans_uuid, user_uuid, trans_revenue_total) VALUES ($1, $2, $3)'
    return this.conn.query(text, values)
  }

  insertUserOrgs(values:string[]) {
    const text = 'INSERT INTO user_orgs(user_uuid, org_uuid) VALUES ($1, $2)'
    return this.conn.query(text, values)
  }

  // update
  updateSessionID(values:string[]) {
    const text = 'UPDATE session SET sessionid = $1 WHERE user_uuid = $2';
    return this.conn.query(text, values);
  }

  snoozesToPaid(values:string[]) {
    const text = 'UPDATE snoozes SET paid = $1 WHERE snooze_uuid = $2';
    return this.conn.query(text, values);
  }
  dismissesToPaid(values:string[]) {
    const text = 'UPDATE dismisses SET paid = $1 WHERE dismiss_uuid = $2';
    return this.conn.query(text, values);
  }
  wakesToPaid(values:string[]) {
    const text = 'UPDATE wakes SET paid = $1 WHERE wake_uuid = $2';
    return this.conn.query(text, values);
  }

  orgToPaid(values:string[]) {
    const text = 'UPDATE org_transactions SET sent = $1 WHERE recipient = $2';
    return this.conn.query(text, values);
  }
  // delete

};