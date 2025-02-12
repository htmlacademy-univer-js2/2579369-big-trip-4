import dayjs from 'dayjs';
import { createElement } from '../render';
import { formatDateTimeShort } from '../utils';
import { formatDateMonthDay } from '../utils';

function createTripPointTemplate({point,pointDestination,pointOffers}){
  const {
    type,cost,isFavorite,
    dateStart,dateEnd
  } = point;

  const offerItems = pointOffers && pointOffers.length > 0 ?
    pointOffers.map((offer) =>
      `<li class="event__offer">
      <span class="event__offer-title">${offer}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${pointOffers.price}</span>
      </li>`
    ).join('') : '';

  return`<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime=${formatDateMonthDay(dateStart)}>${formatDateMonthDay(dateStart)}</time>
                <div class="event__type">
                  <img class="event__type-icon"
                   width="42"
                  height="42"
                   src="img/icons/${type}.png"
                   alt="Event type icon">
                </div>
                <h3 class="event__title">
                ${type} ${pointDestination.cityName}
                </h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime=${formatDateTimeShort(dateStart)}>${formatDateTimeShort(dateStart)}</time>
                    &mdash;
                    <time class="event__end-time" datetime=${formatDateTimeShort(dateEnd)}>${formatDateTimeShort(dateEnd)}</time>
                  </p>
                  <p class="event__duration">${dayjs(dateStart).diff(dayjs(dateEnd))}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${cost}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offerItems}
                </ul>
                <button class="event__favorite-btn  ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class TripPointView {
  constructor({point,pointDestination, pointOffers}){
    this.point = point;
    this.pointDestination = pointDestination;
    this.pointOffers = pointOffers;
  }

  getTemplate(){
    return createTripPointTemplate({
      point:this.point,
      pointDestination:this.pointDestination,
      pointOffers:this.pointOffers
    });
  }

  getElement(){
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
