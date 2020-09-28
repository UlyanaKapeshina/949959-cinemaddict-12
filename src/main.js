
import FooterStatView from "./view/footer-stat";
import {createFilm, comments} from "./mock/film-mock";
import {render, RenderPosition} from "./utils/render";
import ProfileView from "./view/profile";
import {getFilterItems} from "./mock/filters-mock";
import {getRatingName} from "./mock/profile-mock";
import FilmsBoardPresenter from "./presenter/movie-list-presenter";
import {getRandomInteger} from "./utils/common";
import MoviesModel from "./model/movies-model";
import CommentsModel from "./model/comments-model";
import FilterPresenter from "./presenter/filters-presenter";
import FiltersModel from "./model/filters-model";
import StatsPresenter from "./presenter/stats-presenter";

const CARD_COUNT = 7;

const filmsData = new Array(CARD_COUNT).fill().map(createFilm);
const commentsData = comments;


const filtersItems = getFilterItems(filmsData);
const profileRatingName = getRatingName(filmsData);
const moviesCount = getRandomInteger(100, 1000000);

const main = document.querySelector(`main`);
const footer = document.querySelector(`footer`);
const header = document.querySelector(`.header`);
const body = document.querySelector(`body`);
const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();
const filtersModel = new FiltersModel();
moviesModel.setFilms(filmsData);
commentsModel.setComments(commentsData);


render(header, new ProfileView(profileRatingName), RenderPosition.BEFOREEND);

const openStats = () => {
  statsPresenter.init(moviesModel.getFilms());
  filmsPresenter.destroy();
};
const openFilmsList = () => {
  statsPresenter.destroy();
  filmsPresenter.init();
};

const filmsPresenter = new FilmsBoardPresenter(main, body, moviesModel, commentsModel, filtersModel);
const filterPresenter = new FilterPresenter(main, filtersModel, moviesModel, openStats, openFilmsList);
const statsPresenter = new StatsPresenter(main);
filterPresenter.init(filtersItems);
filmsPresenter.init();

render(footer, new FooterStatView(moviesCount), RenderPosition.BEFOREEND);

