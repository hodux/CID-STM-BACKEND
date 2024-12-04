import { User } from '../interfaces/user.interface';
import userModel from '../models/user.model';
import userModelMongo from '../models/user.model';
import express, { Request, Response } from 'express';


export class UserServiceMongo {

    public static async findByEmail(email: string) {
        try{
            const user=await userModelMongo.findOne({email});
            return user;
        }catch(error){
            console.error("error",error);
            return null;
        }
      }

    public static async readUsers(){
        try{
        const users=await userModelMongo.find();
        return users;

        }catch(error){
            console.log("error",error);
        }
        return null;
    }

    public static async createUser(req:Request):Promise<User[]>{
        let users:User[]=[];
        let lenghtOfDocs=await userModel.countDocuments();
        try{
            const newUser={
                id: lenghtOfDocs+1,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                role:req.body.role // Depending in the sign up / sign in

            }
            users.push(newUser);

            await userModel.create(newUser);
            console.log("User created")
           

        }catch(error){
            console.log("error",error);
        }

        return users;

    }
}
