export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one`);
    }
    this._element = null;
    this._callback = {};
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
    throw new Error(`getTemplate method Abstract class`);
  }
}
