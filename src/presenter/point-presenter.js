import{render, replace, remove} from '../framework/render.js';
import TripPointEditView from '../view/trip-point-edit-view.js';
import TripPointView from '../view/trip-point-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDDITING: 'EDITING',
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
      onFavoriteClick: this.#pointFavoriteClickHandler
    });

    this.#pointEditComponent = new TripPointEditView ({
      point,
      pointOffers:this.#offersModel.getByType(point.type),
      onSubmitClick: this.#pointSubmitFormHandler,
      onResetClick: this.#resetButtonClickHandler
    });

    if(prevPointComponent === null || prevPointEditComponent === null){
      render(this.#pointComponent,this.#pointListContainer);
      return;
    }

    if(this.#mode === Mode.DEFAULT){
      replace(this.#pointComponent,prevPointComponent);
    }

    if(this.#mode === Mode.EDDITING){
      replace(this.#pointEditComponent,prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetView = () => {
    if(this.#mode !== Mode.DEFAULT){
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
      this.#replaceFormToPoint();
    }
  };

  #pointEditClickHandler = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown',this.#escKeyDownHandler);
  };

  #pointSubmitFormHandler = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToPoint();
  };

  #resetButtonClickHandler = () => {
    this.#replaceFormToPoint();
    document.addEventListener('keydown',this.#escKeyDownHandler);
  };

  #pointFavoriteClickHandler = () => {
    this.#handleDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };

}
