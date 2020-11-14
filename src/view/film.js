import Abstract from "./abstract";

import {formatDurationFilm} from "../utils/common";


export default class FilmView extends Abstract {
  constructor(filmData) {
    super();
    this._data = filmData;
    this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    this._onFavoriteClickHandler = this._onFavoriteClickHandler.bind(this);
    this._onWatchedClickHandler = this._onWatchedClickHandler.bind(this);
    this._onWatchListClickHandler = this._onWatchListClickHandler.bind(this);
    this.onUpdateError = this.onUpdateError.bind(this);
  }
  setOpenPopupClickHandler(callback) {
    this._callback.click = callback;
    this.element.querySelector(`.film-card__title`).addEventListener(`click`, this._openPopupClickHandler);
    this.element.querySelector(`.film-card__poster`).addEventListener(`click`, this._openPopupClickHandler);
    this.element.querySelector(`.film-card__comments`).addEventListener(`click`, this._openPopupClickHandler);
  }
  setOnFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onFavoriteClickHandler);
  }
  setOnWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onWatchedClickHandler);
  }
  setOnWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onWatchListClickHandler);
  }

  _openPopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  onUpdateError() {
    this.element.querySelector(`.film-card__controls`).classList.add(`shake`);
  }


  _onFavoriteClickHandler(evt) {
    evt.preventDefault();
    this._data.isFavorite = !this._data.isFavorite;
    this.element.querySelector(`.film-card__controls`).classList.remove(`shake`);
    this._callback.favoriteClick(this._data, {isFavorite: this._data.isFavorite}, this.onUpdateError);
  }
  _onWatchedClickHandler(evt) {
    evt.preventDefault();
    this._data.isWatched = !this._data.isWatched;
    this.element.querySelector(`.film-card__controls`).classList.remove(`shake`);
    this._callback.watchedClick(this._data, {isWatched: this._data.isWatched}, this.onUpdateError);
  }
  _onWatchListClickHandler(evt) {
    evt.preventDefault();
    this._data.isInWatchlist = !this._data.isInWatchlist;
    this.element.querySelector(`.film-card__controls`).classList.remove(`shake`);
    this._callback.watchListClick(this._data, {isInWatchlist: this._data.isInWatchlist}, this.onUpdateError);
  }

  createTemplate() {
    const {name, rating, runtime, releaseDate, genres, poster, description, comments, isFavorite, isWatched, isInWatchlist} = this._data;
    const favoriteActiveClass = isFavorite ? `film-card__controls-item--active` : ``;
    const watchedActiveClass = isWatched ? `film-card__controls-item--active` : ``;
    const watchlistActiveClass = isInWatchlist ? `film-card__controls-item--active` : ``;
    const formattedRuntime = formatDurationFilm(runtime);
    const year = new Date(releaseDate).getFullYear();

    return `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${formattedRuntime}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="${name} poster" class="film-card__poster">
      <p class="film-card__description">${description.slice(0, 137)}...</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistActiveClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedActiveClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteActiveClass}">Mark as favorite</button>
      </form>
    </article>`;
  }
}
