export default class TitleView {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;
    this._element = null;
  }
  get element() {
    return this._element ? this._element : this.createElement();
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
    return `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
  }
}

