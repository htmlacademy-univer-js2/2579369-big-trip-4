import TripEventListView from '../view/event-list-view.js';
import TripSortView from '../view/trip-sort-viev.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import { render, remove } from '../framework/render.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { UpdateType,UserAction } from '../const.js';
import { filter, FilterType } from '../utils/filters.js';

import TripInfoView from '../view/trip-info-view.js';
import { RenderPosition } from '../framework/render.js';


export default class BoardPresenter {
  #container = null;

  #destinationModel = null;
  #offersModel = null;
  #pointModel = null;
  #filterModel = null;

  #sortComponent = new TripSortView();
  #eventListComponent = new TripEventListView();
  #eventListEmptyComponent = null;
  #loadingComponent = new LoadingView();

  #tripInfoComponent = new TripInfoView();
  #tripInfoContainer = null;

  #pointPresenters = new Map();
  #filterType = FilterType.EVERYTHING;
  #newPointPresenter = null;
  #isLoading = true;

  constructor({container,offersModel,destinationModel,pointModel, filterModel,tripInfoContainer, onNewEventDestroy}) {
    this.#container = container;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.#tripInfoContainer = tripInfoContainer;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newPointPresenter = new NewPointPresenter ({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel
    });
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

  createPoint() {
    this.#filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {

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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
    render(this.#eventListComponent,this.#container);
  };

  #renderTripInfo = () => {
    if(this.#tripInfoComponent){
      remove(this.#tripInfoComponent);
    }

    this.#tripInfoComponent = new TripInfoView();
    render(this.#tripInfoComponent,this.#tripInfoContainer,RenderPosition.AFTERBEGIN);
  };

  #renderLoading() {
    render(this.#loadingComponent,this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #clearPoints = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (this.#eventListEmptyComponent) {
      remove(this.#eventListEmptyComponent);
    }

    if(this.#eventListEmptyComponent){
      remove(this.#eventListEmptyComponent);
      this.#eventListEmptyComponent = null;
    }

    remove(this.#loadingComponent);
  };

  #renderNoPoints() {
    if(this.#sortComponent){
      remove (this.#sortComponent);
    }
    this.#eventListEmptyComponent = new EventListEmptyView({
      filterType: this.#filterType
    });

    if(this.#tripInfoComponent){
      remove(this.#tripInfoComponent);
      this.#tripInfoComponent = null;
    }

    render(this.#eventListEmptyComponent,this.#container);
  }


  #renderBoard = () => {
    this.#clearPoints();
    if(this.points.length === 0){
      this.#renderNoPoints();
      return;
    }

    if(this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderPointListContainer();
    this.#renderPoints();
    this.#renderTripInfo();
  };

  #modeChangeHandler = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
