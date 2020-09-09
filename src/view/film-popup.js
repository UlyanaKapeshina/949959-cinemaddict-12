import {EMOTIONS} from "../constants";
import Abstract from "./abstract";


export default class FilmPopupView extends Abstract {
  constructor(filmData) {
    super();
    this._film = filmData;
  }

  createTemplate() {
    const {poster, name, rating, releaseDate, runtime, genres, description, old, director, writers, actors, country, comments, isFavorite, isWatched, isInWatchlist} = this._film;
    const genresList = genres.map((it) => {
      return `<span class="film-details__genre">${it}</span>`;
    }).join(``);
    const dateRelease = releaseDate.toLocaleString();


    const commentsList = comments.map((it) => {
      const date = new Date(it.date).toLocaleString();

      return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${it.emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${it.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${it.author}</span>
          <span class="film-details__comment-day">${date.slice(0, date.length - 3)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
    }).join(``);

    const emojiList = EMOTIONS.map((it) => {
      return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${it}" value="${it}">
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
                <td class="film-details__cell">${dateRelease.slice(0, dateRelease.length - 10).split(`.`).join(`/`)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runtime}</td>
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
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.size}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsList}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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
