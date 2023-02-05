import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import tripRouter from './routes/trip';
import userRouter from './routes/user';
import tripCodeRouter from './routes/tripCode';

const app = express();

dotenv.config();

// use .env not .env.local to access env file properly!

// if we don't specify a database name, we'll default the db name to "test"
const CONNECTION_URI = process.env.MONGO_ATLAS_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URI, {}, () => {
  console.log('connected!');
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {});

app.use('/trips', tripRouter);
app.use('/users', userRouter);
app.use('/trip-codes', tripCodeRouter);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});

export default app;
