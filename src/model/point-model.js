import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
export default class PointModel extends Observable {

  #points = [];
  #service = null;

  constructor({service}) {
    super();
    this.#service = service;
  }

  get points(){
    return this.#points || [];
  }

  async init() {
    try {
      const points = await this.#service.getPoints();
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType,update){
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1){
      throw new Error('Can\t update unexisting point');
    }

    try{
      console.log(this.#adaptToClient(update));
      const response = await this.#service.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0,index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType,updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update task');
    }


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

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      cost: point['base_price'],
      dateStart: point['date_from'],
      dateEnd: point['date_to'],
      cityInformation: point['destination'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['destination'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
