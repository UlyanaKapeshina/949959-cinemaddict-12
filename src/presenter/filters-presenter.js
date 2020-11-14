import FilterView from "../view/filter";
import {RenderPosition, render, replace} from "../utils/render";
import {getFilterItems} from "../utils/filters";

export default class FilterPresenter {
  constructor(container, model, moviesModel, onStatsClick, onFilterClick) {
    this._container = container;
    this._model = model;
    this._moviesModel = moviesModel;
    this._filterClickHandler = this._filterClickHandler.bind(this);
    this._prevFilterComponent = null;
    this._onFilmsModelChange = this._onFilmsModelChange.bind(this);
    this._onStatsClick = onStatsClick;
    this._onFilterClick = onFilterClick;
    this._statsClickHandler = this._statsClickHandler.bind(this);
    this._isStatsOpen = false;

  }
  init() {
    this._moviesModel.addObserver(this._onFilmsModelChange);

    this._filterComponent = new FilterView(this._getFilters(), this._model.getFilter());
    this._filterComponent.setFilterClickHandler(this._filterClickHandler);
    this._filterComponent.setStatsClickHandler(this._statsClickHandler);
    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
  }
  _update() {
    this._prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(this._getFilters(), this._model.getFilter());
    this._filterComponent.setFilterClickHandler(this._filterClickHandler);
    this._filterComponent.setStatsClickHandler(this._statsClickHandler);
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
    if (this._isStatsOpen) {

      this._onFilterClick();
      this._isStatsOpen = false;
    }

  }
  _statsClickHandler() {
    if (this._isStatsOpen) {
      return;
    }
    this._onStatsClick();
    this._isStatsOpen = true;
    this._model.setFilter(null);

  }
  _getFilters() {
    const films = this._moviesModel.getFilms().slice();
    return getFilterItems(films.slice());
  }
}
