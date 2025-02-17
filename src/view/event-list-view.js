import AbstractView from '../framework/view/abstract-view.js';

function createTripEventListTemplate(){
  return '<ul class="trip-events__list"></ul>';
}

export default class TripEventListView extends AbstractView {

  constructor() {
    super();
  }

  get template(){
    return createTripEventListTemplate();
  }
}
