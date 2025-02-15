import { Request, Response, NextFunction } from 'express';

type RegularMiddlewareFunction = (req:Request,res:Response,next:NextFunction) => Promise<any>
type ErrorMiddlewareFunction = (err:any,req:Request,res:Response,next:NextFunction) => Promise<any>
export {RegularMiddlewareFunction,ErrorMiddlewareFunction}