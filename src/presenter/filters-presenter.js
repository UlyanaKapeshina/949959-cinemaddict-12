import FilterView from "../view/filter";
import {RenderPosition, render, replace} from "../utils/render";
import {getFilterItems} from "../mock/filters-mock";

export default class FilterPresenter {
  constructor(container, model, filmsModel) {
    this._container = container;
    this._model = model;
    this._filmsModel = filmsModel;
    this._filterClickHandlerBind = this._filterClickHandler.bind(this);
    this._prevFilterComponent = null;
    this._onFilmsModelChange = this._onFilmsModelChange.bind(this);

  }
  init() {
    this._filmsModel.addObserver(this._onFilmsModelChange);

    this._filterComponent = new FilterView(this._getFilters(), this._model.getFilter());
    this._filterComponent.setFilterClickHandler(this._filterClickHandlerBind);
    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
  }
  _update() {
    this._prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(this._getFilters(), this._model.getFilter());
    this._filterComponent.setFilterClickHandler(this._filterClickHandlerBind);
    replace(this._filterComponent, this._prevFilterComponent);
    this._prevFilterComponent = null;
  }
  _onFilmsModelChange() {
    this._update();
  }

  _filterClickHandler(filterName) {
    if (this._model.getFilter() === filterName) {
      return;
    }
    this._model.setFilter(filterName);
  }
  _getFilters() {
    const films = this._filmsModel.getFilms().slice();
    return getFilterItems(films.slice());
  }
}
