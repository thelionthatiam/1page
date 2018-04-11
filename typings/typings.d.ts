import { ConnectionConfig, Client, QueryResult } from './../node_modules/@types/pg/index'; // pg types
import { Request, Response, RequestHandler } from './../node_modules/@types/express-serve-static-core/index';
// import { compare } from './../node_modules/@types/bcrypt/index'
import OrgSvc from '../src/logic/logic-organizations';
import AuthSvc from '../src/logic/logic-authorization';
import CreateAcctSvc from '../src/logic/logic-accounts';
import SettingsSvc from '../src/logic/logic-settings';
import PaymentsSvc from '../src/logic/logic-payments';
import ProfileSvc from '../src/logic/logic-profile';
import AlarmSvc from '../src/logic/logic-alarms';
import { SessionCheckSvc } from '../src/logic/logic-middleware';
import QuerySvc from '../src/data-access/queries';
// import QuerySvc from '../src/data-access/queries';
import * as R from '../src/services/value-objects';
import * as V from '../src/services/validation';
// import { session } from './../node_modules/@types/express-session/index';

interface Alarm {
  user_uuid: string;
  awake: string;
  thedate: string;
  title: string;
  active: boolean;
}

export interface Client {
  query(queryText: string, values?: any[]): Promise<QueryResult>;
  release(err?: Error): void; 
}

export interface QueryResult {}

declare global {
  namespace Express {
    interface Request {
      AuthSvc : AuthSvc;
      querySvc : QuerySvc;
      CreateAcctSvc : CreateAcctSvc; 
      OrgSvc : OrgSvc;
      SettingsSvc: SettingsSvc;
      SessionCheckSvc:SessionCheckSvc;
      PaymentsSvc:PaymentsSvc;
      AlarmSvc:AlarmSvc;
      ProfileSvc:ProfileSvc;
    }
  } 
}


interface ModResponse extends Response {
  render(view: string, options?: Object, callback?: (err: Error, html: string) => void): void;
  render(view: string, callback?: (err: Error, html: string) => void): void;
}

interface ModHandlerParams extends RequestHandler {
  name: [()=> any, void]
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.json" {
  const value: any;
  export default value;
}
