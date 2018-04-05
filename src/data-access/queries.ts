import * as V from '../services/validation';
import * as R from '../services/value-objects';
import * as pg from 'pg';
 
export default class QuerySvc {
  conn:pg.Client;

  constructor(conn : pg.Client) {
    this.conn = conn;
  }

  // select
  getUserViaEmail(values:V.Email[]) : Promise<R.UserDB> {
    const text = "SELECT * FROM users WHERE email = $1"
    return this.conn.query(text, values)
      .then(res => R.UserDB.fromJSON(res.rows[0]))
      .catch(e => e)
  }
  
  getUserOrgs(values:V.UUID[]) { // ERROR NOT BUBBLING OUT! REPRO WITH WRONG DATA TYPE
    // console.log('get orgs via email')
    const text = "SELECT * FROM user_orgs WHERE user_uuid = $1"
    return this.conn.query(text, values)
      .then(result => result)
      .catch(e => {
        // console.log(e)
        return e
      })
  }

  getUser(values:V.UUID[]) {
    const text = "SELECT * FROM users WHERE user_uuid = $1";
    return this.conn.query(text, values);
  }

  getOrder(values:V.UUID[]) {
    const text = "SELECT * FROM orders WHERE user_uuid = $1"
    return this.conn.query(text, values);
  }

  getCart(values:V.UUID[]) {
    const text = 'SELECT * FROM cart WHERE user_uuid = $1'
    return this.conn.query(text, values);
  }

  getOrgs(values:null[]) {
    const text = 'SELECT * FROM orgs'
    return this.conn.query(text, values);
  }

  getAlarms(values:V.UUID[]) {
    const text = 'SELECT * FROM alarms WHERE user_uuid = $1'
    return this.conn.query(text, values);
  }

getUnpaidSnoozes(values : [V.UUID, boolean]) {
    const text = 'SELECT * FROM snoozes WHERE user_uuid = $1 AND paid = $2'
    return this.conn.query(text, values);
  }

  getUnpaidDismisses(values:[V.UUID, boolean]) {
    const text = 'SELECT * FROM dismisses WHERE user_uuid = $1 AND paid = $2'
    return this.conn.query(text, values);
  }

  getUnpaidWakes(values:[V.UUID, boolean]) {
    const text = 'SELECT * FROM wakes WHERE user_uuid = $1 AND paid = $2'
    return this.conn.query(text, values);
  }

  getSettingsViaEmail(values:V.UUID[]) {
    const text = 'SELECT * FROM user_settings where user_uuid = $1'
    return this.conn.query(text, values)
  }

  getPendingPayments(values:[V.UUID, boolean]) {
    const text = 'SELECT org_trans_total FROM org_transactions WHERE org_uuid = $1 AND sent = $2';
    return this.conn.query(text, values)
  }

  // insert


  // SHOULD I BE DEFINING A SPECIAL TYPE FOR THIS ARRAY?
  insertUser(values:[V.Email, V.NumOnly, V.String, V.CharOnly, V.String]) {
    const text = 'INSERT INTO users(email, phone, password, name, permission) VALUES($1, $2, $3, $4, $5) RETURNING *'
    return this.conn.query(text, values)
      .then(result => R.UserDB.fromJSON({
                        email:result.rows[0].email,
                        user_uuid:result.rows[0].user_uuid,
                        permission:result.rows[0].permission,
                        phone:result.rows[0].phone,
                        name:result.rows[0].name,
                        password:result.rows[0].password
                      })
      )
      .catch(e => e)
  }

  insertNonce(values:[V.UUID, string]) {
    const text = 'INSERT INTO session (user_uuid, sessionID) VALUES ($1, $2)';
    return this.conn.query(text, values)
      .then(result => result)
      .catch(e => e)
  }

  insertSession(values:[V.UUID, string]) {
    const text = 'INSERT INTO session (user_uuid, sessionID) VALUES ($1, $2)';
    return this.conn.query(text, values)
      .then(result => null)
      .catch(e => e)
  }

  insertSettings(values:V.UUID[]) {
    const text = 'INSERT INTO user_settings(user_uuid) VALUES ($1)';
    return this.conn.query(text, values)
      .then(result => null)
      .catch(e => e)
  }

  // SHOULD I BE DEFINING A SPECIAL TYPE FOR THIS ARRAY?
  insertSnooze(values:string[]) {
    const text = 'INSERT INTO snooze(user_uuid, alarm_uuid, recipient, org_trans_total, sent) VALUES ($1, $2, $3, $4, $5)';
    return this.conn.query(text, values);
  }

  // SHOULD I BE DEFINING A SPECIAL TYPE FOR THIS ARRAY?
  insertTransaction(values:string[]) {
    const text = 'INSERT INTO transactions(user_uuid, recipient, payment_uuid, snoozes, dismisses, wakes, total) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    return this.conn.query(text, values)
  }

  // SHOULD I BE DEFINING A SPECIAL TYPE FOR THIS ARRAY?
  insertOrgPayment(values:string[]) {
    const text = 'INSERT INTO org_transactions(trans_uuid, user_uuid, recipient, org_trans_total, sent) VALUES ($1, $2, $3, $4, $5)'
    return this.conn.query(text, values)
  }

  // SHOULD I BE DEFINING A SPECIAL TYPE FOR THIS ARRAY?
  insertRevenue(values:string[]) {
    const text = 'INSERT INTO revenue(trans_uuid, user_uuid, trans_revenue_total) VALUES ($1, $2, $3)'
    return this.conn.query(text, values)
  }

  insertUserOrgs(values:V.UUID[]) {
    console.log('inseruser orgs')
    const text = 'INSERT INTO user_orgs(user_uuid, org_uuid) VALUES ($1, $2)'
    return this.conn.query(text, values)
      .then(result => result)
      .catch(e => e)
  }

  // update
  updateSessionID(values:V.UUID[]):Promise<void> {
    const text = 'UPDATE session SET sessionid = $1 WHERE user_uuid = $2';
    return this.conn.query(text, values)
      .then(() => {}) // DO I NEED THIS FOR A VOID FUNCTION?
      .catch(e => e)
  }

  updateSnoozeToPaid(values:V.UUID[]) {
    const text = 'UPDATE snoozes SET paid = $1 WHERE snooze_uuid = $2';
    return this.conn.query(text, values);
  }
  updateDismissesToPaid(values:string[]) {
    const text = 'UPDATE dismisses SET paid = $1 WHERE dismiss_uuid = $2';
    return this.conn.query(text, values);
  }
  updateWakesToPaid(values:string[]) {
    const text = 'UPDATE wakes SET paid = $1 WHERE wake_uuid = $2';
    return this.conn.query(text, values);
  }

  updateOrgToPaid(values:string[]) {
    const text = 'UPDATE org_transactions SET sent = $1 WHERE recipient = $2';
    return this.conn.query(text, values);
  }
  
  // delete

};