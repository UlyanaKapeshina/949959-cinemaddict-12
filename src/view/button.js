import Abstract from "./abstract";

export default class ButtonView extends Abstract {
  constructor() {
    super();
    this._clickHandlerBind = this._clickHandler.bind(this);
  }
  setClickHandler(callback) {

    this._callback.click = callback;
    this.element.addEventListener(`click`, this._clickHandlerBind);

  }
  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  createTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}

