import { userSchema } from "../schemas/userSchema";
import mongoose from "mongoose";

const UserModel = mongoose.model('User',userSchema);

export {UserModel}



console.log(3)