import { Request, Response } from 'express';
import { UserService } from '../services/user.service';


export class UserController {
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await UserService.getAllUsers();
        if(!users){
            res.status(404).json({"message":"No users found."});
        }
        res.status(200).json(users);
    };
    public async createNewUser(req: Request, res: Response): Promise<void> {
        let name = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        const newUser = await UserService.createNewUser(name,email,password);
        res.status(newUser.http).json(newUser.data);
    };
    public async updateUser(req: Request, res: Response): Promise<void> {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let id = req.params.id;
        const updateUser = await UserService.modifyUser(id,username,email,password);
        res.status(updateUser.http).json({"message":updateUser.data});
    };
    public async deleteUser(req: Request, res: Response): Promise<void> {
        let id = req.params.id;
        const deletedUser = await UserService.deleteUser(id);
        console.log(deletedUser);
        res.status(deletedUser.http).json({"message":deletedUser.data});
    }

}
