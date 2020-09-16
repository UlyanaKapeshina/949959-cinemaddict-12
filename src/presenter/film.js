import FilmView from "../view/film";
import FilmPopupView from "../view/film-popup";
import {remove, render, RenderPosition, replace} from "../utils/render";

export default class Film {
  constructor(container, popupContainer, onDataChange, onPopupOpen) {
    this._filmsContainer = container.element;
    this._popupContainer = popupContainer;
    this._onPopupOpen = onPopupOpen;
    this._openClickHandler = this._openClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onFavoriteClickHandler = this._onFavoriteClickHandler.bind(this);
    this._onWatchListClickHandler = this._onWatchListClickHandler.bind(this);
    this._onWatchedClickHandler = this._onWatchedClickHandler.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._filmComponent = null;
    this._filmPopupComponent = null;
    this._onDataChange = onDataChange;
    this.init = this.init.bind(this);
    this._isPopupOpen = false;
  }

  init(filmData) {
    this._filmData = filmData;
    this._filmComponent = new FilmView(this._filmData);
    this._filmPopupComponent = new FilmPopupView(this._filmData);
    this._setHandlers();
    render(this._filmsContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _update(newData) {
    this._filmData = Object.assign({}, this._filmData, newData);
    const prevFilmComponent = this._filmComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;
    this._filmComponent = new FilmView(this._filmData);
    this._filmPopupComponent = new FilmPopupView(this._filmData);
    this._setHandlers();
    if (this._filmsContainer.contains(prevFilmComponent.element)) {
      replace(this._filmComponent.element, prevFilmComponent.element);
    }
    if (this._popupContainer.contains(prevFilmPopupComponent.element)) {
      replace(this._filmPopupComponent.element, prevFilmPopupComponent.element);
    }
    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);
  }

  _setHandlers() {
    this._filmComponent.setOpenPopupClickHandler(this._openClickHandler);
    this._filmComponent.setOnFavoriteClickHandler(this._onFavoriteClickHandler);
    this._filmComponent.setOnWatchListClickHandler(this._onWatchListClickHandler);
    this._filmComponent.setOnWatchedClickHandler(this._onWatchedClickHandler);
    this._filmPopupComponent.setCloseButtonClickHandler(this._closeClickHandler);
    this._filmPopupComponent.setOnFavoriteClickHandler(this._onFavoriteClickHandler);
    this._filmPopupComponent.setOnWatchListClickHandler(this._onWatchListClickHandler);
    this._filmPopupComponent.setOnWatchedClickHandler(this._onWatchedClickHandler);
    this._filmPopupComponent.setOnSubmitHandler(this._onFormSubmit);
  }

  _onFormSubmit(data) {
    this._onDataChange(data);
  }

  _onFavoriteClickHandler(data) {
    this._onDataChange(data, this._filmData.id);
    this._update(data);
  }
  _onWatchedClickHandler(data) {
    this._onDataChange(data, this._filmData.id);
    this._update(data);
  }
  _onWatchListClickHandler(data) {
    this._onDataChange(data, this._filmData.id);
    this._update(data);
  }

  resetPopupView() {
    if (this._isPopupOpen) {
      this._closeFilmPopup();
    }
  }
  _openClickHandler() {
    this._openFilmPopup();
  }
  _closeClickHandler() {
    this._closeFilmPopup();
  }
  _openFilmPopup() {
    this._onPopupOpen();
    this._isPopupOpen = true;
    render(this._popupContainer, this._filmPopupComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscPress);

  }
  _closeFilmPopup() {
    this._filmPopupComponent.element.remove();
    this._filmPopupComponent.removeElement();
    this._update(this._filmData);
    this._isPopupOpen = false;
  }
  _onEscPress(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      this._closeFilmPopup();
      document.removeEventListener(`keydown`, this._onEscPress);
    }
  }
}
