import TripInfoView from './view/trip-info-view';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button.js';

import {render, RenderPosition, remove} from './framework/render.js';


import MockService from './server/mock-service.js';
import PointModel from './model/point-model.js';
import OffersModel from './model/offers-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';

const bodyElemnet = document.querySelector('body');
const headerElement = bodyElemnet.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filtersBlock = tripInfoElement.querySelector('.trip-controls__filters');
const pageBodyElemnt = document.querySelector('.page-body__page-main');
const siteBodyContainerElement = pageBodyElemnt.querySelector('.page-body__container');

const mockService = new MockService();
const destinationModel = new DestinationModel(mockService);
const offersModel = new OffersModel(mockService);
const pointModel = new PointModel(mockService);
const filterModel = new FilterModel(mockService);

const boardPresenter = new BoardPresenter({
  container: siteBodyContainerElement,
  destinationModel,
  offersModel,
  pointModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersBlock,
  filterModel,
  pointModel
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  // if(newEventButtonComponent){
  //   remove(newE)
  // }
  boardPresenter.createPoint();
  newEventButtonComponent.element.disabled = true;
}
render(newEventButtonComponent,tripInfoElement);

render(new TripInfoView(),tripInfoElement,RenderPosition.AFTERBEGIN);

filterPresenter.init();
boardPresenter.init();
