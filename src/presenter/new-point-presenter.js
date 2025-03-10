import {remove, render, RenderPosition} from '../framework/render.js';
import TripPointCreateView from '../view/trip-point-create-view.js';
import { UserAction, UpdateType } from '../const.js';
//import TripPointEditView from '../view/trip-point-edit-view.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointCreateComponent = null;

  #destinationModel = null;
  #offersModel = null;

  constructor ({pointListContainer, onDataChange, onDestroy,destinationModel,offersModel}) {
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if(this.#pointCreateComponent !== null) {
      return;
    }

    this.#pointCreateComponent = new TripPointCreateView({
      allOffers:this.#offersModel.get(),
      destinations: this.#destinationModel.get(),
      onSubmitClick: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#pointCreateComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointCreateComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointCreateComponent);
    this.#pointCreateComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,

      {id: crypto.randomUUID(), ...point},
    );
    this.destroy();
  };


  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
