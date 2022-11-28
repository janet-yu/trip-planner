import mongoose, { model, Schema } from 'mongoose';

const tripSchema = new Schema(
  {
    title: String,
    placeReferenceId: String, // This'll help us populate trip locatino details
    startDate: Date,
    endDate: Date,
    activities: Array,
    people: Array,
    userId: String,
  },
  { timestamps: true }
); // timestamps automatically generates timestamps for us

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
