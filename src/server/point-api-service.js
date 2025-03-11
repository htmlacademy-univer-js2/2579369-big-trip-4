import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService{
  get getPoints() {
    return this._load({url:'points'}).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      'base_price': point.cost,
      'date_form': point.dateStart instanceof Date ? point.dateStart.toISOString() : null,
      'date_to': point.dateEnd instanceof Date ? point.dateEnd.toISOString() : null,
      'destination': point.cityInformation,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.cost;
    delete adaptedPoint.dateStart;
    delete adaptedPoint.dateEnd;
    delete adaptedPoint.cityInforamtion;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
