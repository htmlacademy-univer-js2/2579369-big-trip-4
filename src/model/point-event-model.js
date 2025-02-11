import { mockPointEvent } from '../mock/point-event.js';

export default class PointEventModel {
  constructor() {
    this.mockPointEvent = mockPointEvent;
  }

  get(){
    return this.mockPointEvent;
  }
}
