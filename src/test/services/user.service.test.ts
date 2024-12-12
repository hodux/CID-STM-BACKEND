import {describe, expect, test} from '@jest/globals';
import { UserService } from "../../services/user.service";
import {User} from "../../models/user.model";
import {DB_connection} from "../../config/database.config";
import dotenv from "dotenv";
import {notEqual} from "node:assert";
dotenv.config();
const uri = process.env.MONGO_URI_TEST as string;
beforeAll(async () => {
    DB_connection(uri);
    await User.deleteMany({"username":"Test"});
});
afterAll(async () => {
    await User.deleteMany({"username":"Test"});
});
describe("user service", () => {
    describe("User creation", () => {
        test("Should return the new user with a message and a http code", async () => {
            const user = await UserService.createNewUser("Test","test@gmail.com","abc-123");
            expect(user.http).toBe(201);
        })
    })
    describe("Get All Users", () => {
        test("Should return the full user's list", async () => {
            const users = await UserService.getAllUsers();
            expect(users?.length).toBe(1);
        })
    })
    describe("Modify User by id", () => {
        test("Should return the new user with a message and a http code", async () => {
            const user = await UserService.createNewUser("Test","test@gmail.com","abc-123");
            let id = user.data.data.id;
            const email = user.data.data.email;
            const modifiedUser = await UserService.modifyUser(id,"Test", "modiftest@gmail.com","abc-123");
            const modifiedEmail = modifiedUser.data.data.email;
            expect(modifiedUser.http).toBe(200);
            expect(email).not.toBe(modifiedEmail);
        })
    })
    describe("Delete User by id", () => {
        test("Should return a message and a http code", async () => {
            const user = await UserService.createNewUser("Test","test@gmail.com","abc-123");
            let id = user.data.data.id;
            const res = await UserService.deleteUser(id);
            expect(res.http).toBe(204);
            expect(res.data).toBe("The product have been deleted");
        })
    })
})

