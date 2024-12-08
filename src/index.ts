import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {UserService} from "./services/user.service";
import {User} from "./models/user.model";
import userRoutes from './routes/user.route';
import authRoute from "./routes/auth.route";
dotenv.config();

const app = express();


const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI as string;

app.use(express.json());

// Mongoose connection
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Base route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use("/api", userRoutes);
app.use("/api", authRoute);
// Start server
app.listen(port, () => {
  console.log(`Server running at <http://localhost:${port}>`);
});
// console.log(UserService.createNewUser("test3", "test3@test.com", "abc-123"));
// console.log(UserService.deleteUser("6754e43eb522b8b842c2714d"))
