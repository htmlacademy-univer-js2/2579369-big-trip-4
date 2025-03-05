import Observable from '../framework/observable.js';
export default class PointModel extends Observable {

  #points = null;
  #service = null;

  constructor(service) {
    super();
    this.#service = service;
    this.#points = this.#service.getPoints();
  }

  get points(){
    return this.#points;
  }

  // updatePoint(updateType,update){
  //   const index = this.#points.findIndex((point) => point.id === update.id);

  //   if(index === 1){
  //     throw new Error('Can\t update unexisting point');
  //   }
  // }
}
