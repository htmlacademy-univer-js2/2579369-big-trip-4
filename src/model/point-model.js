export default class PointModel {
  #points = null;
  #service = null;

  constructor(service) {
    this.#service = service;
    this.#points = this.#service.getPoints();
  }

  get point(){
    return this.#points;
  }
}
