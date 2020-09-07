

export default class FilmView {
  constructor(filmData) {
    this._film = filmData;
    this._element = null;
  }
  get element() {
    if (!this._element) {
      this._element = this.createElement();

    }
    return this._element;
  }
  createElement() {
    const div = document.createElement(`div`);
    div.innerHTML = this.createTemplate();
    return div.firstChild;
  }
  removeElement() {
    this._element = null;
  }
  createTemplate() {
    const {name, rating, year, runtime, genres, poster, description, comments, isFavorite, isWatched, isInWatchlist} = this._film;
    const favoriteActiveClass = isFavorite ? `film-card__controls-item--active` : ``;
    const watchedActiveClass = isWatched ? `film-card__controls-item--active` : ``;
    const watchlistActiveClass = isInWatchlist ? `film-card__controls-item--active` : ``;
    return `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${name} poster" class="film-card__poster">
      <p class="film-card__description">${description.slice(0, 137)}...</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchedActiveClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchlistActiveClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteActiveClass}">Mark as favorite</button>
      </form>
    </article>`;
  }
}
