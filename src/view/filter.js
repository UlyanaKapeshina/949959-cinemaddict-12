

export default class FilterView {
  constructor(filtersItems) {
    this._filterItems = filtersItems;
    this._element = null;
  }
  get element() {
    if (!this._element) {
      this._element = this.createElement();
    }
    return this._element;
  }
  createElement() {
    const div = document.createElement(`div`);
    div.innerHTML = this.createTemplate();
    return div.firstChild;
  }
  removeElement() {
    this._element = null;
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
