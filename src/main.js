import TripInfoView from './view/trip-info-view';
import TripFiltersView from './view/trip-filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';

import {render, RenderPosition} from './render.js';

import MockService from './server/mock-service.js';
import PointModel from './model/point-model.js';
import OffersModel from './model/offers-model.js';
import DestinationModel from './model/destination-model.js';

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
//console.log(pointModel.get());


const boardPresenter = new BoardPresenter({
  container: siteBodyContainerElement,
  destinationModel,
  offersModel,
  pointModel
});

render(new TripInfoView(),tripInfoElement,RenderPosition.AFTERBEGIN);
render(new TripFiltersView(),filtersBlock);

boardPresenter.init();
