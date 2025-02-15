import { ErrorMiddlewareFunction } from "../types/types";
import { CustomError } from "./customError";

const validationError = (error:any) => {
    const validationErrorMessages = Object.values(error.errors).map((el: any) => {
        return el.properties.message;
    });
    const message = `Validation failed: ${validationErrorMessages.join(', ')}`;
    return new CustomError(message, 400);
};

const castError = (error : any) => {
    return new CustomError(`Invalid ID format`,400)
}

const duplicateKeyError = (error : any) => {
    const duplicateField = Object.keys(error.keyValue)[0];
    const duplicateValue = Object.values(error.keyValue)[0];

    const message = `The value: ${duplicateValue} provided for the field: ${duplicateField} already exists`
    return new CustomError(message,400)
}

const globalErrorMiddleware: ErrorMiddlewareFunction = async (err, req, res, next) => {

    if (err.name == 'ValidationError') err = validationError(err);
    if (err.name == 'CastError') err = castError(err)
    if (err.code === 11000) err = duplicateKeyError(err)

    const statusCode: number = err.statusCode || 500;
    const status: string = err.status || 'error';
        
    if (process.env.NODE_ENV === 'production') {
        if (err.isOperational) {
            res.status(statusCode).json({
                status,
                message: err.message
            });
        } else {
            console.log({winston : {error:err}})
            res.status(500).json({
                status: 'error',
                message: 'something went wrong'
            });
        }
    } else if (process.env.NODE_ENV === 'development') {
        console.log('development')
        res.status(statusCode).json({
            status,
            message: err.message,
            stackTrace: err.stack,
            error: err,
        });
    }
};

export { globalErrorMiddleware };