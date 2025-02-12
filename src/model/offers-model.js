export default class OffersModel {
  constructor(dopOptions){
    this.dopOptions = dopOptions;
  }

  get(){
    return this.dopOptions;
  }

  getOffersByType(type) {
    return this.dopOptions.find((option) => option.type === type) || null;
  }
}
