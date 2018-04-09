import * as V from '../services/validation';
import * as R from '../services/value-objects';
import * as pg from 'pg';



export function getUserData(values:V.UUID[]) {
    const text = "SELECT * FROM users WHERE email = $1";
    return this.conn.query(text, values)
        .then(res => {
            if (res.rowCount === 0) {
                throw new Error('No user with that uuid')
            }
        })
}