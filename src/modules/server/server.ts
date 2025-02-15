import dotenv from 'dotenv'
import pathModule from 'path';

const path = `${pathModule.join(__dirname,'..','..','..')}/config.env`

dotenv.config({path})
import app from "../../app";

console.log({environment:process.env.NODE_ENV})
app.listen(8000,()=>{
console.log('server running on port 8000')
})

