import { Router } from 'express';
import Trip from '../models/trip';

const tripRouter = Router();

tripRouter.post('/', async (req, res) => {
  try {
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

    res.status(201).send(trip);
  } catch (err) {
    res.status(400).send('Failed to create trip');
  }
});

tripRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const trip = await Trip.findById(id);

  res.status(200).send(trip);
});

tripRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const trip = await Trip.findById(id);
  const updates = {};

  // https://medium.com/@isuru89/a-better-way-to-implement-http-patch-operation-in-rest-apis-721396ac82bf
  const { op, field, value } = req.body;

  if (op && op === 'add') {
    // check for duplicates
    updates[field] = trip[field].concat(value);

    console.log({ updates, field: trip[field], value });
  }

  if (op && op === 'replace') {
    updates[field] = value;
  }

  const updatedTrip = await Trip.findByIdAndUpdate(id, updates, { new: true });

  res.status(200).send(updatedTrip);
});

export default tripRouter;
