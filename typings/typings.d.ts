import { ConnectionConfig, Client, QueryResult } from './../node_modules/@types/pg/index'; // pg types
import { Request, Response, RequestHandler } from './../node_modules/@types/express-serve-static-core/index';
import { OrgSvc } from '../src/logic/logic-organizations';
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
