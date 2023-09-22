import { Types } from 'mongoose';
import Trip from '../models/trip';
import { isSameDate } from '../utils';

/**
 * Itinerary will contain all the nodes for the linked lists
 * Each date will contain a linked list
 *
 * There will be a default head for each date that subsequent
 * activities on that date will link to.
 *
 */
class ItineraryLinkedList {
  public trip;

  // eslint-disable-next-line no-useless-constructor, no-empty-function, @typescript-eslint/no-empty-function
  constructor() {}

  async init(tripId) {
    this.trip = await Trip.findById(tripId);
  }

  /**
   * Add an activity node to the trip's interary array and link
   * it to the last activity with the specified date
   * @param data
   * @returns
   */
  async add(data) {
    const { date } = data;

    // Find head of the linked list for specified date
    const head = await this.getHead(date);
    if (!head) {
      const generatedId = new Types.ObjectId();

      this.trip?.itinerary.push({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _id: generatedId,
        data,
      });

      return this.trip.save();
    }

    let currNode = head.next;

    // If there is no element after the head
    if (!currNode) {
      const generatedId = new Types.ObjectId();
      const newNode = {
        _id: generatedId,
        prev: head._id,
        data,
      };

      head.next = newNode._id;

      this.trip.itinerary.push(newNode);

      return this.trip.save();
    }

    currNode = this.get(head.next);

    // When there is > 1 element in the linked list,
    // iterate to the last node
    while (currNode.next) {
      const node = this.get(currNode.next);
      currNode = node;
    }

    const currItineraryNode = this.trip.itinerary.find(
      (el) => el._id.toString() === currNode._id.toString()
    );

    const generatedId = new Types.ObjectId();

    this.trip?.itinerary.push({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _id: generatedId,
      prev: currNode._id,
      data,
    });

    currItineraryNode.next = generatedId;

    return this.trip?.save();
  }

  /**
   * Get the actual activity object in the itinerary
   * @param nodeId
   * @returns
   */
  get(nodeId: string | Types.ObjectId) {
    const node = this.trip?.itinerary.find(
      (el) => el._id.toString() === nodeId?.toString()
    );

    return node;
  }

  /**
   * Find the head for a list of activities on a certain
   * date.
   * @param date
   */
  async getHead(date: Date) {
    const head = this.trip?.itinerary.find(
      (el) => !el.prev && isSameDate(el.data?.date, date)
    );

    return head;
  }

  /**
   * Swap two nodes in the itinerary list.
   * This is a pretty gnarly function as we have to account for
   * updating 6 nodes!
   *
   * @param node1Id
   * @param node2Id
   * @returns
   */
  async swap(node1Id, node2Id) {
    if (node1Id.toString() === node2Id.toString()) {
      return this.trip;
    }

    // Update docs in trip
    let itineraryNode1 = this.trip.itinerary.find(
      (el) => el._id.toString() === node1Id.toString()
    );
    let itineraryNode2 = this.trip.itinerary.find(
      (el) => el._id.toString() === node2Id.toString()
    );
    let adjacentSwap = false;

    if (itineraryNode1?.prev?.toString() === itineraryNode2?._id.toString()) {
      adjacentSwap = true;
      const temp = itineraryNode2;
      itineraryNode2 = itineraryNode1;
      itineraryNode1 = temp;
    }

    // Updating the surrounding nodes next/prev references
    const prevItineraryNode1 = this.get(itineraryNode1.prev);
    const nextItineraryNode1 = this.get(itineraryNode1.next);
    const nextItineraryNode2 = this.get(itineraryNode2.next);
    const prevItineraryNode2 = this.get(itineraryNode2.prev);

    if (prevItineraryNode1) prevItineraryNode1.next = itineraryNode2._id;
    if (nextItineraryNode1) nextItineraryNode1.prev = itineraryNode2._id;

    if (prevItineraryNode2) prevItineraryNode2.next = itineraryNode1._id;
    if (nextItineraryNode2) {
      nextItineraryNode2.prev = itineraryNode1._id;
    }

    // Make sure to save the references for the next/prev node IDs
    // as we will be resetting their values
    const itineraryNode1NextId = itineraryNode1.next;
    const itineraryNode1PrevId = itineraryNode1.prev;
    const itineraryNode2PrevId = itineraryNode2.prev;
    const itineraryNode2NextId = itineraryNode2.next;

    itineraryNode1.next = itineraryNode2NextId;
    itineraryNode2.prev = itineraryNode1PrevId;

    // If we are swapping adjacent nodes, the next/prev should
    // point to their neighboring node Ids
    if (adjacentSwap) {
      itineraryNode1.prev = itineraryNode2._id;
      itineraryNode2.next = itineraryNode1._id;
    } else {
      itineraryNode1.prev = itineraryNode2PrevId;
      itineraryNode2.next = itineraryNode1NextId;
    }

    return this.trip.save();
  }

  async delete(nodeId: string | Types.ObjectId) {
    // When we remove the node, we need to relink
    // the prev node.next -> deletedNode.next
    const itineraryNode = this.trip.itinerary.find(
      (el) => el._id.toString() === nodeId.toString()
    );

    const prevItineraryNode = await this.trip.itinerary.find(
      (el) => el._id.toString() === itineraryNode.prev?.toString()
    );
    const nextItineraryNode = await this.trip.itinerary.find(
      (el) => el._id.toString() === itineraryNode.next?.toString()
    );

    if (prevItineraryNode)
      prevItineraryNode.next = nextItineraryNode?._id || null;
    if (nextItineraryNode)
      nextItineraryNode.prev = prevItineraryNode?._id || null;

    // Remove the itineraryNode from trip itinerary
    const updatedItinerary = this.trip.itinerary.filter(
      (el) => el._id.toString() !== itineraryNode._id.toString()
    );

    this.trip.itinerary = updatedItinerary;

    return this.trip.save();
  }
}

export default ItineraryLinkedList;
