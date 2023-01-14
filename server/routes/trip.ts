import { Router } from 'express';
import Trip from '../models/trip';
import GoogleAPIService from '../lib/googleAPI';

enum PATCH_OPERATIONS {
  add = 'add',
  remove = 'remove',
  replace = 'replace',
}

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

  const response = await GoogleAPIService.getPlaceDetails(
    trip.placeReferenceId
  );

  res.status(200).send({
    ...trip.toObject(),
    ...response.data.result,
  });
});

tripRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const trip = await Trip.findById(id);
  const updates = {};

  // https://medium.com/@isuru89/a-better-way-to-implement-http-patch-operation-in-rest-apis-721396ac82bf
  const { op, field, value } = req.body;

  if (op && op === PATCH_OPERATIONS.add) {
    // check for duplicates
    updates[field] = trip[field].concat(value);
  }

  if (op && op === PATCH_OPERATIONS.replace) {
    updates[field] = value;
  }

  if (op === PATCH_OPERATIONS.remove) {
    if (trip[field].length !== undefined) {
      // If the value is an object with an ID, this suggests
      // we want to remove an object from an array
      if (value.id) {
        updates[field] = trip[field].filter((el) => {
          return el._id.toString() !== value.id;
        });
      } else {
        // Else, we want to remove a primitive
        updates[field] = trip[field].filter((el) => el === value);
      }
    }
  }

  const updatedTrip = await Trip.findByIdAndUpdate(id, updates, { new: true });

  res.status(200).send(updatedTrip);
});

tripRouter.get('/:id/accommodations', async (req, res) => {
  const { id } = req.params;
  const trip = await Trip.findById(id);

  let accommodations = [];

  for (const acc of trip.accommodations) {
    const response = await GoogleAPIService.getPlaceDetails(acc.referenceId);

    accommodations.push({
      // @ts-ignore
      id: acc._id,
      details: {
        ...response.data.result,
      },
    });
  }

  res.status(200).json({
    accommodations,
  });
});

tripRouter.get('/:id/itinerary', async (req, res) => {
  const { id } = req.params;
  const trip = await Trip.findById(id);

  let itinerary = [];

  for (const activity of trip.itinerary) {
    const response = await GoogleAPIService.getPlaceDetails(
      activity.referenceId
    );

    itinerary.push({
      // @ts-ignore
      id: activity._id,
      details: {
        ...response.data.result,
      },
    });
  }

  res.status(200).json({
    itinerary,
  });
});

export default tripRouter;
