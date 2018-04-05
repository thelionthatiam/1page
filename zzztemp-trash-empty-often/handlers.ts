import * as express from 'express';
import * as help from '../functions/helpers';
import * as r from '../resources/value-objects';
import { ConnectionConfig, Client } from '../../node_modules/@types/pg/index'; // pg types
const router = express.Router();

interface AuthInputs {
  email:'string';
  password:'string';
}

interface AuthRender {
  email:string;
}


class BaseRequestHandler {
  req:Express.Request;
  res:Response;
  inputs:any;
  querySvc:any;
  nextPage:string;
  errPage:string;

  constructor(req:any, res:any, nextPage:string, errPage:string)  {
    this.req = req;
    this.res = res;
    this.inputs = req.query;
    this.querySvc = req.querySvc;
    this.nextPage = nextPage;
    this.errPage = errPage;
  }

  handler() {
    this.querySvc.getUserViaEmail([this.inputs.email])
      .then((result : any) => {
        return r.UserDB.fromJSON(result.rows[0])
      })
      .then((result : r.UserDB) => {
        this.onSuccess(result);
      })
      .catch((error:Error) => {
        this.onFailure(error)
      })
  }

  onSuccess(renderObj:any) {
    return this.res.render(this.nextPage, renderObj)
  }

  onFailure(error:Error) {
    return this.res.render(this.errPage, { dbError: error })
  }
}


export { router, BaseRequestHandler };
