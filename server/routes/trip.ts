import { Types } from 'mongoose';
import { Router } from 'express';
import Trip from '../models/trip';
import GoogleAPIService from '../lib/googleAPI';
import { PATCH_OPERATIONS, RESPONSE_STATUSES } from './utils/types';
import verifyJwt from '../middleware/verifyJwt';

const tripRouter = Router();

export const extendTripObject = async (trip) => {
  const tripDetails = await GoogleAPIService.getPlaceDetails(
    trip.placeReferenceId
  );

  return {
    ...trip.toObject(),
    photos: tripDetails.photos,
    geometry: tripDetails.geometry,
  };
};

tripRouter.post('/', verifyJwt, async (req, res) => {
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
      // add photos and location
      userId,
    });

    res.status(201).json({
      status: RESPONSE_STATUSES.success,
      data: {
        trip: await extendTripObject(trip),
      },
    });
  } catch (err) {
    res.status(500).json({
      status: RESPONSE_STATUSES.error,
      message: 'Failed to create trip',
    });
  }
});

tripRouter.get('/:id', verifyJwt, async (req, res) => {
  const { id } = req.params;

  try {
    const trip = await Trip.findById(id);

    if (!trip) {
      res.status(400).json({
        status: 'fail',
        message: `Trip with id ${id} does not exist`,
      });
    }

    res.status(200).json({
      status: RESPONSE_STATUSES.success,
      data: {
        trip: await extendTripObject(trip),
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
    });
  }
});

tripRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const trip = await Trip.findById(id);

    if (!trip) {
      res.status(400).json({
        status: RESPONSE_STATUSES,
        message: `Trip with id ${id} does not exist`,
      });
    }
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
          updates[field] = trip[field].filter(
            (el) => el._id.toString() !== value.id
          );
        } else {
          // Else, we want to remove a primitive
          updates[field] = trip[field].filter((el) => el === value);
        }
      }
    }

    const updatedTrip = await Trip.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.status(200).json({
      status: RESPONSE_STATUSES.success,
      data: {
        trip: await extendTripObject(updatedTrip),
      },
    });
  } catch (err) {
    res.status(500).json({
      status: RESPONSE_STATUSES.error,
    });
  }
});

tripRouter.get('/:id/lodging', async (req, res) => {
  const { id } = req.params;

  try {
    const trip = await Trip.findById(id);

    if (!trip) {
      res.status(400).json({
        status: RESPONSE_STATUSES.fail,
        message: `Trip with id ${id} does not exist`,
      });
    }

    const lodging = [];

    for (const place of trip.lodging) {
      const response = await GoogleAPIService.getPlaceDetails(
        place.referenceId
      );

      lodging.push({
        // @ts-ignore
        ...place.toObject(),
        details: {
          ...response,
        },
      });
    }

    res.status(200).json({
      status: RESPONSE_STATUSES.success,
      data: {
        lodging,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: RESPONSE_STATUSES.error,
    });
  }
});

/**
 * ITINERARY ROUTES
 */
tripRouter.get('/:id/itinerary', async (req, res) => {
  const { id } = req.params;

  try {
    const trip = await Trip.findById(id);

    if (!trip) {
      res.status(400).json({
        status: RESPONSE_STATUSES.fail,
        message: `Trip with id ${id} does not exist`,
      });
    }

    const itinerary = [];

    for (const activity of trip.itinerary) {
      const response = await GoogleAPIService.getPlaceDetails(
        activity.referenceId
      );

      console.log({ activity });

      itinerary.push({
        // @ts-ignore
        ...activity.toObject(),
        details: {
          ...response,
        },
      });
    }

    res.status(200).json({
      status: RESPONSE_STATUSES.success,
      data: {
        itinerary,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: RESPONSE_STATUSES.error,
    });
  }
});

tripRouter.patch(
  '/:tripId/itinerary/activity/:activityId',
  async (req, res) => {
    try {
      const { tripId, activityId } = req.params;
      const { updates } = req.body;

      const trip = await Trip.findById(tripId);
      let updatedActivity = trip.itinerary
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .find((activity) => activity._id.toString() === activityId)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .toObject();

      updatedActivity = {
        ...updatedActivity,
        ...updates,
        ...(Boolean(updates.date) && { date: new Date(updates.date) }),
      };

      const updatedTrip = await Trip.findOneAndUpdate(
        {
          _id: new Types.ObjectId(tripId),
          'itinerary._id': new Types.ObjectId(activityId),
        },
        {
          $set: {
            'itinerary.$': updatedActivity,
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        status: RESPONSE_STATUSES.success,
        data: {
          trip: await extendTripObject(updatedTrip),
        },
      });
    } catch (err) {
      res.status(500).json({
        status: RESPONSE_STATUSES.error,
      });
    }
  }
);

export default tripRouter;
