import {describe, expect, test} from '@jest/globals';
import { UserService } from "../../services/user.service";
import {User} from "../../models/user.model";
import {DB_connection} from "../../config/database.config";
import dotenv from "dotenv";
import {AuthService} from "../../services/auth.service";
dotenv.config();
const uri = process.env.MONGO_URI_TEST as string;
beforeAll(async () => {
    DB_connection(uri);
    await User.deleteMany({"username":"Test"});
});
afterAll(async () => {
    await User.deleteMany({"username":"Test"});
});
describe("Auth service", () => {
    describe("right login", () => {
        test("Should return JWT token", async () => {
            const user = await UserService.createNewUser("Test", "john@test.com", "abc-123");
            const token = await AuthService.login("john@test.com", "abc-123");
            const decoded = await AuthService.verifyToken(token);
            expect(decoded.id).toBe(user.data.data.id);
        })
    })
    describe("bad login", () => {
        test("Should return User or email not found", async () => {
            const token = await AuthService.login("test2daasdsasddas@gmail.com", "abc-123");
            expect(token).toBe("User or email not found");
        })
       
    })
})