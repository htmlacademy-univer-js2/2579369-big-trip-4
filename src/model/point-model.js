import { mockPoint } from '../mock/point.js';

export default class PointModel {
  constructor() {
    this.mockPoint = mockPoint;
  }

  get(){
    return this.mockPoint;
  }
}
