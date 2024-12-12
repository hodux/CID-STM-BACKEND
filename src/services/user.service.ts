import { User } from '../models/user.model';
import { logger } from '../utils/logger';
import bcrypt from 'bcryptjs';

export class UserService {

    public static async getAllUsers(){
        try {
            const users = await User.find({username:{ $ne: "admin"}});
            logger.info("The user's list have been recuperated ");
            return users;
        } catch (error) {
            logger.error("Not able to recuperate the users Error:"+ error);
        }
    }
    public static async createNewUser(name:string, email:string, password: string) {
        let code:number;
        let message:any;
        let encryptedPwd = await bcrypt.hash(password, 10);
        const user = new User({
            username: name,
            email:email,
            password:encryptedPwd,
            role:"employee"
        })
        try {
            const newUser = await user.save();
            message = {"mess": "The user have been created", "data":newUser};
            logger.info(message);
            code = 201;
        } catch (error) {
            message = {"mess":"Something bad happen","data":error};
            logger.error(message);
            code = 404
        }
        return {data :message, http: code};
    }
    public static async modifyUser(id:string,name:string, email:string, password: string){
        let code:number;
        let message:any;
        let encryptedPwd = await bcrypt.hash(password, 10);
        let updatedData = {
            username:name,
            email:email,
            password:encryptedPwd,
        }
        try {
            const res = await User.findByIdAndUpdate(id, updatedData,{new: true})
            code = 200;
            message = {"mess": "The product have been modified", "data":res};
            logger.info(message);

        } catch (error) {
            message = "Something bad happen:" + error;
            logger.error(message);
            code = 400
        }
        return {data: message, http: code}
    }
    public static async deleteUser(id:string){
        let code:number;
        let message:string;
        try {
            const res = await User.findByIdAndDelete(id);
            code = 204;
            message = "The product have been deleted"
            logger.info(message);
        } catch (error) {
            message = "Something bad happen:" + error;
            logger.error(message);
            code = 400
        }
        return {data: message, http: code}
    }
    public static async findByEmail(email: string) {
        let message:any;
        let code:number;
        try {
            message = await User.findOne({email:email})
            if(message != null){
                logger.info("The user have been found" + message);
                code = 200;
            }
            else{
                message = "The user not found"
                logger.info(message);
                code = 404;
            }
        }catch (error) {
            message = "Something bad happen:" + error;
            logger.error(message);
            code = 400
        }
        return {data: message , http: code }
    }
}