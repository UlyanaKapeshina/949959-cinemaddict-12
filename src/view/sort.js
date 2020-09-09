import Abstract from "./abstract";

export default class SortView extends Abstract {
  constructor(filtersItems) {
    super();
    this._filterItems = filtersItems;
  }

  createTemplate() {
    return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;
  }
}
