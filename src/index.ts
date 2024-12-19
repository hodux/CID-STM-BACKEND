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
import tripRoute from "./routes/trip.route";
const swaggerUi = require('swagger-ui-express');
import swaggerJsdoc = require('swagger-jsdoc');
dotenv.config();

const app = express();

app.use(cors());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    components: {
        securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
     },
    },
    security: [{
      bearerAuth: [],
    }],
    info: {
      title: 'STM API',
      version: '1.0.0',
      description: 'Swagger Api to manage STM related routes',
    },
    
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerUiOptions = {
  swaggerOptions: {
    syntaxHighlight: false, 
  },
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));

const httpPort = parseInt(process.env.HTTP || "3000", 10);
const httpsPort = parseInt(process.env.HTTPS || "3001", 10);

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
app.use("/api", tripRoute);

// Start server
const httpsApp = https.createServer(options, app).listen(httpsPort,'0.0.0.0', () => {
  console.log(`Serveur HTTPS en écoute sur <https://localhost>:${httpsPort}`);
});

http.createServer((req, res) => {
  const host = req.headers.host;
  res.writeHead(301, { "Location": `https://${host}:${httpsPort}${req.url}` });
  res.end();
}).listen(httpPort, () => {
  console.log(`Serveur HTTP en écoute sur port ${httpPort}`);
});

export default httpsApp;
