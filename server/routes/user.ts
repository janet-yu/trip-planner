import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import GoogleAPIService from '../lib/googleAPI';
import User from '../models/user';
import Trip from '../models/trip';
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
    res.status(500).json({
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
        const accessToken = jwt.sign(
          {
            username: user.username,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '30s',
          }
        );
        const refreshToken = jwt.sign(
          {
            username: user.username,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: '1d',
          }
        );

        // save the refresh token in the db
        user.refreshToken = refreshToken;
        await user.save();

        // Using an HttpOnly cookie, meaning only the server can access this set cookie.
        // Client side code cannot access this cookie, it won't be stored in the browser's cookie
        // storage.
        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          // secure: false,
          sameSite: 'none', // ADDING THESE OPTIONS CAUSED THE COOKIES TO NOT SEND??
          secure: true,
        });
        res.status(200).json({
          status: RESPONSE_STATUSES.success,
          data: {
            user,
            accessToken,
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

userRouter.get('/:id/trips', async (req, res) => {
  const userId = req.params.id;
  const trips = await Trip.find({
    userId,
  });

  const tripResults = [];

  for (const place of trips) {
    const response = await GoogleAPIService.getPlaceDetails(
      place.placeReferenceId
    );

    tripResults.push({
      // @ts-ignore
      id: place._id,
      details: {
        ...place.toObject(),
        ...response.data.result,
      },
    });
  }

  return res.status(200).json({
    status: RESPONSE_STATUSES.success,
    data: {
      trips: tripResults,
    },
  });
});

export default userRouter;
