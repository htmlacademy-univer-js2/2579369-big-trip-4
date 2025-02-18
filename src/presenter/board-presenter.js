import TripEventListView from '../view/event-list-view.js';
import TripSortView from '../view/trip-sort-viev.js';
import TripPointEditView from '../view/trip-point-edit-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripFiltersView from '../view/trip-filters-view.js';
import EvenListEmptyView from '../view/event-list-empty-view.js';
import { generateFilter } from '../mock/filters.js';
import { render, replace } from '../framework/render.js';

export default class BoardPresenter {
  #container = null;

  #destinationModel = null;
  #offersModel = null;
  #pointModel = null;

  #sortComponent = new TripSortView();
  #eventListComponent = new TripEventListView();

  #points = [];
  #filters = [];

  constructor({container,offersModel,destinationModel,pointModel}) {
    this.#container = container;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#pointModel = pointModel;
    this.#filters = generateFilter(this.#pointModel.point);
    //console.log(this.#filters);
  }

  init() {
    if(this.#points.length === 0){
      render(new EvenListEmptyView(),this.#container);
      return;
    }

    this.#eventListComponent = new TripEventListView();
    this.#points = [...this.#pointModel.point];

    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent,this.#container);
    render(new TripFiltersView({filters: this.#filters}),this.#container);
    // render (new TripPointEditView({
    //   point: this.#points[0],
    // }),
    // this.#eventListComponent.element);
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint = (point) => {
    const pointComponent = new TripPointView({
      point,
      pointDestination:this.#destinationModel.getByID(point.cityInformation.id),
      pointOffers:this.#offersModel.getByType(point.type),
      onEditClick:pointEditClickHandler
    });
    const pointEditComponent = new TripPointEditView({
      point,
      pointDestination: this.#destinationModel.get(),
      pointOffers:this.#offersModel.get(),
      onSubmitClick: pointSubmitFormHandler,
      onResetClick: resetButtonClickHandler
    });

    const replacePointToForm = () => {
      replace(pointEditComponent,pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent,pointEditComponent);
    };

    const escKeyDownHandler = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    function pointEditClickHandler(){
      replacePointToForm();
      document.addEventListener('keydown',escKeyDownHandler);
    }

    function resetButtonClickHandler () {
      replaceFormToPoint();
      document.removeEventListener('keydown',escKeyDownHandler);
    }

    function pointSubmitFormHandler() {
      replaceFormToPoint();
      document.removeEventListener('keydown',escKeyDownHandler);
    }
    render(pointComponent,this.#eventListComponent.element);
  };
}
