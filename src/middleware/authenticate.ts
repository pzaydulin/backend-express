import { sign, verify } from "jsonwebtoken";
import { IUser } from "../models/common.model";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../db/user";
import { merge } from "lodash";

const SECRET_KEY = "sagf!@dh345FTgd7dRGDFG7asd45aesytyTrE%67*&a";
export const generateToken = (data: IUser) => {
  const token = sign(data, SECRET_KEY, {
    expiresIn: "1day",
  });
  return token;
};

export const validateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.headers.authorization;

  if (authorization) {
    const token = authorization.split(" ")[1];
    try {
      const user: IUser = verify(token, SECRET_KEY) as IUser;
      const isTokenValid = await tokenValidation(user.email, token);
      if (user && isTokenValid) {
        merge(request, { user });
        return next();
      }
    } catch (error) {
      return response
        .status(401)
        .json({ status: false, message: "Unauthorized" });
    }
  }
  return response
    .status(401)
    .json({ status: false, message: "Access denied. No token provided." });
};

const tokenValidation = async (email: string, token: string) => {
  const user = await UserModel.findOne({ email, token });

  return user ? true : false;
};
