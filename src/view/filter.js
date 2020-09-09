import Abstract from "./abstract";


export default class FilterView extends Abstract {
  constructor(filtersItems) {
    super();
    this._filterItems = filtersItems;
  }

  createTemplate() {
    const filtersList = this._filterItems.map((it, index) => {
      const activeClass = index === 0 ? `main-navigation__item--active` : ``;

      return `<a href="#${it.id}" class="main-navigation__item ${activeClass} ">${it.name}${index !== 0 ? `<span class="main-navigation__item-count">${it.count}</span></a>` : ``}`;
    }).join(``);

    return `<nav class="main-navigation">
      <div class="main-navigation__items">
      ${filtersList}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
  }
}
