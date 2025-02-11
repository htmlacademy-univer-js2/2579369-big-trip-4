import { dopOptions } from '../mock/offers.js';

export default class OffersModel {
  constructor(){
    this.dopOptions = dopOptions;
  }

  get(){
    return this.dopOptions;
  }

  getOffersByType(type) {
    return this.dopOptions.find((option) => option.type === type) || null;
  }
}
