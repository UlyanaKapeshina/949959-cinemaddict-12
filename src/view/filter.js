import Abstract from "./abstract";

export default class FilterView extends Abstract {
  constructor(filtersItems, currentFilter) {
    super();
    this._filterItems = filtersItems;
    this._filterClickHandler = this._filterClickHandler.bind(this);
    this._currentFilter = currentFilter;
    this._statsClickHandler = this._statsClickHandler.bind(this);

  }
  setFilterClickHandler(callback) {
    this._callback.filterClick = callback;
    this.element.querySelector(`.main-navigation__items`).addEventListener(`click`, this._filterClickHandler);
  }
  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.element.querySelector(`.main-navigation__additional`).addEventListener(`click`, this._statsClickHandler);
  }
  _filterClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    this._callback.filterClick(evt.target.dataset.type);
    this._currentFilter = evt.target.dataset.type;
    this._removeActiveClass();
    evt.target.classList.add(`main-navigation__item--active`);
  }
  _statsClickHandler(evt) {
    evt.preventDefault();
    this._removeActiveClass();
    if (evt.target.tagName !== `A`) {
      return;
    }
    this._callback.statsClick();
    evt.target.classList.add(`main-navigation__item--active`);
  }
  _removeActiveClass() {
    this.element.querySelectorAll(`.main-navigation__item--active`).forEach((it) => it.classList.remove(`main-navigation__item--active`));
  }

  createTemplate() {
    const filtersList = this._filterItems.map((it, index) => {
      const activeClass = this._currentFilter === it.id ? `main-navigation__item--active` : ``;

      return `<a href="#${it.id}" data-type=${it.id} class="main-navigation__item ${activeClass} ">${it.name}${index !== 0 ? `<span class="main-navigation__item-count">${it.count}</span></a>` : ``}`;
    }).join(``);

    return `<nav class="main-navigation">
      <div class="main-navigation__items">
      ${filtersList}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
  }
}
