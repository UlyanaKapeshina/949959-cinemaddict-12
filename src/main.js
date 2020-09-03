import {createNavTemplate} from "./view/nav";
import {createSortTemplate} from "./view/sort";
import {createFilmsTemplate} from "./view/list";
import {createExtraTopTemplate} from "./view/top-list";

import {createButtonTemplate} from "./view/button";
import {createFooterStatTemplate} from "./view/footer-stat";
import {createCardPopupTemplate} from "./view/popup";
import {createFilmCardTemplate} from "./view/card";
import {createExtraMostTemplate} from "./view/most-list";
import {createFilm} from "./mock/film";
import {getRandomInteger} from "./util";
import {getProfileTemplate} from "./view/profile";
import {getTitleTemplate} from "./view/title";

const CARD_COUNT = 20;
const EXTRA_CARD_COUNT = 2;
const SHOWN_CARDS_COUNT = 5;
const filmsData = new Array(CARD_COUNT).fill().map(createFilm);


const render = (container, element, place) => {
  container.insertAdjacentHTML(place, element);
};

const main = document.querySelector(`main`);
const footer = document.querySelector(`footer`);
const header = document.querySelector(`.header`);

render(header, getProfileTemplate(filmsData), `beforeend`);
render(main, createNavTemplate(filmsData), `beforeend`);
render(main, createSortTemplate(), `beforeend`);
render(main, createFilmsTemplate(), `beforeend`);
const films = main.querySelector(`.films`);
const filmsListContainer = films.querySelector(`.films-list__container`);
const filmsList = films.querySelector(`.films-list`);
render(filmsList, getTitleTemplate(filmsData), `afterbegin`);

render(footer, createFooterStatTemplate(getRandomInteger(100, 1000000)), `beforeend`);
render(footer, createCardPopupTemplate(createFilm()), `afterend`);


const renderExtra = () => {
  render(films, createExtraTopTemplate(), `beforeend`);
  render(films, createExtraMostTemplate(), `beforeend`);
  const [filmsExtraTop, filmsExtraMost] = films.querySelectorAll(`.films-list--extra`
  );
  const filmsExtraTopList = filmsExtraTop.querySelector(`.films-list__container`);
  const filmsExtraMostList = filmsExtraMost.querySelector(`.films-list__container`
  );

  const topRatedFilmsData = filmsData.sort((a, b) => b.rating - a.rating).slice(0, EXTRA_CARD_COUNT);
  const mostCommentedFilmsData = filmsData.sort((a, b) => b.comments.length - a.comments.length).slice(0, EXTRA_CARD_COUNT);

  topRatedFilmsData.map((it)=> {
    render(filmsExtraTopList, createFilmCardTemplate(it), `beforeend`);
  });
  mostCommentedFilmsData.map((it)=> {
    render(filmsExtraMostList, createFilmCardTemplate(it), `beforeend`);
  });
};

const renderFilms = () => {
  if (!filmsData.length) {
    return;
  }
  filmsData.slice(0, SHOWN_CARDS_COUNT).map((it)=> {
    render(filmsListContainer, createFilmCardTemplate(it), `beforeend`);
  });
  renderExtra();

  if (filmsData.length > SHOWN_CARDS_COUNT) {
    let shownCards = SHOWN_CARDS_COUNT;
    render(filmsListContainer, createButtonTemplate(), `afterend`);
    const button = films.querySelector(`.films-list__show-more`);
    button.addEventListener(`click`, function () {
      filmsData.slice(shownCards, shownCards + SHOWN_CARDS_COUNT).map((it)=> {
        render(filmsListContainer, createFilmCardTemplate(it), `beforeend`);
      });
      shownCards = shownCards + SHOWN_CARDS_COUNT;
      if (shownCards >= CARD_COUNT) {
        button.remove();
      }
    });
  }
};
renderFilms();
