import { Router } from 'express';
import randomstring from 'randomstring';
import Trip from '../models/trip';
import TripCode from '../models/tripCode';

const tripCodeRouter = Router();

tripCodeRouter.post('/', async (req, res) => {
  const { tripId } = req.body;

  const existingTripCode = await TripCode.findOne({
    tripId,
  });

  if (!existingTripCode) {
    let generated = false;

    while (!generated) {
      const generatedCode = randomstring.generate(7);
      const existingTripCode = await TripCode.findOne({
        $or: [{ code: generatedCode }, { tripId }],
      });

      if (!existingTripCode) {
        generated = true;

        const tripCode = await TripCode.create({
          tripId,
          active: true,
          expiresAt: new Date(),
          code: generatedCode,
        });

        res.status(200).send({
          code: tripCode.code,
        });
      }
    }
  }

  res.status(200).send({
    code: existingTripCode.code,
  });
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
