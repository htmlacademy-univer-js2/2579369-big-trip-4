import { destinations } from '../mock/destination.js';
import { points } from '../mock/point.js';
import { dopOptions } from '../mock/offers.js';

export default class MockService {
  constructor () {
    this.destinations = destinations;
    this.dopOptions = dopOptions;
    this.points = points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.dopOptions;
  }

  getPoints() {
    return this.points;
  }
}
