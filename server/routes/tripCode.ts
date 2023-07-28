import { Router } from 'express';
import randomstring from 'randomstring';
import Trip from '../models/trip';
import TripCode from '../models/tripCode';

const tripCodeRouter = Router();

tripCodeRouter.post('/', async (req, res) => {
  const { tripId } = req.body;

  let generatedCode = false;

  while (!generatedCode) {
    const tripCode = randomstring.generate(7);
    const existingTripCode = await TripCode.findOne({
      $or: [{ code: tripCode }, { tripId }],
    });

    if (!existingTripCode) {
      generatedCode = true;

      const code = await TripCode.create({
        tripId,
        active: true,
        expiresAt: new Date(),
        code: tripCode,
      });

      res.status(200).send({
        code,
      });
    }

    if (existingTripCode) {
      res.status(200).send({
        code: existingTripCode,
      });
    }
  }
});

tripCodeRouter.get('/:code/trip', async (req, res) => {
  const { code } = req.params;

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

export default tripCodeRouter;
