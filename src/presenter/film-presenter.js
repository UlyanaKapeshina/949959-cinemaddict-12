import FilmView from "../view/film";
import {remove, render, RenderPosition, replace} from "../utils/render";
const TypeAction = {
  DELETE: `delete`,
  ADD: `add`
};
export default class Film {
  constructor(container, onDataChange, _onOpenPopupClick) {
    this._filmsContainer = container.element;
    this._onDataChange = onDataChange;
    this._onOpenPopupClick = _onOpenPopupClick;
    this._openClickHandler = this._openClickHandler.bind(this);
    this._onFavoriteClickHandler = this._onFavoriteClickHandler.bind(this);
    this._onWatchListClickHandler = this._onWatchListClickHandler.bind(this);
    this._onWatchedClickHandler = this._onWatchedClickHandler.bind(this);
    this._onDeleteClickHandler = this._onDeleteClickHandler.bind(this);
    this.init = this.init.bind(this);

    this._id = null;
  }
  init(filmData) {
    this._filmData = filmData;
    this._id = filmData.id;
    this._filmComponent = new FilmView(this._filmData);
    this._setHandlers();
    render(this._filmsContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }
  update(newData) {
    this._filmData = newData;

    const prevFilmComponent = this._filmComponent;
    this._filmComponent = new FilmView(this._filmData);
    this._setHandlers();
    if (this._filmsContainer.contains(prevFilmComponent.element)) {
      replace(this._filmComponent.element, prevFilmComponent.element);
    }
    remove(prevFilmComponent);
  }
  get id() {
    return this._id;
  }

  _setHandlers() {
    this._filmComponent.setOpenPopupClickHandler(this._openClickHandler);
    this._filmComponent.setOnFavoriteClickHandler(this._onFavoriteClickHandler);
    this._filmComponent.setOnWatchListClickHandler(this._onWatchListClickHandler);
    this._filmComponent.setOnWatchedClickHandler(this._onWatchedClickHandler);
  }

  _onFormSubmitHandler(newCommentData) {
    this._onCommentsChange(TypeAction.ADD, [this._id], newCommentData);
  }
  _onDeleteClickHandler(id) {
    this._onCommentsChange(TypeAction.DELETE, [this._id, id]);
  }
  _onFavoriteClickHandler(data) {
    this._onDataChange(data, {isFavorite: data.isFavorite});
  }
  _onWatchedClickHandler(data) {
    this._onDataChange(data, {isWatched: data.isWatched});
  }
  _onWatchListClickHandler(data) {
    this._onDataChange(data, {isInWatchlist: data.isInWatchlist});
  }
  _openClickHandler() {
    this._onOpenPopupClick(this._filmData);
  }
  destroy() {
    remove(this._filmComponent);
  }
}
// import FilmView from "../view/film";
// import FilmPopupView from "../view/film-popup";
// import {remove, render, RenderPosition, replace} from "../utils/render";
// const TypeAction = {
//   DELETE: `delete`,
//   ADD: `add`
// }
// export default class Film {
//   constructor(container, popupContainer, onDataChange, onPopupOpen, onCommentsChange, commentsModel) {
//     this._commentsModel = commentsModel;
//     this._filmsContainer = container.element;
//     this._popupContainer = popupContainer;
//     this._onPopupOpen = onPopupOpen;
//     this._onDataChange = onDataChange;
//     this._onCommentsChange = onCommentsChange;
//     this._openClickHandler = this._openClickHandler.bind(this);
//     this._closeClickHandler = this._closeClickHandler.bind(this);
//     this._onEscPress = this._onEscPress.bind(this);
//     this._onFavoriteClickHandler = this._onFavoriteClickHandler.bind(this);
//     this._onWatchListClickHandler = this._onWatchListClickHandler.bind(this);
//     this._onWatchedClickHandler = this._onWatchedClickHandler.bind(this);
//     this._onDeleteClickHandler = this._onDeleteClickHandler.bind(this);
//     this._onFormSubmitHandler = this._onFormSubmitHandler.bind(this);
//     this._addToPopupCash = this._addToPopupCash.bind(this);
//     this.init = this.init.bind(this);
//     this._isPopupOpen = false;
//     this._id = null;
//     this._closePopupHandler = null;
//   }
//   init(filmData) {
//     this._filmData = filmData;
//     this._id = filmData.id;
//     this._commentsData = this._commentsModel.getComments();
//     this._filmComponent = new FilmView(this._filmData);
//     this._filmPopupComponent = new FilmPopupView(this._filmData, this._commentsData);
//     this._setHandlers();
//     render(this._filmsContainer, this._filmComponent, RenderPosition.BEFOREEND);
//   }
//   update(newData, isCommentsChange) {
//     this._filmData = newData ? newData : this._filmData;
//     this._commentsData = isCommentsChange ? this._commentsModel.getComments() : this._commentsData;
//     const prevFilmComponent = this._filmComponent;
//     const prevFilmPopupComponent = this._filmPopupComponent;
//     this._filmComponent = new FilmView(this._filmData);
//     this._filmPopupComponent = new FilmPopupView(this._filmData, this._commentsData, this._popupCash);
//     this._setHandlers();
//     if (this._filmsContainer.contains(prevFilmComponent.element)) {
//       replace(this._filmComponent.element, prevFilmComponent.element);
//     }
//     if (this._popupContainer.contains(prevFilmPopupComponent.element)) {
//       replace(this._filmPopupComponent.element, prevFilmPopupComponent.element);
//     }
//     remove(prevFilmComponent);
//     remove(prevFilmPopupComponent);
//   }
//   get id() {
//     return this._id;
//   }
//   get isPopup() {
//     return this._isPopupOpen;
//   }
//   _setHandlers() {
//     this._filmComponent.setOpenPopupClickHandler(this._openClickHandler);
//     this._filmComponent.setOnFavoriteClickHandler(this._onFavoriteClickHandler);
//     this._filmComponent.setOnWatchListClickHandler(this._onWatchListClickHandler);
//     this._filmComponent.setOnWatchedClickHandler(this._onWatchedClickHandler);
//     this._filmPopupComponent.setCloseButtonClickHandler(this._closeClickHandler);
//     this._filmPopupComponent.setOnFavoriteClickHandler(this._onFavoriteClickHandler);
//     this._filmPopupComponent.setOnWatchListClickHandler(this._onWatchListClickHandler);
//     this._filmPopupComponent.setOnWatchedClickHandler(this._onWatchedClickHandler);
//     this._filmPopupComponent.setAddToPopupCash(this._addToPopupCash);
//     this._filmPopupComponent.setDeleteClickHandler(this._onDeleteClickHandler);
//     this._filmPopupComponent.setOnSubmitHandler(this._onFormSubmitHandler);
//   }

//   _onFormSubmitHandler(newCommentData) {
//     this._onCommentsChange(TypeAction.ADD, [this._id], newCommentData);
//   }
//   _onDeleteClickHandler(id) {
//     this._onCommentsChange(TypeAction.DELETE, [this._id, id]);
//   }
//   _onFavoriteClickHandler(data) {
//     this._onDataChange({isFavorite: data.isFavorite}, this._filmData.id);
//   }
//   _onWatchedClickHandler(data) {
//     this._onDataChange({isWatched: data.isWatched}, this._filmData.id);
//   }
//   _onWatchListClickHandler(data) {
//     this._onDataChange({isInWatchlist: data.isInWatchlist}, this._filmData.id);
//   }
//   _addToPopupCash(data) {
//     this._popupCash = Object.assign({}, this._popupCash, data);
//   }

//   resetPopupView() {
//     if (this._isPopupOpen) {
//       this._closeFilmPopup();
//     }
//   }
//   setClosePopupHandler(callback) {
//     this._closePopupHandler = callback;
//   }
//   _onClosePopup() {
//     if (this._closePopupHandler) {
//       this._closePopupHandler();
//       this._closePopupHandler = null;
//     }
//   }
//   _openClickHandler() {
//     this._openFilmPopup();
//   }
//   _closeClickHandler() {
//     this._closeFilmPopup();
//   }
//   _openFilmPopup() {
//     this._onPopupOpen();
//     this._isPopupOpen = true;
//     this._filmPopupComponent.restoreHandlers();
//     render(this._popupContainer, this._filmPopupComponent, RenderPosition.BEFOREEND);
//     document.addEventListener(`keydown`, this._onEscPress);

//   }
//   _closeFilmPopup() {
//     this._filmPopupComponent.element.remove();
//     this._filmPopupComponent.removeElement();
//     this._popupCash = {};
//     this._isPopupOpen = false;
//     this._onClosePopup();
//   }
//   _onEscPress(evt) {
//     if (evt.key === `Escape`) {
//       evt.preventDefault();
//       this._closeFilmPopup();
//       document.removeEventListener(`keydown`, this._onEscPress);
//     }
//   }
//   destroy() {
//     remove(this._filmPopupComponent);
//     remove(this._filmComponent);
//   }
// }
