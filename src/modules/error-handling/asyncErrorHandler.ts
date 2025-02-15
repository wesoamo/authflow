import { RegularMiddlewareFunction } from '../types/types';

const asyncErrorHandler = (func : RegularMiddlewareFunction )=>{
    const returnedMiddleware :RegularMiddlewareFunction = async (req,res,next) => {
        func(req,res,next).catch(error => next(error))
    }
    return returnedMiddleware
}

export {asyncErrorHandler}