import * as http from 'http';
import { ILoginResult, IUser } from '../interfaces/IUserRepository';

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    resultLogin: ILoginResult;
    logedUser: IUser;
  };
};