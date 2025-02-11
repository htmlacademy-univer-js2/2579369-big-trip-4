import { destination } from '../mock/destination.js';

export default class DestinationModel {
  constructor(){
    this.destination = destination;
  }

  get(){
    return this.destination;
  }
}
