import express, { Router } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const { username, password, name, dob } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPass,
      name,
      dob,
    });

    res.status(201).send(user);
  } catch (err) {
    res.status(400).send('Failed to create user.');
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username,
    });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        res.status(200).send(user);
      } else {
        res.status(400).send('Invalid password.');
      }
    } else {
      res.status(401).send('No user with this username.');
    }
  } catch (err) {
    res.status(500).send('Something went wrong.');
  }
});

export default userRouter;
