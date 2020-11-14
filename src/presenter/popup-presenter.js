
import FilmPopupView from "../view/film-popup";
import {remove, render, RenderPosition, replace} from "../utils/render";
const TypeAction = {
  DELETE: `delete`,
  ADD: `add`
};
export default class PopupPresenter {
  constructor(popupContainer, onDataChange, onCommentsChange, commentsModel) {
    this._commentsModel = commentsModel;
    this._popupContainer = popupContainer;
    this._onDataChange = onDataChange;
    this._onCommentsChange = onCommentsChange;
    this._openClickHandler = this._openClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onControlsClickHandler = this._onControlsClickHandler.bind(this);
    this._onDeleteClickHandler = this._onDeleteClickHandler.bind(this);
    this._onFormSubmitHandler = this._onFormSubmitHandler.bind(this);
    this._addToPopupCash = this._addToPopupCash.bind(this);
    this._clearCash = this._clearCash.bind(this);
    this._isPopupOpen = false;
    this._closePopupHandler = null;
  }
  init(filmData) {
    this._filmData = filmData;
    this._isPopupOpen = true;
    this._commentsData = this._commentsModel.getComments();
    this._filmPopupComponent = new FilmPopupView(this._filmData, this._commentsData);
    this._setHandlers();
    render(this._popupContainer, this._filmPopupComponent, RenderPosition.BEFOREEND);
  }
  update(newData) {
    this._isPopupOpen = true;
    this._filmData = newData;
    this._commentsData = this._commentsModel.getComments();
    const prevFilmPopupComponent = this._filmPopupComponent;
    this._filmPopupComponent = new FilmPopupView(this._filmData, this._commentsData, this._popupCash);
    this._setHandlers();

    if (this._popupContainer.contains(prevFilmPopupComponent.element)) {
      replace(this._filmPopupComponent.element, prevFilmPopupComponent.element);
    }

    remove(prevFilmPopupComponent);
  }

  get isPopup() {
    return this._isPopupOpen;
  }
  _setHandlers() {
    this._filmPopupComponent.setCloseButtonClickHandler(this._closeClickHandler);
    this._filmPopupComponent.setOnFavoriteClickHandler(this._onControlsClickHandler);
    this._filmPopupComponent.setOnWatchListClickHandler(this._onControlsClickHandler);
    this._filmPopupComponent.setOnWatchedClickHandler(this._onControlsClickHandler);
    this._filmPopupComponent.setAddToPopupCash(this._addToPopupCash);
    this._filmPopupComponent.setDeleteClickHandler(this._onDeleteClickHandler);
    this._filmPopupComponent.setOnSubmitHandler(this._onFormSubmitHandler);
  }

  _onFormSubmitHandler(newCommentData, onError) {
    this._onCommentsChange(TypeAction.ADD, this._filmData, null, newCommentData, onError, this._clearCash);
    this._filmPopupComponent.disableForm();
  }
  _onDeleteClickHandler(id, onError) {
    const newFilmData = Object.assign({}, this._filmData);
    newFilmData.comments = newFilmData.comments.filter((it) => it !== id);
    this._onCommentsChange(TypeAction.DELETE, newFilmData, id, null, onError);
  }
  _clearCash() {
    this._popupCash = {};
  }

  _onControlsClickHandler(data, update, onError) {
    this._onDataChange(data, update, onError);
  }
  _addToPopupCash(data) {
    this._popupCash = Object.assign({}, this._popupCash, data);
  }

  resetPopupView() {
    if (this._isPopupOpen) {
      this._closeFilmPopup();
    }
  }
  setClosePopupHandler(callback) {
    this._closePopupHandler = callback;
  }
  _onClosePopup() {
    if (this._closePopupHandler) {
      this._closePopupHandler();
      this._closePopupHandler = null;
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
    remove(this._filmPopupComponent);
    this._popupCash = {};
    this._isPopupOpen = false;
    this._onClosePopup();
  }
  _onEscPress(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      this._closeFilmPopup();
      document.removeEventListener(`keydown`, this._onEscPress);
    }
  }
  destroy() {
    remove(this._filmPopupComponent);
  }
}

