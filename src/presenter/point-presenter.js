import{render, replace, remove} from '../framework/render.js';
import TripPointEditView from '../view/trip-point-edit-view.js';
import TripPointView from '../view/trip-point-view.js';
import { UpdateType,UserAction } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;

  #destinationModel = null;
  #offersModel = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  constructor(pointListContainer, destinationModel, offersModel,handleDataChange,handleModeChange){
    this.#pointListContainer = pointListContainer;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = handleDataChange;
    this.#handleModeChange = handleModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new TripPointView({
      point: this.#point,
      pointDestination:this.#destinationModel.getByID(point.cityInformation.id),
      pointOffers:point.offers,
      onEditClick:this.#pointEditClickHandler,
      onFavoriteClick: this.#pointFavoriteClickHandler,
    });

    this.#pointEditComponent = new TripPointEditView ({
      point,
      allOffers:this.#offersModel.get(),
      destinations: this.#destinationModel.get(),
      onSubmitClick: this.#pointSubmitFormHandler,
      onResetClick: this.#resetButtonClickHandler,
      onDeleteClick:this.#handleDeleteClick
    });

    if(prevPointComponent === null || prevPointEditComponent === null){
      render(this.#pointComponent,this.#pointListContainer);
      return;
    }

    if(this.#mode === Mode.DEFAULT){
      replace(this.#pointComponent,prevPointComponent);
    }

    if(this.#mode === Mode.EDITING){
      replace(this.#pointEditComponent,prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetView = () => {
    if(this.#mode !== Mode.DEFAULT){
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  destroy(){
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToForm() {
    replace(this.#pointEditComponent,this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDDITING;

  }

  #replaceFormToPoint() {
    replace(this.#pointComponent,this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #pointEditClickHandler = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown',this.#escKeyDownHandler);
  };

  #pointSubmitFormHandler = (update) => {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update
    );
    this.#replaceFormToPoint();
  };

  #resetButtonClickHandler = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };

  #pointFavoriteClickHandler = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite
      }
    );
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
    this.#replaceFormToPoint();
  };

}
