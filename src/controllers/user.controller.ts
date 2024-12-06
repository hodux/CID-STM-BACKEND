import { UserServiceMongo } from "../services/user.service";
import { Request, Response } from 'express';

export class UserController{
    static async getUser(req:Request, res:Response){
        try{

        }
        catch(error){
            res.status(400).json({message:"Requete Invalide"})
        }
    }
}
