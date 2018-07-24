import * as isUUID from 'is-uuid';

class UserException {
  message:string;
  name:string;

  constructor(name:string, message:string) {
    this.message = message;
    this.name = name.toUpperCase();
  }
}

interface ValidationResult {
  readonly isOkay : boolean;
}

class ValidationError extends Error implements ValidationResult {
  readonly name: string;
  message: string;
  isOkay: boolean;

  constructor(name: string, message:string) {
    super(message);
    Error.captureStackTrace(this); // will  creae a stack trace.
    this.message = message
    this.name = name;
  }

  static isOkay() {
    return false;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message
    }
  }
}

class ValueScalar<T> {
  private _value:T;
  constructor(value:T) {
    this._value = value;
  }
  valueOf() : T {
    return this._value;
  }
  toString() : T {
    return this._value;
  }
  toJSON() : T {
    return this._value;
  }
}

class Email extends ValueScalar<string> {
  static fromJSON(value : string) : Email {
    return Email.create(value);
  }

  static create(value : string) : Email {
    let res = Email.validate(value);
    if (!res.isOkay)
      throw res;
    return new Email(value);
  }

  static validate(email:string) : ValidationResult {
    let re = /^[A-Za-z0-9\._\$%\-]+@[A-Za-z0-9\-]+.[A-Za-z0-9]{2,6}$/;
    if (re.test(email)) {
      return { isOkay: true };
    } else {
      return new ValidationError('invalid type', 'This value -- ' + email + ' -- is not an email.')
    }
  }
}

class Permission extends ValueScalar<string> {
  constructor(value: any) {
    super(value)
  }

  static fromJSON(value : string) : Permission {
    return Permission.create(value);
  }

  static create(value : string) : Permission {
    let res = Permission.validate(value);
    if (!res.isOkay)
      throw res;
    return new Permission(value);
  }

  static validate(permission:string) : ValidationResult {
    let re = /^(guest)$|^(user)$|^(admin)$/
    if (re.test(permission)) {
      return { isOkay: true };
    } else {
      throw new ValidationError('invalid type', 'This value -- ' + permission + ' -- is not a permission.')
    }
  }
}

class CharOnly  extends ValueScalar<string> {
  constructor(value: any) {
    super(value)
  }

  static fromJSON(value : string) : CharOnly {
    return CharOnly.create(value);
  }

  static create(value : string) : CharOnly {
    let res = CharOnly.validate(value);
    if (!res.isOkay)
      throw res;
    return new CharOnly(value);
  }

  static validate(charOnly:string) : ValidationResult {
    let re = /^[a-zA-Z ]+$/
      if (re.test(charOnly)) {
        return { isOkay: true };
      } else {
        throw new ValidationError('invalid type', 'This value -- ' + charOnly + ' -- is not only chars.')
      }
  }
}

class NumOnly extends ValueScalar<number> {
  constructor(value: any) {
    super(value)
  }

  static fromJSON(value : string) : NumOnly {
    return NumOnly.create(value);
  }

  static create(value : string) : NumOnly {
    let res = NumOnly.validate(value);
    if (!res.isOkay)
      throw res;
    return new NumOnly(value);
  }

  static validate(numOnly:string) : ValidationResult {
    let re = /^[0-9.]+$/
      if (re.test(numOnly)) {
        return { isOkay: true };
      } else {
        throw new ValidationError('invalid type', 'This value -- ' + numOnly + ' -- is not only numbers.')
      }
  }
}

class UUID extends ValueScalar<string> {
  constructor(value: any) {
    super(value)
  }

  static fromJSON(value : string) : UUID {
    return UUID.create(value);
  }

  static create(value : string) : UUID {
    let res = UUID.validate(value);
    if (!res.isOkay)
      throw res;
    return new UUID(value);
  }

  static validate(uuid:string) : ValidationResult {
    if (isUUID.v4(uuid)) {
      return { isOkay: true };
    } else {
      return new ValidationError('invalid type', 'This value -- ' + uuid + ' -- is not a uuid.')
    }
  }
}

class Bool extends ValueScalar<boolean> {
  constructor(value: any) {
    super(value)
  }

  static fromJSON(value : string) : Bool {
    return Bool.create(value);
  }

  static create(value : string) : Bool {
    let res = Bool.validate(value);
    if (!res.isOkay)
      throw res;
    return new Bool(value);
  }

  static validate(boolean:string) : ValidationResult {
    if (typeof boolean === 'boolean') {
      return { isOkay: true };
    } else {
      return new ValidationError('invalid type', 'This value -- ' + boolean + ' -- is not a boolean.')
    }
  }
}

class String extends ValueScalar<string>{
  constructor(value: any) {
    super(value)
  }

  static fromJSON(value : string) : String {
    return String.create(value);
  }

  static create(value : string) : String {
    let res = String.validate(value);
    if (!res.isOkay)
      throw res;
    return new String(value);
  }

  static validate(string:string) : ValidationResult {
    let re = /.+/
    if (re.test(string)) {
      return { isOkay: true };
    } else {
      return new ValidationError('invalid type', 'This value -- ' + string + ' -- is not a string.')
    }
  }
}


class MilitaryTime extends ValueScalar<string> {
  static fromJSON(value: string): MilitaryTime {
    return MilitaryTime.create(value)
  }
  static create(value: string): MilitaryTime {
    let res = MilitaryTime.validate(value)

    if (!res.isOkay)
      throw res;
    return new MilitaryTime(value)
  }

  static validate(militaryTime: string): ValidationResult {
    let re = /^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)?$/
    if (re.test(militaryTime)) {
      return { isOkay: true }
    } else {
      throw new ValidationError('invalid type', 'This value -- ' + militaryTime + ' -- is not military time.')
    }
  }
}


class AlarmState extends ValueScalar<string> {
  static fromJSON(value: string): AlarmState {
    return AlarmState.create(value)
  }
  static create(value: string): AlarmState {
    let res = AlarmState.validate(value)

    if (!res.isOkay)
      throw res;
    return new AlarmState(value)
  }

  static validate(alarmState: string): ValidationResult {
    let re = /(snoozing|dismissed|woke|pending|ringing)/
    if (re.test(alarmState)) {
      return { isOkay: true }
    } else {
      throw new ValidationError('invalid type', 'This value -- ' + alarmState + ' -- is not a valid alarm state.')
    }
  }

}





interface PaymentCredit {
  user_uuid:UUID;
  card_number:string;
  name:CharOnly;
  exp_month:string;
  exp_date:string;
  cvv:string;
  address_1:string;
  city:string;
  state:string;
  zip:string;
}


export {
  UserException,
  ValidationResult,
  ValidationError,
  ValueScalar,
  Email,
  Permission,
  CharOnly,
  NumOnly,
  UUID,
  Bool,
  String,
  PaymentCredit,
  MilitaryTime,
  AlarmState
}
