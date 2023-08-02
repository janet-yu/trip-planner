import { model, Schema, Types } from 'mongoose';

const tripSchema = new Schema(
  {
    title: String,
    placeReferenceId: String, // This'll help us populate trip location details
    lodging: [
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
        notes: String,
      },
    ],
    people: [
      {
        userId: Types.ObjectId,
      },
    ],
    userId: String,
  },
  { timestamps: true }
); // timestamps automatically generates timestamps for us

const Trip = model('Trip', tripSchema);

export default Trip;
