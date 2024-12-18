import request from 'supertest';
import app from "../../index"
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import {describe, expect, test} from '@jest/globals';
import { UserService } from "../../services/user.service";
import { loadCertificate } from '../../middlewares/certificat.middleware';
import bcrypt from "bcryptjs";
const uri = process.env.MONGO_URI_TEST as string;
const certificate = loadCertificate();
let token: string;
let token_admin: string;
let id: string;
beforeAll(async ()  => {
    await User.deleteMany({"username":"AuthTest"});
    await User.deleteMany({"username":"userTest"});
    const user = await UserService.createNewUser("AuthTest","authtest@gmail.com","abc-123");
    id = user.data.data.id;
    token = await AuthService.login("authtest@gmail.com", "abc-123");
    const user1 = new User({
        username: "AuthTest",
        email:"admin@test.com",
        password:await bcrypt.hash("abc-123", 10),
        role:"administrator"
    })
    const newuser = await user1.save();
    token_admin = await AuthService.login("admin@test.com", "abc-123");
});
afterAll(async ()=> {
    await User.deleteMany({"username":"AuthTest"});
    await User.deleteMany({"username":"userTest"});
})
describe("Get All User as user", () => {
    it("Should return a list of user", async () => {
        const res = await request(app)
            .get('/api/users')
            .auth(token, {type:'bearer'})
            .key(certificate.key)
            .cert(certificate.cert)
            .trustLocalhost(true)
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toBe(7);
    })
})
describe("POST create User", () => {
    it("Should return the created user with http code and a message", async () => {
        // any user should be able to create an account without any token
        const res = await request(app)
            .post('/api/users')
            .key(certificate.key)
            .cert(certificate.cert)
            .trustLocalhost(true)
            .send({
                "username": "userTest",
                "email":"user2@gmail.com",
                "password":"abc-123"
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body.mess).toBe('The user have been created');
        expect(res.body.data.email).toBe('user2@gmail.com');
    })
})
describe("PUT modify User", () => {
    it("Should return the modified user with http code and a message", async () => {
        const res = await request(app)
            .put('/api/users/'+id)
            .auth(token, {type:'bearer'})
            .key(certificate.key)
            .cert(certificate.cert)
            .trustLocalhost(true)
            .send({
                "username": "AuthTest",
                "email":"modifiedAuthTest@gmail.com",
                "password":"abc-123"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.mess).toBe('The product have been modified');
        expect(res.body.data.email).not.toBe('authtest@gmail.com');
    })
})
// User cannot delete
describe("DELETE User", () => {
    it("Should return token authentification error", async () => {
        const res = await request(app)
            .delete('/api/users/'+id)
            .auth(token, {type:'bearer'})
            .key(certificate.key)
            .cert(certificate.cert)
            .trustLocalhost(true)
        expect(res.statusCode).toEqual(403)
        expect(res.body.message).toBe('Access denied.');
    })
})
// Only testing delete because its currently the only endpoint where the admin is necessary
describe("DELETE User as admin", () => {
    it("Should return 204 http code", async () => {
        const res = await request(app)
            .delete('/api/users/'+id)
            .auth(token_admin, {type:'bearer'})
            .key(certificate.key)
            .cert(certificate.cert)
            .trustLocalhost(true)
        expect(res.statusCode).toEqual(204)
    })
})