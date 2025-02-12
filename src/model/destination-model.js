export default class DestinationModel {
  constructor(service){
    this.service = service;
    this.destination = this.service.getDestinations();
  }

  get(){
    return this.destination;
  }

  getByID(id){
    return this.dopOptions.find((destination) => destination.id === id) || null;
  }
}
