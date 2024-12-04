import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

// Start server
app.listen(port, () => {
  console.log(`Server running at <http://localhost:${port}>`);
});
