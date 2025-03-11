import Observable from '../framework/observable.js';
export default class PointModel extends Observable {

  #points = [];
  #destinationModel = null;
  #offersModel = null;
  #service = null;

  constructor({service, destinationModel, offersModel}) {
    super();
    this.#service = service;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    //this.#points = this.#service.getPoints();

    this.#service.points.then((points) => {
      console.log(points);
    });
  }

  get points(){
    return this.#points;
  }

  updatePoint(updateType,update){
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === 1){
      throw new Error('Can\t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0,index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType,update);
  }

  addPoint(updateType,update){
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType,update);
  }

  deletePoint(updateType, update){
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === 1){
      throw new Error('Can\t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
