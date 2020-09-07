export default class FilmsListContainerView {
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
    return `<div class="films-list__container">
    </div>`;
  }
}
