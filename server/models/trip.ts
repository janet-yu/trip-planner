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
        next: {
          type: Types.ObjectId,
          default: null,
        },
        prev: {
          type: Types.ObjectId,
          default: null,
        },
        data: {
          referenceId: String,
          date: Date,
          notes: String,
        },
      },
    ],
    people: [
      {
        userId: Types.ObjectId,
      },
    ],
    // MUST BE AN OBJECT ID, otherwise if you attempt to query by Object Id and this type is a string, mongoose won't query correctly
    userId: Types.ObjectId,
  },
  { timestamps: true }
); // timestamps automatically generates timestamps for us

const Trip = model('Trip', tripSchema);

export default Trip;
