import { asyncErrorHandler } from "../error-handling/asyncErrorHandler";
import { RegularMiddlewareFunction } from "../types/types";
import { UserModel } from "../schemowares/models/userModel";
import { CustomError } from "../error-handling/customError";

const GetUsers : RegularMiddlewareFunction = asyncErrorHandler(async(req,res,next) => {
    const users = await UserModel.find()
    res.status(200).json({
        status:'success',
        data : {
            users
        }
    })
})


const GetUser : RegularMiddlewareFunction = asyncErrorHandler(async(req,res,next) => {
    const user = await UserModel.find({_id:req.params.id})
    
    if (user.length < 1) return next(new CustomError(`User with the ID: ${req.params.id} not found`,404))

    res.status(200).json({
        status:'success',
        data : {
            user
        }
    })
})

const CreateUser : RegularMiddlewareFunction = asyncErrorHandler(async(req,res,next) => {
    const user = await UserModel.create(req.body)
    res.status(200).json({
        status:'success',
        data : {
            user
        }
    })
})
export { GetUser, GetUsers, CreateUser }