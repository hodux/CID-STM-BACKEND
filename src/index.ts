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

const port = process.env.PORT || 3001;

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

let httpApp = app;


if(process.env.NODE_ENV== "development"){
  let httpApp = https.createServer(options, app).listen(port,()=>{
    console.log("https running")
  });
  
}if(process.env.NODE_ENV== "production"){
  let httpApp=app.listen(port,()=>{
    console.log("http running")
  });
}

export default httpApp;
