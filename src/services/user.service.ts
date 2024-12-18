import { User } from '../models/user.model';
import { logger } from '../utils/logger';
import bcrypt from 'bcryptjs';

export class UserService {

    public static async getAllUsers(){
        try {
            const users = await User.find({username:{ $ne: "admin"}});
            logger.info("The user's list has been recuperated ");
            return users;
        } catch (error) {
            logger.error("Not able to recuperate the user. Error: "+ error);
        }
    }

    public static async createNewUser(name: string, email: string, password: string) {
        let code: number;
        let message: any;
    
        try {
            const existingUser = await User.findOne({ $or: [{ email }, { username: name }] });
            if (existingUser) {
                code = 409;
                message = { mess: "User with this email or username already exists" };
                logger.info(message);
                return { data: message, http: code };
            }

            const encryptedPwd = await bcrypt.hash(password, 10);
        
            const user = new User({
                username: name,
                email: email,
                password: encryptedPwd,
                role: "employee"
            });
    
            const newUser = await user.save();
            message = { mess: "The user has been created", data: newUser };
            logger.info(message);
            code = 201;
        } catch (error) {
            message = { mess: "Something bad happened", data: error };
            logger.error(message);
            code = 500;
        }
        return { data: message, http: code };
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
            message = {"mess": "The user has been modified", "data":res};
            logger.info(message);

        } catch (error) {
            message = "Something bad happened:" + error;
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
    public static async findByEmailOrUsername(identifier: string) {
        let message: any;
        let code: number;
        try {
            message = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
            if (message != null) {
                logger.info("The user has been found: " + message);
                code = 200;
            } else {
                message = "The user has not been found";
                logger.info(message);
                code = 404;
            }
        } catch (error) {
            message = "Something bad happened:" + error;
            logger.error(message);
            code = 400;
        }
        return { data: message, http: code };
    }
}