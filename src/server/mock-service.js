import { points } from '../mock/point.js';
import { mockPointEvent } from '../mock/point-event.js';
import { dopOptions } from '../mock/offers.js';

export default class MockService {
  constructor () {
    this.points = points;
    this.dopOptions = dopOptions;
    this.mockPointEvent = mockPointEvent;
  }

  getDestinations() {
    return this.points;
  }

  getOffers() {
    return this.dopOptions;
  }

  getPoints() {
    return this.mockPointEvent;
  }
}
