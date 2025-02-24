import AbstractView from '../framework/view/abstract-view.js';

function createTripFilterItemTemplate(filter){
  const {type,count} = filter;

  return (
    `<div class="trip-filters__filter">
      <input
      id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio" name="trip-filter"
      value="${type}"
      ${count === 0 ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label"
       for="filter-${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
    </div>`
  );
}

function createTripFilterTemplate(filterItems){
  const filterItemsTemplate = filterItems
    .map((filter) => createTripFilterItemTemplate(filter))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
        ${filterItemsTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
}
export default class TripFiltersView extends AbstractView {
  #filters = null;

  constructor({filters = []} = {}) {
    super();
    this.#filters = filters;
  }

  get template(){
    return createTripFilterTemplate(this.#filters);
  }
}
