export default class FilmsListView {
  constructor() {

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
    return `<section class="films-list"></section>`;
  }
}
