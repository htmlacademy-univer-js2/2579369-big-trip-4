import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService{
  getOffers() {
    return this._load({url:'offers'}).then(ApiService.parseResponse);
  }

  getDestinations() {
    return this._load({url:'destinations'}).then(ApiService.parseResponse);
  }

  getPoints() {
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
      ['base_price']: point.cost,
      ['date_form']: point.dateStart,
      ['date_to']: point.dateEnd,
      ['destination']: point.cityInformation,
      ['is_favorite']: point.isFavorite,
    };

    delete adaptedPoint.cost;
    delete adaptedPoint.dateStart;
    delete adaptedPoint.dateEnd;
    delete adaptedPoint.cityInforamtion;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
