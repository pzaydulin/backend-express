import { Request } from "express";

export interface IUser {
  _id: string;
  email: string;
  name: string;
  token?: string;
}

export interface IRequest extends Request {
  user?: IUser;
}
