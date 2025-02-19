import TripEventListView from '../view/event-list-view.js';
import TripSortView from '../view/trip-sort-viev.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import { render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #container = null;

  #destinationModel = null;
  #offersModel = null;
  #pointModel = null;

  #sortComponent = new TripSortView();
  #eventListComponent = null;

  #points = [];

  constructor({container,offersModel,destinationModel,pointModel}) {
    this.#container = container;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#pointModel = pointModel;
    this.#points = [...this.#pointModel.point];
  }

  init() {
    if(this.#points.length === 0){
      render(new EventListEmptyView(),this.#container);
      return;
    }
    this.#eventListComponent = new TripEventListView();

    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent,this.#container);
    // render (new TripPointEditView({
    //   point: this.#points[0],
    // }),
    // this.#eventListComponent.element);
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint = (point) => {

    const pointPresenter = new PointPresenter(
      this.#eventListComponent.element,
      this.#destinationModel,
      this.#offersModel
    );
    pointPresenter.init(point);
  };
}
