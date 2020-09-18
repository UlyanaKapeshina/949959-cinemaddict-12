import FilmView from "../view/film";
import FilmPopupView from "../view/film-popup";
import {remove, render, RenderPosition, replace} from "../utils/render";
const TypeAction = {
  DELETE: `delete`,
  ADD: `add`
}
export default class Film {
  constructor(container, popupContainer, onDataChange, onPopupOpen, onCommentsChange) {
    // this._commentsModel = commentsModel;
    this._filmsContainer = container.element;
    this._popupContainer = popupContainer;
    this._onPopupOpen = onPopupOpen;
    this._openClickHandler = this._openClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onFavoriteClickHandler = this._onFavoriteClickHandler.bind(this);
    this._onWatchListClickHandler = this._onWatchListClickHandler.bind(this);
    this._onWatchedClickHandler = this._onWatchedClickHandler.bind(this);
    this._onTextareaChangeHandler = this._onTextareaChangeHandler.bind(this);
    this._onEmojiChangeHandler = this._onEmojiChangeHandler.bind(this);
    this._onDeleteClickHandler = this._onDeleteClickHandler.bind(this);
    this._onFormSubmitHandler = this._onFormSubmitHandler.bind(this);
    this._onDataChange = onDataChange;
    this._onCommentsChange = onCommentsChange;
    this.init = this.init.bind(this);
    this._isPopupOpen = false;
  }

  init(filmData, commentsData) {
    this._filmData = filmData;
    this._commentsData = commentsData;
    this._filmComponent = new FilmView(this._filmData);
    this._filmPopupComponent = new FilmPopupView(this._filmData, this._commentsData);
    this._setHandlers();
    render(this._filmsContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }

  update(newData) {
    // this._filmData = newData;
    // const prevFilmComponent = this._filmComponent;
    // const prevFilmPopupComponent = this._filmPopupComponent;
    // this._filmComponent = new FilmView(this._filmData);
    // this._filmPopupComponent = new FilmPopupView(this._filmData, this._commentsData, this._popupCash);
    // this._setHandlers();
    // if (this._filmsContainer.contains(prevFilmComponent.element)) {
    //   replace(this._filmComponent.element, prevFilmComponent.element);
    // }
    // if (this._popupContainer.contains(prevFilmPopupComponent.element)) {
    //   replace(this._filmPopupComponent.element, prevFilmPopupComponent.element);
    // }
    // remove(prevFilmComponent);
    // remove(prevFilmPopupComponent);
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
    this._filmPopupComponent.setTextareaChangeHandler(this._onTextareaChangeHandler);
    this._filmPopupComponent.setEmojiChangeHandler(this._onEmojiChangeHandler);
    this._filmPopupComponent.setDeleteClickHandler(this._onDeleteClickHandler);
    this._filmPopupComponent.setOnSubmitHandler(this._onFormSubmitHandler);
  }

  _onFormSubmitHandler(data) {
    this._onDataChange(data);
  }
  _onDeleteClickHandler(id) {
    this._onCommentsChange(TypeAction.DELETE, id);
    // this._update(data);
  }

  _onFavoriteClickHandler(data) {
    this._onDataChange(data, this._filmData.id);
    // this._update(data);
  }
  _onWatchedClickHandler(data) {
    this._onDataChange(data, this._filmData.id);
    // this._update(data);
  }
  _onWatchListClickHandler(data) {
    this._onDataChange(data, this._filmData.id);
    // this._update(data);
  }
  _onTextareaChangeHandler(data) {
    this._popupCash = Object.assign({}, this._popupCash, {text: data});
  }
  _onEmojiChangeHandler(data) {
    this._popupCash = Object.assign({}, this._popupCash, {emoji: data});
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
    this._filmPopupComponent.restoreHandlers();
    render(this._popupContainer, this._filmPopupComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscPress);

  }
  _closeFilmPopup() {
    this._filmPopupComponent.element.remove();
    this._filmPopupComponent.removeElement();
    this._popupCash = null;
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
