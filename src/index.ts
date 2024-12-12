import express, { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {UserService} from "./services/user.service";
import {User} from "./models/user.model";
import userRoutes from './routes/user.route';
import authRoute from "./routes/auth.route";
import cors from 'cors';
import {DB_connection} from "./config/database.config";
import * as http from "node:http";
dotenv.config();

const app = express();
app.use(cors());

const httpPort = process.env.HTTP || 3000;
const httpsPort = process.env.HTTPS || 3001;
const keyPath = process.env.SSL_KEY_PATH as string;
const certPath = process.env.SSL_CERT_PATH as string;
const uri = process.env.MONGO_URI as string;

app.use(express.json());
const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
};

// Mongoose connection
DB_connection(uri);

// Base route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use("/api", userRoutes);
app.use("/api", authRoute);
// Start server
https.createServer(options, app).listen(httpsPort, () => {
  console.log(`Serveur HTTPS en écoute sur <https://localhost>:${httpsPort}`);
});
http.createServer((req, res) => {
  res.writeHead(301, { "Location": `https://localhost:${httpsPort}${req.url}` });
  res.end();
}).listen(httpPort, () => {
  console.log(`Serveur HTTP en écoute sur <http://localhost>:${httpPort}`);
});
// console.log(UserService.createNewUser("test3", "test3@test.com", "abc-123"));
// console.log(UserService.deleteUser("6754e43eb522b8b842c2714d"))
