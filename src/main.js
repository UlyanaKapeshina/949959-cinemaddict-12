import FilterView from "./view/filter";
import FooterStatView from "./view/footer-stat";
import {createFilm} from "./mock/film-mock";
import {render, RenderPosition} from "./utils/render";
import ProfileView from "./view/profile";
import {getFilterItems} from "./mock/filters-mock";

import {getRatingName} from "./mock/profile-mock";
import FilmsBoardPresenter from "./presenter/movie-list";
import {getRandomInteger} from "./utils/common";

const CARD_COUNT = 20;

const filmsData = new Array(CARD_COUNT).fill().map(createFilm);

const filtersItems = getFilterItems(filmsData);
const profileRatingName = getRatingName(filmsData);
const moviesCount = getRandomInteger(100, 1000000);

const main = document.querySelector(`main`);
const footer = document.querySelector(`footer`);
const header = document.querySelector(`.header`);
const body = document.querySelector(`body`);


render(header, new ProfileView(profileRatingName), RenderPosition.BEFOREEND);
render(main, new FilterView(filtersItems), RenderPosition.BEFOREEND);

const filmsPresenter = new FilmsBoardPresenter(main, body);
filmsPresenter.init(filmsData);
render(footer, new FooterStatView(moviesCount), RenderPosition.BEFOREEND);


