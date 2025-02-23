import{render, replace, remove} from '../framework/render.js';
import TripPointEditView from '../view/trip-point-edit-view.js';
import TripPointView from '../view/trip-point-view.js';

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #destinationModel = null;
  #offersModel = null;

  #point = null;

  constructor(pointListContainer, destinationModel, offersModel){
    this.#pointListContainer = pointListContainer;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
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
      //onFavoriteClick: this.#pointFavoriteClickHandler
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

    if(this.#pointListContainer.contains(prevPointComponent.element)){
      replace(this.#pointComponent,prevPointComponent);
    }

    if(this.#pointListContainer.contains(prevPointEditComponent.element)){
      replace(this.#pointEditComponent,prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy(){
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToForm() {
    replace(this.#pointEditComponent,this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent,this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #pointEditClickHandler = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown',this.#escKeyDownHandler);
  };

  #pointSubmitFormHandler = () => {
    this.#replaceFormToPoint();
    document.addEventListener('keydown',this.#escKeyDownHandler);
  };

  #resetButtonClickHandler = () => {
    this.#replaceFormToPoint();
    document.addEventListener('keydown',this.#escKeyDownHandler);
  };
  // #pointFavoriteClickHandler = () => {
  //   this#
  // }

}
