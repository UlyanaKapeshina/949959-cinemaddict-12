export default class ButtonView {
  constructor(ratingName) {
    this._ratingName = ratingName;
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
    return `<button class="films-list__show-more">Show more</button>`;

  }
}

