//
import {
  UserException,
  ValidationError,
  ValueScalar,
  Email,
  Permission,
  CharOnly,
  NumOnly,
  UUID,
  Bool,
  String,
  MilitaryTime,
  AlarmState
} from './validation'


// THIS COULD LIVE SOMEWHERE ELSE
class ValidationResult {
  static isValid(args:any, obj:any) {
    for (let k in obj) {
      if (args.hasOwnProperty(k)) {
        let res = obj[k]
        if (!res.isOkay)
          return res;
      } else {
        let message = 'MISSING PROPERTY: ' + k;
        throw new ValidationError(null, message);
      }
    }
  }
  get isOkay() { return false; }
}


class UserSession {
  readonly      email?: Email;
  readonly       uuid?: UUID;
  readonly permission?: Permission;
  readonly       name?: CharOnly;

  private constructor(args:{ email?: Email; uuid?: UUID; permission?: Permission; cart_uuid?: UUID; name?: CharOnly; } = {}) {
    this.email      = args.email;
    this.uuid       = args.uuid;
    this.permission = args.permission;
    this.name       = args.name;
  }

  static fromJSON(args: {[key: string]: any}) : UserSession {
    let res = UserSession.validate(args);
    if (res.isOkay) {
      let res = new UserSession({
        email: Email.create(args.email),
        uuid : UUID.create(args.uuid),
        permission: Permission.create(args.permission),
        name: CharOnly.create(args.name),
      })
      return res.toJSON();
    } else {
      throw new Error ('error happens at fromJSON');
    }
  }

  static validate(args: {[key: string] : any}) : ValidationResult {
    let propValidation = {
      email: Email.validate(args.email),
      uuid: UUID.validate(args.uuid),
      permission: Permission.validate(args.permission),
      name: CharOnly.validate(args.name),
    }
    ValidationResult.isValid(args, propValidation)
    return { isOkay: true };
  }

  toJSON() : any {
    return {
      email: this.email.toString(),
      uuid: this.uuid.toString(),
      permission: this.permission.toString(),
      name: this.name.toString()
    };
  }
}


class UserInputs {
  readonly email?: Email;
  readonly phone?: NumOnly;
  readonly name?: CharOnly;
  readonly password?: string;

  private constructor(args: { email?: Email; phone?: NumOnly; name?: CharOnly; password?: string } = {}) {
    this.email = args.email;
    this.phone = args.phone;
    this.name = args.name;
    this.password = args.password;
  }

  static fromJSON(args: { [key: string]: any }): UserDB {
    let res = UserInputs.validate(args);
    if (res.isOkay) {
      let res = new UserInputs({
        email: Email.create(args.email),
        phone: NumOnly.create(args.phone),
        name: CharOnly.create(args.name),
        password: args.password
      })
      return res.toJSON();
    } else {
      throw new Error('error happens at fromJSON');
    }
  }

  static validate(args: { [key: string]: any }): ValidationResult {
    let propValidation = {
      email: Email.validate(args.email),
      phone: NumOnly.validate(args.phone),
      name: CharOnly.validate(args.name),
      password: String.validate(args.password)
    }
    ValidationResult.isValid(args, propValidation)
    return { isOkay: true };
  }

  toJSON(): any {
    return {
      email: this.email.toString(),
      phone: this.phone.toString(),
      name: this.name.toString(),
      password: this.password.toString()
    };
  }
}


class UserDB {
  readonly      email?: Email;
  readonly  user_uuid?: UUID;
  readonly permission?: Permission;
  readonly      phone?: NumOnly;
  readonly       name?: CharOnly;
  readonly   password?: string;

  private constructor(args:{ email?: Email; user_uuid?: UUID; permission?: Permission; phone?:NumOnly; name?: CharOnly; password?: string } = {}) {
    this.email      = args.email;
    this.user_uuid  = args.user_uuid;
    this.permission = args.permission;
    this.phone      = args.phone;
    this.name       = args.name;
    this.password   = args.password;
  }

  static fromJSON(args: {[key: string]: any}) : UserDB {
    let res = UserDB.validate(args);
    if (res.isOkay) {
      let res = new UserDB({
        email: Email.create(args.email),
        user_uuid : UUID.create(args.user_uuid),
        permission: Permission.create(args.permission),
        phone: NumOnly.create(args.phone),
        name: CharOnly.create(args.name),
        password: args.password
      })
      return res.toJSON();
    } else {
      throw new Error ('error happens at fromJSON');
    }
  }

  static validate(args: {[key: string] : any}) : ValidationResult {
    let propValidation = {
      email: Email.validate(args.email),
      user_uuid: UUID.validate(args.user_uuid),
      permission: Permission.validate(args.permission),
      phone: NumOnly.validate(args.phone),
      name: CharOnly.validate(args.name),
      password: String.validate(args.password)
    }
    ValidationResult.isValid(args, propValidation)
    return { isOkay: true };
  }

  toJSON() : any {
    return {
      email: this.email.toString(),
      user_uuid: this.user_uuid.toString(),
      permission: this.permission.toString(),
      phone: this.phone.toString(),
      name: this.name.toString(),
      password: this.password.toString()
    };
  }
}

class AlarmInputs {
  readonly title?: (string | null);
  readonly time?: MilitaryTime;
  // readonly user_uuid?: UUID;

  private constructor(args: { title?:(string|null), time?:MilitaryTime } = {}) {
    this.title = args.title,
    this.time = args.time
    // this.user_uuid = args.user_uuid
  }

  static fromJSON(args: { [key: string]: any }): AlarmInputs {
    let res = AlarmInputs.validate(args);
    if (res.isOkay) {
      let res = new AlarmInputs({
        title: args.title,
        time: MilitaryTime.create(args.time),
        // user_uuid: UUID.create(args.user_uuid), 
      })
      return res.toJSON();
    } else {
      throw new Error('error happens at fromJSON');
    }
  }

  static validate(args: { [key: string]: any }): ValidationResult {
    let propValidation = {
      title: args.title,
      time: MilitaryTime.validate(args.time),
      // user_uuid: UUID.validate(args.user_uuid)
    }
    ValidationResult.isValid(args, propValidation)
    return { isOkay: true };
  }

  toJSON(): any {
    return {
      title: this.title.toString(),
      time: this.time.toString(),
      // user_uuid: this.user_uuid.toString(),
    };
  }
}



class AlarmDB {
  readonly title?: (string | null);
  readonly time?: MilitaryTime;
  readonly user_uuid?: UUID;
  readonly alarm_uuid?: UUID;
  readonly active?:Bool;
  readonly state?:AlarmState;
  readonly mon?:Bool;
  readonly tues?: Bool;
  readonly wed?: Bool;
  readonly thur?: Bool;
  readonly fri?: Bool;
  readonly sat?: Bool;
  readonly sun?: Bool;
  // readonly triggered?: Bool;
  readonly repeat?: Bool;
  readonly archive?: Bool;
  readonly snooze_tally?: NumOnly;


  private constructor(args: { 
    title?: (string | null),
    time?: MilitaryTime,
    user_uuid?: UUID,
    alarm_uuid?: UUID,
    active?: Bool,
    state?: AlarmState, 
    mon?: Bool,
    tues?: Bool,
    wed?: Bool,
    thur?: Bool,
    fri?: Bool,
    sat?: Bool,
    sun?: Bool,
    // triggered?: Bool,
    repeat?: Bool,
    archive?: Bool,
    snooze_tally?: NumOnly
  } = {}) {
    this.title =  args.title,
    this.time =  args.time,
    this.user_uuid =  args.user_uuid,
    this.alarm_uuid = args.alarm_uuid,
    this.active =  args.active,
    this.state =  args.state,
    this.mon =  args.mon,
    this.tues =  args.tues,
    this.wed =  args.wed,
    this.thur =  args.thur,
    this.fri =  args.fri,
    this.sat =  args.sat,
    this.sun =  args.sun,
    // this.triggered =  args.triggered,
    this.repeat =  args.repeat,
    this.archive = args.archive,
    this.snooze_tally = args.snooze_tally
  }

  static fromJSON(args: { [key: string]: any }): AlarmDB {
    let res = AlarmDB.validate(args);
    if (res.isOkay) {
      let res = new AlarmDB({
        title: args.title,
        time: MilitaryTime.create(args.time),
        user_uuid: UUID.create(args.user_uuid),
        alarm_uuid: UUID.create(args.alarm_uuid),
        active: Bool.create(args.active),
        state: AlarmState.create(args.state), // make this
        mon: Bool.create(args.mon),
        tues: Bool.create(args.tues),
        wed: Bool.create(args.wed),
        thur: Bool.create(args.thur),
        fri: Bool.create(args.fri),
        sat: Bool.create(args.sat),
        sun: Bool.create(args.sun),
        // triggered: Bool.create(args.triggered),
        repeat: Bool.create(args.repeat),
        archive: Bool.create(args.archive),
        snooze_tally: NumOnly.create(args.snooze_tally)
      })
      return res.toJSON();
    } else {
      throw new Error('error happens at fromJSON');
    }
  }

  static validate(args: { [key: string]: any }): ValidationResult {
    let propValidation = {
        title: args.title,
        time: MilitaryTime.validate(args.time),
        user_uuid: UUID.validate(args.user_uuid),
        alarm_uuid: UUID.validate(args.alarm_uuid),
        active: Bool.validate(args.active),
        state: AlarmState.validate(args.state), // make this
        mon: Bool.validate(args.mon),
        tues: Bool.validate(args.tues),
        wed: Bool.validate(args.wed),
        thur: Bool.validate(args.thur),
        fri: Bool.validate(args.fri),
        sat: Bool.validate(args.sat),
        sun: Bool.validate(args.sun),
        // triggered: Bool.validate(args.triggered),
        repeat: Bool.validate(args.repeat),
        archive: Bool.validate(args.archive),
        snooze_tally: NumOnly.validate(args.snooze_tally)
    }
    ValidationResult.isValid(args, propValidation)
    return { isOkay: true };
  }

  toJSON(): any {
    return {
      title: this.title.toString(),
      time: this.time.toString(),
      user_uuid: this.user_uuid.toString(),
      alarm_uuid: this.alarm_uuid.toString(),
      active: this.active.toString(),
      state: this.state.toString(),
      mon: this.mon.toString(),
      tues: this.tues.toString(),
      wed: this.wed.toString(),
      thur: this.thur.toString(),
      fri: this.fri.toString(),
      sat: this.sat.toString(),
      sun: this.sun.toString(),
      // triggered: this.triggered.toString(),
      repeat: this.repeat.toString(),
      archive: this.archive.toString(),
      snooze_tally: this.snooze_tally.toString()
    };
  }
}

class AuthInputs {
  readonly email?: Email;
  readonly password?: string;

  private constructor(args: { email?: Email; password?: string } = {}) {
    this.email = args.email;
    this.password = args.password;
  }

  static fromJSON(args: { [key: string]: any }): UserDB {
    let res = AuthInputs.validate(args);
    if (res.isOkay) {
      let res = new AuthInputs({
        email: Email.create(args.email),
        password: args.password
      })
      return res.toJSON();
    } else {
      throw new Error('error happens at fromJSON');
    }
  }

  static validate(args: { [key: string]: any }): ValidationResult {
    let propValidation = {
      email: Email.validate(args.email),
      password: String.validate(args.password)
    }
    ValidationResult.isValid(args, propValidation)
    return { isOkay: true };
  }

  toJSON(): any {
    return {
      email: this.email.toString(),
      password: this.password.toString()
    };
  }
}


class UserOrgsDB {
  readonly user_uuid?: UUID;
  readonly org_uuid?: UUID;
  readonly active?: Bool;

  private constructor(args:{
    user_uuid?: UUID;
    org_uuid?: UUID;
    active?: Bool;
  } = {}) {
    this.user_uuid   = args.user_uuid;
    this.org_uuid  = args.org_uuid;
    this.active = args.active;
  }

  static fromJSON(args: {[key: string]: any}) : UserOrgsDB {
    let res = UserOrgsDB.validate(args);
    if (res.isOkay) {
      let res = new UserOrgsDB({
        user_uuid: UUID.create(args.user_uuid),
        org_uuid: UUID.create(args.org_uuid),
        active: Bool.create(args.active),
      })
      return res.toJSON();
    } else {
      throw new Error ('error happens at fromJSON');
    }
  }

  static validate(args: {[key: string] : any}) : ValidationResult {
    let propValidation = {
      user_uuid: UUID.validate(args.user_uuid),
      org_uuid: UUID.validate(args.org_uuid),
      active: Bool.validate(args.active),
    }
    ValidationResult.isValid(args, propValidation)
    return { isOkay: true };
  }

  toJSON() : any {
    return {
      user_uuid: this.user_uuid.toString(),
      org_uuid: this.org_uuid.toString(),
      active: this.active.toString(),
    };
  }
}


class CartDB {
  readonly user_uuid?: UUID;
  readonly cart_uuid?: UUID;
  readonly card_number?: NumOnly;

  private constructor(args:{
    user_uuid?: UUID;
    cart_uuid?: UUID;
    card_number?: NumOnly;
  } = {}) {
    this.user_uuid   = args.user_uuid;
    this.cart_uuid  = args.cart_uuid;
    this.card_number = args.card_number;
  }

  static fromJSON(args: {[key: string]: any}) : CartDB {
    let res = CartDB.validate(args);
    if (res.isOkay) {
      let res = new CartDB({
        user_uuid: UUID.create(args.user_uuid),
        cart_uuid: UUID.create(args.cart_uuid),
        card_number: NumOnly.create(args.card_number),
      })
      return res.toJSON();
    } else {
      throw new Error ('error happens at fromJSON');
    }
  }

  static validate(args: {[key: string] : any}) : ValidationResult {
    let propValidation = {
      user_uuid: UUID.validate(args.user_uuid),
      cart_uuid: UUID.validate(args.cart_uuid),
      card_number: NumOnly.validate(args.card_number),
    }
    ValidationResult.isValid(args, propValidation)
    return { isOkay: true };
  }

  toJSON() : any {
    return {
      user_uuid: this.user_uuid.toString(),
      cart_uuid: this.cart_uuid.toString(),
      card_number: this.card_number.toString(),
    };
  }
}


class OrgsDB {
  readonly org_uuid?: UUID;
  readonly org_sku?: String; // could add sku checker
  readonly name?: CharOnly;
  readonly description?: String;
  readonly cause?: CharOnly;
  readonly link?: String; // could add a link checker
  readonly img?: string;

  private constructor(args:{
    org_uuid?: UUID;
    org_sku?: String; // could add sku checker
    name?: CharOnly;
    description?: String;
    cause?: CharOnly;
    link?: String; // could add a link checker
    img?: string;
  } = {}) {
    this.org_uuid = args.org_uuid;
    this.org_sku = args.org_sku;
    this.name = args.name;
    this.description = args.description;
    this.cause = args.cause;
    this.link = args.link;
    this.img = args.img;
  }

  static fromJSON(args: {[key: string]: any}) : OrgsDB {
    let res = OrgsDB.validate(args);
    if (res.isOkay) {
      let res = new OrgsDB({
        org_uuid: UUID.create(args.org_uuid),
        org_sku: String.create(args.org_sku),
        name: CharOnly.create(args.name),
        description: String.create(args.description),
        cause: CharOnly.create(args.cause),
        link: String.create(args.link),
        img: args.img
      })
      return res.toJSON();
    } else {
      throw new Error ('error happens at fromJSON');
    }
  }

  static validate(args: {[key: string] : any}) : ValidationResult {
    let propValidation = {
      org_uuid: UUID.validate(args.org_uuid),
      org_sku: String.validate(args.org_sku),
      name: CharOnly.validate(args.name),
      description: String.validate(args.description),
      cause: CharOnly.validate(args.cause),
      link: String.validate(args.link),
      img: args.img
    }
    ValidationResult.isValid(args, propValidation)
    return { isOkay: true };
  }

  toJSON() : any {
    return {
      org_uuid: this.org_uuid.toString(),
      org_sku: this.org_sku.toString(),
      name: this.name.toString(),
      description: this.description.toString(),
      cause: this.cause.toString(),
      link: this.link.toString(),
      img: this.img.toString()
    };
  }
}

class UserSettings {
  readonly user_uuid?: UUID;
  readonly payment_scheme?: CharOnly;
  readonly snooze_price?: NumOnly;
  readonly dismiss_price?: NumOnly;
  readonly wake_price?: NumOnly;
  readonly month_max?: NumOnly;
  readonly snooze_max?: NumOnly;
  readonly active_payment?:UUID;

  private constructor(args:{
    user_uuid?: UUID;
    payment_scheme?: CharOnly;
    snooze_price?: NumOnly;
    dismiss_price?: NumOnly;
    wake_price?: NumOnly;
    month_max?: NumOnly;
    snooze_max?: NumOnly;
    active_payment?:UUID;
  } = {}) {
    this.user_uuid = args.user_uuid;
    this.payment_scheme = args.payment_scheme;
    this.snooze_price = args.snooze_price;
    this.dismiss_price = args.dismiss_price;
    this.wake_price = args.wake_price;
    this.month_max = args.month_max;
    this.snooze_max = args.snooze_max;
    this.active_payment = args.active_payment;
  }

  static fromJSON(args: {[key: string]: any}) : UserSettings {
    let res = UserSettings.validate(args);
    if (res.isOkay) {
      let res = new UserSettings({
        user_uuid: UUID.create(args.user_uuid),
        payment_scheme: String.create(args.payment_scheme),
        snooze_price: NumOnly.create(args.snooze_price),
        dismiss_price: NumOnly.create(args.dismiss_price),
        wake_price: NumOnly.create(args.wake_price),
        month_max: NumOnly.create(args.month_max),
        snooze_max: NumOnly.create(args.snooze_max),
        active_payment: UUID.create(args.active_payment)
      })
      return res.toJSON();
    } else {
      throw new Error ('error happens at fromJSON');
    }
  }

  static validate(args: {[key: string] : any}) : ValidationResult {
    let propValidation = {
      user_uuid: UUID.validate(args.user_uuid),
      payment_scheme: String.validate(args.payment_scheme),
      snooze_price: NumOnly.validate(args.snooze_price),
      dismiss_price: NumOnly.validate(args.dismiss_price),
      wake_price: NumOnly.validate(args.wake_price),
      month_max: NumOnly.validate(args.month_max),
      snooze_max: NumOnly.validate(args.snooze_max),
      active_payment:UUID.validate(args.active_payment)
    }
    ValidationResult.isValid(args, propValidation)
    return { isOkay: true };
  }

  toJSON() : any {
    return {
      user_uuid: this.user_uuid.toString(),
      payment_scheme: this.payment_scheme.toString(),
      snooze_price: this.snooze_price.toString(),
      dismiss_price: this.dismiss_price.toString(),
      wake_price: this.wake_price.toString(),
      month_max: this.month_max.toString(),
      snooze_max: this.snooze_max.toString(),
      active_payment:this.active_payment.toString()
    };
  }
}


// THIS MAY HAVE BEEN USELESS 

class UserOrgsJoin {
  readonly org_uuid?: UUID;
  readonly user_uuid?: UUID;
  readonly org_sku?: string;
  readonly name?: string;
  readonly description?: string;
  readonly cause?: string;
  readonly link?: string; // link
  readonly img?: string;
  readonly active?: Bool;

  private constructor(args : {
    org_uuid?: UUID;
    user_uuid?: UUID;
    org_sku?: string;
    name?: string;
    description?: string;
    cause?: string;
    link?: string; // link
    img?: string;
    active?: Bool;
  } = {}) {
    this.org_uuid = args.org_uuid;
    this.user_uuid = args.user_uuid;
    this.org_sku = args.org_sku;
    this.name = args.name;
    this.description = args.description;
    this.cause = args.cause;
    this.link = args.link;
    this.img = args.img;
    this.active = args.active;
  }

  static fromJSON(args : {
    [key : string]: any
  }) : UserOrgsJoin {
    let res = UserOrgsJoin.validate(args);
    if (res.isOkay) {
      let res = new UserOrgsJoin({
        org_uuid: UUID.create(args.org_uuid),
        user_uuid: UUID.create(args.user_uuid),
        org_sku: args.org_sku,
        name: args.name,
        description: args.description,
        cause: args.cause,
        link: args.link,
        img: args.img,
        active: Bool.create(args.active)
      })
      return res.toJSON();
    } else {
      throw new Error('error happens at fromJSON');
    }
  }

  static validate(args : {
    [key : string]: any
  }) : ValidationResult {
    let propValidation = {
      org_uuid: UUID.validate(args.org_uuid),
        user_uuid: UUID.validate(args.user_uuid),
        org_sku: args.org_sku,
        name: args.name,
        description: args.description,
        cause: args.cause,
        link: args.link,
        img: args.img,
        active: Bool.validate(args.active)
    }
    ValidationResult.isValid(args, propValidation)
    return {isOkay: true};
  }

  toJSON() : any {
    return {
      user_uuid: this.user_uuid.toString(),
      org_sku: this.org_sku.toString(),
      name: this.name.toString(),
      description: this.description.toString(),
      cause: this.cause.toString(),
      link: this.link.toString(),
      img: this.img.toString(),
      active: this.active.toString(),
    };
  }
}




// DUMMY COPY
// class User {
//   readonly user_uuid?: UUID;
//   readonly org_uuid?: UUID;
//   readonly active?: Bool;
//
//   private constructor(args:{
//     user_uuid?: UUID;
//     org_uuid?: UUID;
//     active?: Bool;
//   } = {}) {
//     this.user_uuid   = args.user_uuid;
//     this.org_uuid  = args.org_uuid;
//     this.active = args.active;
//   }
//
//   static fromJSON(args: {[key: string]: any}) : User {
//     let res = User.validate(args);
//     if (res.isOkay) {
//       let res = new User({
//         email: Email.create(args.email),
//       })
//       return res.toJSON();
//     } else {
//       throw new Error ('error happens at fromJSON');
//     }
//   }
//
//   static validate(args: {[key: string] : any}) : ValidationResult {
//     let propValidation = {
//       email: Email.validate(args.email),
//     }
//     ValidationResult.isValid(args, propValidation)
//     return { isOkay: true };
//   }
//
//   toJSON() : any {
//     return {
//       email: this.email.toString(),
//     };
//   }
// }

export {
  UserInputs,
  UserDB,
  UserSession,
  AlarmInputs,
  AlarmDB,
  AuthInputs,
  OrgsDB,
  UserOrgsDB,
  UserOrgsJoin,
  CartDB,  
  UserSettings,

}

