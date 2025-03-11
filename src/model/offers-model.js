export default class OfferModel {
  #service = null;
  #offers = [];

  constructor(service) {
    this.#service = service;
  }

  get() {
    return this.#offers;
  }

  async init() {
    this.#offers = await this.#service.getOffers();
    return this.#offers;
  }

  getByType(type) {
    const offers = this.#offers.find((option) => option.type === type);
    if (!offers) {
      return [];
    }
    return offers.offers;
  }
}
