const createNavTemplate = () => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">0</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">0</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">0</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};
const createSortTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>`;
};
const createFilmsTemplate = () => {
  return `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">
    </div>
  </section>

</section>`;
};
const createExtraTopTemplate = () => {
  return `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
      </div>
    </section>`;
};
const createExtraMostTemplate = () => {
  return `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
    </section>`;
};
const createFilmCardTemplate = () => {
  return `<article class="film-card">
  <h3 class="film-card__title">The Dance of Life</h3>
  <p class="film-card__rating">8.3</p>
  <p class="film-card__info">
    <span class="film-card__year">1929</span>
    <span class="film-card__duration">1h 55m</span>
    <span class="film-card__genre">Musical</span>
  </p>
  <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
  <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
  <a class="film-card__comments">5 comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
  </form>
</article>`;
};
const createButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};
const createFooterStatTemplate = () => {
  return `<section class="footer__statistics">
  <p>130 291 movies inside</p>
</section>`;
};
const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

const render = (container, element, place) => {
  container.insertAdjacentHTML(place, element);
};
const main = document.querySelector("main");
const footer = document.querySelector("footer");
render(main, createNavTemplate(), "beforeend");
render(main, createSortTemplate(), "beforeend");
render(main, createFilmsTemplate(), "beforeend");
const films = main.querySelector(".films");
const filmsList = films.querySelector(".films-list__container");
for (let i = 0; i < CARD_COUNT; i++) {
  render(filmsList, createFilmCardTemplate(), "beforeend");
}

render(films, createExtraTopTemplate(), "beforeend");
render(films, createExtraMostTemplate(), "beforeend");
const [filmsExtraTop, filmsExtraMost] = films.querySelectorAll(
  ".films-list--extra"
);
const filmsExtraTopList = filmsExtraTop.querySelector(".films-list__container");
const filmsExtraMostList = filmsExtraMost.querySelector(
  ".films-list__container"
);

for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  render(filmsExtraTopList, createFilmCardTemplate(), "beforeend");
  render(filmsExtraMostList, createFilmCardTemplate(), "beforeend");
}
render(filmsList, createButtonTemplate(), "afterend");
render(footer, createFooterStatTemplate(), "beforeend");
