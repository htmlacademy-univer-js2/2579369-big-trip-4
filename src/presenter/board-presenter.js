import TripEventListView from '../view/event-list-view.js';
import TripSortView from '../view/trip-sort-viev.js';
import TripPointEditView from '../view/trip-point-edit-view.js';
import TripPointView from '../view/trip-point-view.js';
import { render } from '../framework/render.js';

export default class BoardPresenter {
  #container = null;
  #destinationModel = null;
  #offersModel = null;
  #pointModel = null;

  #sortComponent = new TripSortView();
  #eventListComponent = new TripEventListView();

  #points = [];
  constructor({container,offersModel,destinationModel,pointModel}) {
    this.#container = container;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#pointModel = pointModel;

  }

  init() {
    this.#points = [...this.#pointModel.point];
    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent,this.#container);

    // render (new TripPointEditView({
    //   point: this.#points[0],
    // }),
    // this.#eventListComponent.element);

    this.#points.forEach((point) => {
      this.#renderPoint(point,this.#destinationModel.getByID(point.cityInformation.id),this.#offersModel.getByType(point.type) || []);
    });
  }

  #renderPoint(point,pointDestination,pointOffers){
    const pointComponent = new TripPointView({
      point:point,
      pointDestination:pointDestination,
      pointOffers:pointOffers
    });
    const pointEditComponent = new TripPointEditView({
      point: this.#points[0]
    });

    render(pointComponent,this.#eventListComponent.element);
  }
}
