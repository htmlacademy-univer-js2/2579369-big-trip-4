import { destination } from '../mock/destination.js';
import { mockPoint } from '../mock/point.js';
import { dopOptions } from '../mock/offers.js';

export default class MockService {
  constructor () {
    this.destination = destination;
    this.dopOptions = dopOptions;
    this.mockPoint = mockPoint;
  }

  getDestinations() {
    return this.destination;
  }

  getOffers() {
    return this.dopOptions;
  }

  getPoints() {
    return this.mockPoint;
  }
}
