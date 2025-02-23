import TripEventListView from '../view/event-list-view.js';
import TripSortView from '../view/trip-sort-viev.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import { render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';

export default class BoardPresenter {
  #container = null;

  #destinationModel = null;
  #offersModel = null;
  #pointModel = null;

  #sortComponent = new TripSortView();
  #eventListComponent = null;

  #points = [];
  #pointPresenters = new Map();

  constructor({container,offersModel,destinationModel,pointModel}) {
    this.#container = container;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#pointModel = pointModel;
    this.#points = [...this.#pointModel.point];
  }

  init() {

    render(this.#sortComponent, this.#container);
    this.#renderBoard();
  }

  #renderPoint = (point) => {

    const pointPresenter = new PointPresenter(
      this.#eventListComponent.element,
      this.#destinationModel,
      this.#offersModel,
      this.#pointChangeHandler,
      this.#modeChangeHandler
    );

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #renderPointListContainer = () => {
    this.#eventListComponent = new TripEventListView();
    render(this.#eventListComponent,this.#container);
  };

  #renderBoard = () => {
    if(this.#points.length === 0){
      render(new EventListEmptyView(),this.#container);
      return;
    }

    this.#renderPointListContainer();
    this.#renderPoints();
  };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #pointChangeHandler = (updatedPoint) => {
    this.#points = updateItem(this.#points,updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };
}
