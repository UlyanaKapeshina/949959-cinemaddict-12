import {createNavTemplate} from "./view/nav";
import {createSortTemplate} from "./view/sort";
import {createFilmsTemplate} from "./view/list";
import {createExtraTopTemplate} from "./view/top-list";

import {createButtonTemplate} from "./view/button";
import {createFooterStatTemplate} from "./view/footer-stat";
import {createCardPopupTemplate} from "./view/popup";
import {createFilmCardTemplate} from "./view/card";
import {createExtraMostTemplate} from "./view/most-list";
const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

const render = (container, element, place) => {
  container.insertAdjacentHTML(place, element);
};
const main = document.querySelector(`main`);
const footer = document.querySelector(`footer`);
render(main, createNavTemplate(), `beforeend`);
render(main, createSortTemplate(), `beforeend`);
render(main, createFilmsTemplate(), `beforeend`);
const filmsContainer = main.querySelector(`.films`);
const filmsList = filmsContainer.querySelector(`.films-list__container`);
for (let i = 0; i < CARD_COUNT; i++) {
  render(filmsList, createFilmCardTemplate(), `beforeend`);
}

render(filmsContainer, createExtraTopTemplate(), `beforeend`);
render(filmsContainer, createExtraMostTemplate(), `beforeend`);
const [filmsExtraTop, filmsExtraMost] = filmsContainer.querySelectorAll(`.films-list--extra`
);
const filmsExtraTopList = filmsExtraTop.querySelector(`.films-list__container`);
const filmsExtraMostList = filmsExtraMost.querySelector(`.films-list__container`
);

for (let i = 0; i < EXTRA_CARD_COUNT; i++) {
  render(filmsExtraTopList, createFilmCardTemplate(), `beforeend`);
  render(filmsExtraMostList, createFilmCardTemplate(), `beforeend`);
}
render(filmsList, createButtonTemplate(), `afterend`);
render(footer, createFooterStatTemplate(), `beforeend`);
render(footer, createCardPopupTemplate(), `afterend`);
