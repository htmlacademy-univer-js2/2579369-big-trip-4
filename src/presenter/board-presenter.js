import TripEventListView from '../view/event-list-view.js';
import TripSortView from '../view/trip-sort-viev.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import { render, remove } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { UpdateType,UserAction } from '../const.js';
import { filter, FilterType } from '../utils/filters.js';


export default class BoardPresenter {
  #container = null;

  #destinationModel = null;
  #offersModel = null;
  #pointModel = null;
  #filterModel = null;

  #sortComponent = new TripSortView();
  #eventListComponent = null;
  #eventListEmptyComponent = null;

  #pointPresenters = new Map();
  #filterType = FilterType.EVERYTHING;

  constructor({container,offersModel,destinationModel,pointModel, filterModel}) {
    this.#container = container;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points(){
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);
    return filteredPoints;
  }

  init() {

    render(this.#sortComponent, this.#container);
    this.#renderBoard();
  }

  #handleViewAction = (actionType, updateType, update) => {
    // eslint-disable-next-line no-console
    console.log(actionType, updateType, update);

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {

    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderBoard();
        break;
    }
  };

  #renderPoint = (point) => {

    const pointPresenter = new PointPresenter(
      this.#eventListComponent.element,
      this.#destinationModel,
      this.#offersModel,
      this.#handleViewAction,
      this.#modeChangeHandler,
    );

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #renderPointListContainer = () => {
    this.#eventListComponent = new TripEventListView();
    render(this.#eventListComponent,this.#container);
  };

  #clearPoints = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (this.#eventListEmptyComponent) {
      remove(this.#eventListEmptyComponent);
    }
  };

  #renderNoPoints() {
    this.#eventListEmptyComponent = new EventListEmptyView({
      filterType: this.#filterType
    });

    render(this.#eventListEmptyComponent,this.#container);
  }


  #renderBoard = () => {
    if(this.points.length === 0){
      this.#renderNoPoints();
      return;
    }

    this.#renderPointListContainer();
    this.#renderPoints();
  };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
