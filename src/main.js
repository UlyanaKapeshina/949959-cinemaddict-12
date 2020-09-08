import FilterView from "./view/filter";
import FooterStatView from "./view/footer-stat";
import {createFilm} from "./mock/film-mock";
import {getRandomInteger, render, RENDER_POSITION} from "./util";
import ProfileView from "./view/profile";
import {getFilterItems} from "./mock/filters-mock";
import SortView from "./view/sort";
import {getRatingName} from "./mock/profile-mock";
import FilmsBoardPresenter from "./view/presenter/filmsBoard";

const CARD_COUNT = 20;

const filmsData = new Array(CARD_COUNT).fill().map(createFilm);
const filtersItems = getFilterItems(filmsData);
const profileRatingName = getRatingName(filmsData);
const moviesCount = getRandomInteger(100, 1000000);

const main = document.querySelector(`main`);
const footer = document.querySelector(`footer`);
const header = document.querySelector(`.header`);
const body = document.querySelector(`body`);


render(header, new ProfileView(profileRatingName), RENDER_POSITION.BEFOREEND);
render(main, new FilterView(filtersItems), RENDER_POSITION.BEFOREEND);
render(main, new SortView(), RENDER_POSITION.BEFOREEND);
const filmsPresenter = new FilmsBoardPresenter(main, body);
filmsPresenter.init(filmsData);
render(footer, new FooterStatView(moviesCount), RENDER_POSITION.BEFOREEND);


