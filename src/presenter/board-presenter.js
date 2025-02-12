import TripEventListView from '../view/event-list-view.js';
import TripSortView from '../view/trip-sort-viev.js';
import TripPointEditView from '../view/trip-point-edit-view.js';
import TripPointView from '../view/trip-point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  sortComponent = new TripSortView();
  eventListComponent = new TripEventListView();

  constructor({container,offersModel,destinationModel,pointModel}) {
    this.container = container;
    this.destinationModel = destinationModel;
    this.offersModel = offersModel;
    this.pointModel = pointModel;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.eventListComponent,this.container);
    //render (new TripPointEditView(),this.eventListComponent.getElement());

    render (new TripPointEditView({
      point: this.point[0],
      pointDestination:this.destinationModel.get(),
      pointOffers: this.offersModel.get()
    }),
    this.eventListComponent.getElement());

    this.point

    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.eventListComponent.getElement());
    }
  }
}
