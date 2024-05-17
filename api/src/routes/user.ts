
import { Router, Request, Response } from 'express';
import User, { IUser } from '../models/User';

const router: Router = Router();

router.post('/users', async (req: Request, res: Response) => {
  const { name, avatar } = req.body;
  const newUser = new User({ name, avatar });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});


router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});


router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});


router.patch('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.wins = req.body.wins || user.wins;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});


export { router as userRoutes };
