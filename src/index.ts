import express, { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route';
import authRoute from "./routes/auth.route";
import vehicleRoute from "./routes/vehicle.route";
import cors from 'cors';
import {DB_connection} from "./config/database.config";
import {loadCertificate} from "./middlewares/certificat.middleware";
import * as http from "node:http";
dotenv.config();

const app = express();
app.use(cors());

const httpPort = process.env.HTTP || 3000;
const httpsPort = process.env.HTTPS || 3001;

const uri = process.env.MONGO_URI as string;

app.use(express.json());
const options = loadCertificate();

// Mongoose connection
DB_connection(uri);

// Base route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use("/api", userRoutes);
app.use("/api", authRoute);
app.use("/api", vehicleRoute)

// Start server
const httpsApp = https.createServer(options, app).listen(httpsPort, () => {
  console.log(`Serveur HTTPS en écoute sur <https://localhost>:${httpsPort}`);
});

http.createServer((req, res) => {
  res.writeHead(301, { "Location": `https://localhost:${httpsPort}${req.url}` });
  res.end();
}).listen(httpPort, () => {
  console.log(`Serveur HTTP en écoute sur <http://localhost>:${httpPort}`);
});

export default httpsApp;
