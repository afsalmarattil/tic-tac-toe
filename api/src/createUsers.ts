import mongoose from 'mongoose';
import User from './models/User';

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/tic-tac-toe';


const createUsers = async () => {
    mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
  
  try {
    const user1 = new User({ name: 'Player X', avatar: 'https://docs.material-tailwind.com/img/face-1.jpg', wins: 0,  symbol: "X" });
    const user2 = new User({ name: 'Player O', avatar: 'https://docs.material-tailwind.com/img/face-2.jpg', wins: 0 , symbol: "O",});

    await user1.save();
    await user2.save();

    console.log('Users created successfully.');
  } catch (err) {
    console.error('Error creating users:', (err as Error).message);
  } finally {
    mongoose.disconnect();
  }
};

createUsers();
