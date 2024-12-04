import mongoose, {Schema} from "mongoose";
import { User } from "../interfaces/user.interface";

const userSchema=new Schema<User>({
    id:{type:Number,required: true},
    email:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true}

});

const userModel=mongoose.model("User",userSchema);

export default userModel;