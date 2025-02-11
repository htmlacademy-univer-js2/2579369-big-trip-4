import { points } from '../mock/point.js';

export default class OffersModel {
  constructor(){
    this.points = points;
  }

  get(){
    return this.points;
  }
}
