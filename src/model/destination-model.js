export default class DestinationModel {
  #service = null;
  #destinations = [];

  constructor(service){
    this.#service = service;
  }

  get(){
    return this.#destinations;
  }

  async init() {
    this.#destinations = await this.#service.getDestinations();
    return this.#destinations;
  }

  getByID(id){
    //console.log(this.#destinations);
    return this.#destinations.find((destination) => destination.id === id) || null;
  }
}
