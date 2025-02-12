import { destination } from '../mock/destination.js';
import { points } from '../mock/point.js';
import { dopOptions } from '../mock/offers.js';

export default class MockService {
  constructor () {
    this.destination = destination;
    this.dopOptions = dopOptions;
    this.points = points;
  }

  getDestinations() {
    return this.destination;
  }

  getOffers() {
    return this.dopOptions;
  }

  getPoints() {
    return this.points;
  }
}
