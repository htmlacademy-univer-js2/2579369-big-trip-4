export default class OffersModel {

  constructor(service) {
    this.service = service;
    this.dopOptions = this.service.getOffers();
  }

  get(){
    return this.dopOptions;
  }

  getOffersByType(type) {
    return this.dopOptions.find((option) => option.type === type) || null;
  }
}
