import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../utils/filters.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]:'There are no past events now',
  [FilterType.PRESENT]:'There are no present events now',
  [FilterType.FUTURE]:'There are no future events now',
};

function createEventListEmptyTemplate(filterType) {
  const noPointsTextValue = NoPointsTextType[filterType];
  return `
    <div class="page-body__container">
        <section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>
          <p class="trip-events__msg">${noPointsTextValue}</p>
        </section>
      </div>
  `;
}

export default class EventListEmptyView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template(){
    return createEventListEmptyTemplate(this.#filterType);
  }
}
