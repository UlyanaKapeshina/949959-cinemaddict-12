import { render, RenderPosition, replace } from "../utils/render";
import FooterStatView from "../view/footer-stat";

export default class FooterPresenter {
  constructor(container, moviesModel) {
    this._container = container;
    this._footerComponent = null;
    this._moviesModel = moviesModel;
    this._onFilmsModelChange = this._onFilmsModelChange.bind(this);
  }

  init() {
    this._footerComponent = new FooterStatView(this._getCount());
    this._moviesModel.addObserver(this._onFilmsModelChange);
    render(this._container, this._footerComponent, RenderPosition.BEFOREEND);
  }
  _update() {
    this._prevFooterComponent = this._footerComponent;
    this._footerComponent = new FooterStatView(this._getCount());
    replace(this._footerComponent, this._prevFooterComponent);
    this._prevFooterComponent = null;
  }
  _onFilmsModelChange() {
    this._update();
  }

  _getCount() {
    const films = this._moviesModel.getFilms().slice();
    return films.length;
  }
}
