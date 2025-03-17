import { pointEmpty } from '../const.js';
import { formatDateTimeLong } from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


function createTripPointCreateTemplate({state}){
  const {
    point, destinations, allOffers
  } = state;
  const {
    type,cost,dateStart,dateEnd,offers, cityInformation
  } = point;
  const eventTypes = [
    'Taxi',
    'Bus',
    'Train',
    'Ship',
    'Drive',
    'Flight',
    'Check-in',
    'Sightseeing',
    'Restaurant'
  ];

  const TypeElement = eventTypes.map((eventType) => {
    const isChecked = type === eventType ? 'checked' : '';
    return `<div class="event__type-item">
             <input id="event-type-${eventType.charAt(0).toLowerCase() + eventType.slice(1)}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.toLowerCase()}" ${isChecked}>
             <label class="event__type-label  event__type-label--${eventType.charAt(0).toLowerCase() + eventType.slice(1)}" for="event-type-${eventType.charAt(0).toLowerCase() + eventType.slice(1)}-1">${eventType}</label>
            </div>`;
  }).join('');

  const availableOffers = allOffers.find((offer) => offer.type.toLowerCase() === type.toLowerCase())?.offers ?? [];

  const OfferSelectorsElement = availableOffers.map((offer) => {
    const isChecked = (offers ?? []).some((offerItem) => offerItem === offer.id) ? 'checked' : '';
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-${offer.id}" type="checkbox" name="event-offer-${offer.type}" ${isChecked} data-offer-id="${offer.id}">
              <label class="event__offer-label" for="event-offer-${offer.type}-${offer.id}">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`;
  }).join('');

  const destinationElement = destinations.map((destin) =>
    `<option value="${destin.name}"></option>`
  ).join('');

  const destinationItem = destinations.find((dest) => dest.id === cityInformation);
  const photoImgElement = (destinationItem?.pictures || []).map((photo) =>
    `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`
  ).join('');

  return`<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${TypeElement}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationItem?.name || ''}" list="destination-list-1" required autocomplete="off">
                    <datalist id="destination-list-1">
                      ${destinationElement}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateTimeLong(dateStart)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateTimeLong(dateEnd)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${cost || ''}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cansel</button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${OfferSelectorsElement}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationItem?.description || ''}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photoImgElement}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
}

export default class TripPointCreateView extends AbstractStatefulView{

  #onSubmitClick = null;
  #onDeleteClick = null;
  #destinations = null;
  #allOffers = null;

  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({point = pointEmpty, onSubmitClick,onDeleteClick, allOffers,destinations}){
    super();
    this._setState(TripPointCreateView.parsePointToState({point}));

    this.#onSubmitClick = onSubmitClick;
    this.#onDeleteClick = onDeleteClick;
    this.#destinations = destinations;
    this.#allOffers = allOffers;

    this._restoreHandlers();


  }

  get template(){
    return createTripPointCreateTemplate({
      state:{
        ...this._state,
        allOffers:this.#allOffers,
        destinations: this.#destinations
      }

    });
  }

  removeElement(){
    super.removeElement();

    if(this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if(this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  _restoreHandlers() {

    this.element.querySelector('.event__reset-btn').addEventListener('click',this.#formDeleteClickHandler);
    this.element.querySelector('form').addEventListener('submit',this.#submitFormHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    this.#setDatepickers();
  }

  reset = (point) => {
    this.updateElement({point});
    this._restoreHandlers();
  };

  static parsePointToState = ({point}) => ({
    point: {
      ...point,
    }
  });

  static parseStateToPoint = (state) => state.point;

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitClick(TripPointCreateView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onDeleteClick(TripPointCreateView.parseStateToPoint(this._state));
  };

  #eventTypeChangeHandler = (evt) => {

    this.updateElement({
      point:{
        ...this._state.point,
        type:evt.target.value,
        offers: []
      }
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations.find((dest) => dest.name === evt.target.value);

    if (!selectedDestination) {
      evt.target.value = '';
      return;
    }

    this.updateElement({
      point: {
        ...this._state.point,
        cityInformation: selectedDestination.id,
      },
    });
  };

  #offersChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    const selectedOfferId = checkedBoxes.map((element) => (element.dataset.offerId));

    this._setState({
      point: {
        ...this._state.point,
        offers: selectedOfferId
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point:{
        ...this._state.point,
        cost:parseFloat(evt.target.value)
      }
    });
  };

  #dateStartCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateStart: userDate
      }
    });
    this.#datepickerStart.set('minDate',this._state.point.dateStart);
  };

  #dateEndCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateEnd: userDate
      }
    });
    this.#datepickerStart.set('maxDate',this._state.point.dateEnd);
  };

  #setDatepickers = () => {
    const [dateStartElement, dateEndElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true
    };

    this.#datepickerStart = flatpickr(
      dateStartElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateStart,
        onClose: this.#dateStartCloseHandler,
        maxDate: this._state.point.dateEnd,
      },
    );

    this.#datepickerEnd = flatpickr (
      dateEndElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateEnd,
        onClose: this.#dateEndCloseHandler,
        minDate: this._state.point.dateStart,

      }
    );
  };
}
