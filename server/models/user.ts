import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  dob: Date
})

// Models = what we use to actually interact with the database
// Schemas = the blueprint for documents
const userModel = mongoose.model('User', userSchema)

export default userModel