import { IUser } from '../interfaces/user.interface';
import mongoose from 'mongoose';

const schema = new mongoose.Schema<IUser>({
    email: {type: String, required: true},
    username: {type: String, required: true},
    password:{type: String, required: true},
    role:{ type: String, enum: ["administrator", "employee"], required: true}
})
export const User = mongoose.model('user', schema);