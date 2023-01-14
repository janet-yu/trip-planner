import mongoose, { model, Schema } from 'mongoose';

const tripSchema = new Schema(
  {
    title: String,
    placeReferenceId: String, // This'll help us populate trip location details
    accommodations: [
      {
        referenceId: String,
        checkinDate: Date,
        checkoutDate: Date,
      },
    ], // This represents where the user is staying, which can be multiple places
    startDate: Date,
    endDate: Date,
    itinerary: [
      {
        referenceId: String,
        date: Date,
      },
    ],
    people: Array,
    userId: String,
  },
  { timestamps: true }
); // timestamps automatically generates timestamps for us

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
