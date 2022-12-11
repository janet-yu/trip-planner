import mongoose, { model, Schema } from 'mongoose';

const tripCodeSchema = new Schema(
  {
    code: String,
    active: Boolean,
    expiresAt: Date,
    tripId: String,
  },
  { timestamps: true }
); // timestamps automatically generates timestamps for us

const TripCode = mongoose.model('TripCode', tripCodeSchema);

export default TripCode;
