export default class FilmsListExtraView {
  constructor(title) {
    this._title = title;
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
    return `<section class="films-list--extra">
    <h2 class="films-list__title">${this._title}</h2>

  </section>`;
  }
}
