import dotenv from 'dotenv'
import pathModule from 'path';
import mongoose from 'mongoose';
import '../schemowares/middlewares/userMiddleware'
const path = `${pathModule.join(__dirname,'..','..','..')}/config.env`

dotenv.config({path})
import app from "../../app";

console.log({environment:process.env.NODE_ENV})

const dbConnect = async (url:string) => {
    await mongoose.connect(url)
    console.log('connection to remote database successful')

}

const server = app.listen(8000,()=>{
    console.log('server running on port 8000')
    })

process.on('unhandledRejection',(err)=>{
    server.close(()=>{
        console.log('Unhandled Rejection shutting down application!\n',err)
        process.exit(1)
    })
})

if(process.env.DB_CONNECTION_STRING){
    dbConnect(process.env.DB_CONNECTION_STRING).catch(err => console.log('error-winston: ',err))
}else{
    console.log('make sure you provide a connection string')
}


