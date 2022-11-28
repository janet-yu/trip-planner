import express, { Router } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import * as dotenv from 'dotenv'
import tripRouter from './routes/trip'
import userRouter from './routes/user'

const app = express()

dotenv.config()

// use .env not .env.local to access env file properly!

// if we don't specify a database name, we'll default the db name to "test"
const CONNECTION_URI = process.env.MONGO_ATLAS_URI 
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URI, {}, () => {
  console.log('connected!')
} )

app.use(express.json())

app.get('/', (req, res) => {
  res.send('We good')
})

app.use('/trips', tripRouter)
app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
  
})


export default app