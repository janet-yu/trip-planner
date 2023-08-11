import { Types } from 'mongoose';
import { Router } from 'express';
import Trip from '../models/trip';
import GoogleAPIService from '../lib/googleAPI';
import { PATCH_OPERATIONS, RESPONSE_STATUSES } from './utils/types';
import verifyJwt from '../middleware/verifyJwt';
import User from '../models/user';
import ItineraryLinkedList from '../classes/IitineraryLinkedList';

const tripRouter = Router();

export const extendTripObject = async (trip) => {
  const tripDetails = await GoogleAPIService.getPlaceDetails(
    trip.placeReferenceId
  );

  const people = await Promise.all(
    trip.people.map(async (person) => {
      const foundPerson = await User.findById(person.userId);

      return foundPerson;
    })
  );

  return {
    ...trip.toObject(),
    people,
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

tripRouter.patch('/:id', verifyJwt, async (req, res) => {
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
  const { date }: { date?: string } = req.query;

  try {
    const trip = await Trip.findById(id);

    if (!trip) {
      res.status(400).json({
        status: RESPONSE_STATUSES.fail,
        message: `Trip with id ${id} does not exist`,
      });
    }

    let filteredItinerary = trip.itinerary;

    if (date) {
      // Find the head of the linked list for the specific date
      const LinkedList = new ItineraryLinkedList();
      await LinkedList.init(id);
      const headOfItinerary = await LinkedList.getHead(new Date(date));

      const activities = [];

      if (headOfItinerary) {
        activities.push(headOfItinerary);
        // Aggregate all activities on the specific date into an array
        let currNodeId = headOfItinerary.next;
        while (currNodeId) {
          const activityNode = LinkedList.get(currNodeId);

          activities.push(activityNode);

          currNodeId = activityNode.next;
        }

        filteredItinerary = activities;
      }
    }

    const itinerary = [];

    for (const activity of filteredItinerary) {
      const response = await GoogleAPIService.getPlaceDetails(
        activity.data.referenceId
      );

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
      message: err.message,
    });
  }
});

tripRouter.post('/:tripId/itinerary', verifyJwt, async (req, res) => {
  try {
    const { tripId } = req.params;
    const { activity } = req.body;

    const linkedList = new ItineraryLinkedList();
    await linkedList.init(tripId);

    const updatedTrip = await linkedList.add(activity);

    res.status(201).json({
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

tripRouter.patch('/:tripId/itinerary', verifyJwt, async (req, res) => {
  try {
    // Swapping the order of activities
    const { tripId } = req.params;
    const { activity1Id, activity2Id } = req.body;

    const LinkedList = new ItineraryLinkedList();
    await LinkedList.init(tripId);

    const updatedTrip = await LinkedList.swap(activity1Id, activity2Id);

    res.status(200).json({
      status: RESPONSE_STATUSES.success,
      data: {
        trip: await extendTripObject(updatedTrip),
      },
    });
  } catch (err) {
    res.status(500).json({
      status: RESPONSE_STATUSES.fail,
      message: err.message,
    });
  }
});

tripRouter.delete(
  '/:tripId/itinerary/activity/:activityId',
  verifyJwt,
  async (req, res) => {
    try {
      const { tripId, activityId } = req.params;

      const LinkedList = new ItineraryLinkedList();
      await LinkedList.init(tripId);

      const updatedTrip = await LinkedList.delete(activityId);

      res.status(200).json({
        status: RESPONSE_STATUSES.success,
        data: {
          trip: await extendTripObject(updatedTrip),
        },
      });
    } catch (err) {
      res.status(500).json({
        status: RESPONSE_STATUSES.fail,
        message: err.message,
      });
    }
  }
);

tripRouter.patch(
  '/:tripId/itinerary/activity/:activityId',
  verifyJwt,
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
        data: {
          ...updatedActivity.data,
          ...updates,
          ...(Boolean(updates.date) && { date: new Date(updates.date) }),
        },
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

/*
  PEOPLE ROUTES
*/
tripRouter.post('/:id/people', async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const user = await User.findOne({
      username,
    });

    if (!user) {
      res.status(400).json({
        status: RESPONSE_STATUSES.fail,
        message: 'User does not exist',
      });
    }

    const trip = await Trip.findById(id);

    if (
      trip.people.some((el) => el.userId.toString() === user._id.toString())
    ) {
      return res.status(400).json({
        status: RESPONSE_STATUSES.fail,
        message: 'User already added to trip',
      });
    }

    const person = {
      userId: user._id,
    };

    const updatedTrip = await Trip.findByIdAndUpdate(
      id,
      {
        $push: {
          people: person,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      status: RESPONSE_STATUSES.success,
      data: {
        trip: await extendTripObject(updatedTrip),
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: RESPONSE_STATUSES.error,
    });
  }
});

export default tripRouter;
