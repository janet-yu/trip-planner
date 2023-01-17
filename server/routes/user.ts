import { Router } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import { RESPONSE_STATUSES } from './utils/types';

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const { username, password, firstName, lastName, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPass,
      email,
      firstName,
      lastName,
    });

    res.status(201).json({
      status: RESPONSE_STATUSES.success,
      data: {
        user,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({
        status: RESPONSE_STATUSES.error,
        message: 'Failed to create user.',
      });
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
        res.status(200).json({
          status: RESPONSE_STATUSES.success,
          data: {
            user,
          },
        });
      } else {
        res.status(400).json({
          status: RESPONSE_STATUSES.fail,
          message: 'Invalid password.',
        });
      }
    } else {
      res.status(401).json({
        status: RESPONSE_STATUSES.fail,
        message: 'No user with this username.',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: RESPONSE_STATUSES.error,
      message: 'Something went wrong.',
    });
  }
});

export default userRouter;
