import {EMOTIONS} from "../constants";

import Smart from "./smart";
import {formatDurationFilm, formatDate, formatCommentDate} from "../utils/common";

export default class FilmPopupView extends Smart {
  constructor(filmData) {
    super();
    // this._film = filmData;
    this._data = filmData;
    this._emoji = ``;
    this._closeButtonClickHandlerBind = this._closeButtonClickHandler.bind(this);
    this._onFavoriteClickHandler = this._onFavoriteClickHandler.bind(this);
    this._onWatchedClickHandler = this._onWatchedClickHandler.bind(this);
    this._onWatchListClickHandler = this._onWatchListClickHandler.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onEmojiInputClick = this._onEmojiInputClick.bind(this);
    this._onCommentInputChange = this._onCommentInputChange.bind(this);
    this._setInnerHandlers();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.close = callback;
    this.element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeButtonClickHandlerBind);
  }

  setOnFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.element.querySelector(`#favorite`).addEventListener(`click`, this._onFavoriteClickHandler);
  }
  setOnWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.element.querySelector(`#watched`).addEventListener(`click`, this._onWatchedClickHandler);
  }
  setOnWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.element.querySelector(`#watchlist`).addEventListener(`click`, this._onWatchListClickHandler);
  }

  setOnSubmitHandler(callback) {
    this._callback.submit = callback;
    this.element.querySelector(`.film-details__inner`).addEventListener(`submit`, this._onFormSubmit);
  }
  _restoreHandlers() {
    this._setInnerHandlers();
    this.setOnFavoriteClickHandler(this._callback.favoriteClick);
    this.setOnWatchedClickHandler(this._callback.watchedClick);
    this.setOnWatchListClickHandler(this._callback.watchListClick);
    this.setOnSubmitHandler(this._callback.submit);
    this.setCloseButtonClickHandler(this._callback.close);
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.close();
  }
  _onFormSubmit(evt) {
    evt.preventDefault();
    if (!this._emoji) {
      return;
    }

    this._updateData();
    this._callback.submit(this._data);
  }

  _onFavoriteClickHandler(evt) {
    evt.preventDefault();
    this._data.isFavorite = !this._data.isFavorite;
    this._callback.favoriteClick({isFavorite: this._data.isFavorite});
  }

  _onWatchedClickHandler(evt) {
    evt.preventDefault();
    this._data.isWatched = !this._data.isWatched;
    this._callback.watchedClick({isWatched: this._data.isWatched});
  }

  _onWatchListClickHandler(evt) {
    evt.preventDefault();
    this._data.isInWatchlist = !this._data.isInWatchlist;
    this._callback.watchListClick({isInWatchlist: this._data.isInWatchlist});
  }
  _setInnerHandlers() {
    this.element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._onEmojiInputClick);
    this.element.querySelector(`.film-details__comment-input`).addEventListener(`change`, this._onCommentInputChange);
  }
  _onEmojiInputClick(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    this._updateData({newCommentEmotion: evt.target.value});
  }
  _onCommentInputChange(evt) {
    this._updateData({newCommentText: evt.target.value}, false);
  }

  createTemplate() {
    const {poster, name, rating, releaseDate, runtime, genres, description, old, director, writers, actors, country, comments, isFavorite, isWatched, isInWatchlist, newCommentEmotion, newCommentText} = this._data;
    const genresList = genres.map((it) => {
      return `<span class="film-details__genre">${it}</span>`;
    }).join(``);
    const dateRelease = formatDate(releaseDate);
    const formattedRuntime = formatDurationFilm(runtime);

    const commentsList = comments.map((it) => {
      const date = formatCommentDate(it.date);

      return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${it.emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${it.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${it.author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
    }).join(``);
    const emoji = newCommentEmotion ? `<img src="images/emoji/${newCommentEmotion}.png" width="55" height="55" alt="emoji-${newCommentEmotion}">` : ``;
    const text = newCommentText ? newCommentText : ``;

    const emojiList = EMOTIONS.map((it) => {
      return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${it}" value="${it}" ${it === this._data.newCommentEmotion ? `checked` : ``}>
              <label class="film-details__emoji-label" for="emoji-${it}">
                <img src="./images/emoji/${it}.png" width="30" height="30" alt="emoji">
              </label>`;
    }).join(``);

    return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${name} poster">

            <p class="film-details__age">${old}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${name}</h3>
                <p class="film-details__title-original">Original: ${name}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tbody><tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${dateRelease}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formattedRuntime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genresList.length > 1 ? `Genres` : `Genre`}</td>
                <td class="film-details__cell">
                 ${genresList}
              </tr>
            </tbody></table>

            <p class="film-details__film-description">
             ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchlist ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsList}
          </ul>

          <div class="film-details__new-comment">

            <div for="add-emoji" class="film-details__add-emoji-label">${emoji}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
            </label>

            <div class="film-details__emoji-list">
        ${emojiList}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
  }
}

