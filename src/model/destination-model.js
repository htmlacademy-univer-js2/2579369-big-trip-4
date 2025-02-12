export default class DestinationModel {
  constructor(destination){
    this.destination = destination;
  }

  get(){
    return this.destination;
  }

  getByID(id){
    return this.dopOptions.find((destination) => destination.id === id) || null;
  }
}
