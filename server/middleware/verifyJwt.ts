import jwt from 'jsonwebtoken';

const verifyJwt = (req, res, next) => {
  // the request header should have the jwt token
  const authHeader = req.headers.authorization;

  if (!authHeader) res.status(401);

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // invalid token, forbidden
    req.user = decoded.username;
    next();
  });
};

export default verifyJwt;
