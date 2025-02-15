import mongoose from 'mongoose'
import validator from 'validator'

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator(val:string) : boolean{
               return val.length >= 2 && val.length <= 50
            },
            message:"User's name must be between 2 and 50 characters."
        }

    },
    email:{
        type:String,
        unique:true,
        validate:[validator.isEmail,'Invalid email format'],
        required:true,
    },
    role:{
        type:String,
        default:'user'
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator(val:string) : boolean{
               return val.length >= 2 && val.length <= 50
            },
            message:"User's password must be between 2 and 50 characters."
        }
        
    },
    passwordConfirm:{
        type:String,
        required:true,
        validate:{
            validator:function(this: { password: string },val : string):boolean{
                return this.password === val
            },
            message:'Passwords do not match!'
        }
    }
})



    
export {userSchema}