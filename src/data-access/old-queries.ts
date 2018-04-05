// DATA ACCESS TIER

class Query {
  conn : Client;

  constructor(conn : Client) {
    this.conn = conn;
  }

  // select
  getUserViaEmail(values : string[]) {
    const query = "SELECT * FROM users WHERE email = $1"
    return this
      .conn
      .query(query, values);
  }

  getUser(values : string[]) {
    const query = "SELECT * FROM users WHERE user_uuid = $1";
    return this
      .conn
      .query(query, values);
  }

  getOrgsViaEmail(values : string[]) {
    const query = "SELECT * FROM user_orgs WHERE user_uuid = $1"
    return this
      .conn
      .query(query, values);
  }

  getOrder(values : string[]) {
    const query = "SELECT * FROM orders WHERE user_uuid = $1"
    return this
      .conn
      .query(query, values);
  }

  getCart(values : string[]) {
    const query = 'SELECT * FROM cart WHERE user_uuid = $1'
    return this
      .conn
      .query(query, values);
  }

  getOrgs(values : string[]) {
    const query = 'SELECT * FROM orgs'
    return this
      .conn
      .query(query, values);
  }

  getAlarms(values : string[]) {
    const query = 'SELECT * FROM alarms WHERE user_uuid = $1'
    return this
      .conn
      .query(query, values);
  }

  getUnpaidSnoozes(values : string[]) {
    const query = 'SELECT * FROM snoozes WHERE user_uuid = $1 AND paid = $2'
    return this
      .conn
      .query(query, values);
  }

  getUnpaidDismisses(values : string[]) {
    const query = 'SELECT * FROM dismisses WHERE user_uuid = $1 AND paid = $2'
    return this
      .conn
      .query(query, values);
  }

  getUnpaidWakes(values : string[]) {
    const query = 'SELECT * FROM wakes WHERE user_uuid = $1 AND paid = $2'
    return this
      .conn
      .query(query, values);
  }

  getSettingsViaEmail(values : string[]) {
    const query = 'SELECT * FROM user_settings where user_uuid = $1'
    return this
      .conn
      .query(query, values)
  }

  getPendingPayments(values : string[]) {
    const query = 'SELECT org_trans_total FROM org_transactions WHERE org_uuid = $1 AND sent = $2';
    return this
      .conn
      .query(query, values)
  }

  // insert
  insertUser(values : string[]) {
    const query = 'INSERT INTO users(email, phone, password, name, permission) VALUES($1, $2, $3, $' +
        '4, $5) RETURNING *'
    return this
      .conn
      .query(query, values)
  }

  insertNonce(values : string[]) {
    const query = 'INSERT INTO session (user_uuid, sessionID) VALUES ($1, $2)';
    return this
      .conn
      .query(query, values);
  }

  insertSession(values : string[]) {
    const query = 'INSERT INTO session (user_uuid, sessionID) VALUES ($1, $2)';
    return this
      .conn
      .query(query, values);
  }

  insertSettings(values : string[]) {
    const query = 'INSERT INTO user_settings(user_uuid) VALUES ($1)';
    return this
      .conn
      .query(query, values);
  }

  insertSnooze(values : string[]) {
    const query = 'INSERT INTO snooze(user_uuid, alarm_uuid, recipient, org_trans_total, sent) VALU' +
        'ES ($1, $2, $3, $4, $5)';
    return this
      .conn
      .query(query, values);
  }

  insertTransaction(values : string[]) {
    const query = 'INSERT INTO transactions(user_uuid, recipient, payment_uuid, snoozes, dismisses,' +
        ' wakes, total) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    return this
      .conn
      .query(query, values)
  }

  insertOrgPayment(values : string[]) {
    const query = 'INSERT INTO org_transactions(trans_uuid, user_uuid, recipient, org_trans_total, ' +
        'sent) VALUES ($1, $2, $3, $4, $5)'
    return this
      .conn
      .query(query, values)
  }

  insertRevenue(values : string[]) {
    const query = 'INSERT INTO revenue(trans_uuid, user_uuid, trans_revenue_total) VALUES ($1, $2, ' +
        '$3)'
    return this
      .conn
      .query(query, values)
  }

  // update
  updateSessionID(values : string[]) {
    const query = 'UPDATE session SET sessionid = $1 WHERE user_uuid = $2';
    return this
      .conn
      .query(query, values);
  }

  updateSnoozeToPaid(values : string[]) {
    const query = 'UPDATE snoozes SET paid = $1 WHERE snooze_uuid = $2';
    return this
      .conn
      .query(query, values);
  }
  updateDismissesToPaid(values : string[]) {
    const query = 'UPDATE dismisses SET paid = $1 WHERE dismiss_uuid = $2';
    return this
      .conn
      .query(query, values);
  }
  updateWakesToPaid(values : string[]) {
    const query = 'UPDATE wakes SET paid = $1 WHERE wake_uuid = $2';
    return this
      .conn
      .query(query, values);
  }

  updateOrgToPaid(values : string[]) {
    const query = 'UPDATE org_transactions SET sent = $1 WHERE recipient = $2';
    return this
      .conn
      .query(query, values);
  }
  // delete
};

export { Query };




