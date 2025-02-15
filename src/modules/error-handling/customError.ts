class CustomError extends Error {
    statusCode : number;
    status: string;
    isOperational:true;

    constructor(message : string,statusCode : number){
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail': 'error'
        this.isOperational = true
        Error.captureStackTrace(this,this.constructor)
    }
}

export {CustomError}