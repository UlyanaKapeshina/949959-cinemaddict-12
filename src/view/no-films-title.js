export default class TitleNoFilmsView {
  constructor() {

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
    return `<h2 class="films-list__title">There are no movies in our database</h2>`;
  }
}
