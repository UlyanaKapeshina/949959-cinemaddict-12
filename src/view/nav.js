import {FILTERS, filterFilms} from "../mock/filters";


export const createNavTemplate = (films) => {
  const filteredFilms = filterFilms(films);


  const filtersList = Object.keys(FILTERS).map((it, index) => {
    const activeClass = index === 0 ? `main-navigation__item--active` : ``;

    return `<a href="#${it}" class="main-navigation__item ${activeClass} ">${FILTERS[it]}${index !== 0 ? `<span class="main-navigation__item-count">${filteredFilms[it].length}</span></a>` : ``}`;
  }).join(``);

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
  ${filtersList}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

