import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const tokenRouter = Router();

tokenRouter.get('/refresh', async (req, res) => {
  const { cookies } = req;

  if (!cookies.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);

    const accessToken = jwt.sign(
      {
        username: decoded.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );

    res.json({
      accessToken,
      user: foundUser,
    });
  });
});

export default tokenRouter;
