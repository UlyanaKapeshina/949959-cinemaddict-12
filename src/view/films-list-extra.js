import Abstract from "./abstract";

export default class FilmsListExtraView extends Abstract {
  constructor(title) {
    super()
    this._title = title;
    this._element = null;
  }

  createTemplate() {
    return `<section class="films-list--extra">
    <h2 class="films-list__title">${this._title}</h2>

  </section>`;
  }
}
