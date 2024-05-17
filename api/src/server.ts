
import express, { Application } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { userRoutes } from './routes/user'; // Ensure this path is correct

const app: Application = express();
const port: number = 3001;


app.use(bodyParser.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/tic-tac-toe';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));


app.use('/api', userRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
