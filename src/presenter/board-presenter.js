import TripEventListView from '../view/event-list-view.js';
import TripSortView from '../view/trip-sort-viev.js';
import TripPointEditView from '../view/trip-point-edit-view.js';
import TripPointView from '../view/trip-point-view.js';
import { render } from '../framework/render.js';

export default class BoardPresenter {
  sortComponent = new TripSortView();
  eventListComponent = new TripEventListView();

  constructor({container,offersModel,destinationModel,pointModel}) {
    this.container = container;
    this.destinationModel = destinationModel;
    this.offersModel = offersModel;
    this.pointModel = pointModel;

    this.points = [...pointModel.get()];
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.eventListComponent,this.container);

    render (new TripPointEditView({
      point: this.points[0],
    }),
    this.eventListComponent.element);

    this.points.forEach((point) => {
      render(
        new TripPointView({
          point:point,
          pointDestination:this.destinationModel.getByID(point.cityInformation.id),
          pointOffers:this.offersModel.getByType(point.type) || []}
        ),
        this.eventListComponent.element
      );
    });
  }
}
