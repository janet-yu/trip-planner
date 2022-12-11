import { Router } from 'express';
import Trip from '../models/trip';
import randomstring from 'randomstring';
import TripCode from '../models/tripCode';

const tripCodeRouter = Router();

tripCodeRouter.post('/', async (req, res) => {
  const {
    title,
    placeReferenceId,
    startDate,
    endDate,
    activities,
    people, // list of reference IDs
    userId,
  } = req.body;

  const trip = await Trip.create({
    title,
    placeReferenceId,
    startDate,
    endDate,
    activities,
  });

  let generatedCode = false;

  while (!generatedCode) {
    const tripCode = randomstring.generate(7);
    const existingTripCode = await TripCode.findOne({
      code: tripCode,
    });

    if (!existingTripCode) {
      generatedCode = true;

      const code = await TripCode.create({
        tripId: trip._id,
        active: true,
        expiresAt: new Date(),
        code: tripCode,
      });

      res.status(200).send({
        code,
      });
    }
  }
});

tripCodeRouter.get('/:code', async (req, res) => {
  const code = req.params.code;

  const tripCode = await TripCode.findOne({
    code,
  });

  if (!tripCode) {
    throw new Error();
  }

  const trip = await Trip.findById(tripCode.tripId);

  if (!trip) {
    throw new Error();
  }

  res.status(200).send(trip);
});
