import express from 'express'
import morgan from 'morgan'
import { globalErrorMiddleware } from './modules/error-handling/globalErrorMiddleware';
import userRouter from './modules/routes/userRouter'
import { CustomError } from './modules/error-handling/customError';

const app = express();

app.use(morgan('dev'));
app.use(express.json())

app.use('/api/v1',userRouter)

app.all('*',(req,res,next)=>{
    next(new CustomError(`The path ${req.originalUrl} does not exist!`,404))
})

app.use(globalErrorMiddleware)
export default app

