
import FooterPresenter from "./presenter/footer-presenter";
import FilmsBoardPresenter from "./presenter/movie-list-presenter";
import MoviesModel from "./model/movies-model";
import CommentsModel from "./model/comments-model";
import FilterPresenter from "./presenter/filters-presenter";
import FiltersModel from "./model/filters-model";
import StatsPresenter from "./presenter/stats-presenter";
import API from "./api";
import ProfilePresenter from "./presenter/profile-presenter";


const URL = `https://12.ecmascript.pages.academy/cinemaddict`;
const AUTORIZATION = `Basic 110w590ik29889v`;
const api = new API(URL, AUTORIZATION);

const main = document.querySelector(`main`);
const footer = document.querySelector(`footer`);
const header = document.querySelector(`.header`);
const body = document.querySelector(`body`);
const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();
const filtersModel = new FiltersModel();

const openStats = () => {
  statsPresenter.init(moviesModel.getFilms());
  filmsPresenter.destroy();
};
const openFilmsList = () => {
  statsPresenter.destroy();
  filmsPresenter.init();
};

const filmsPresenter = new FilmsBoardPresenter(main, body, moviesModel, commentsModel, filtersModel, api);
const filterPresenter = new FilterPresenter(main, filtersModel, moviesModel, openStats, openFilmsList);
const statsPresenter = new StatsPresenter(main);
const footerPresenter = new FooterPresenter(footer, moviesModel);
const profilePresenter = new ProfilePresenter(header, moviesModel);

filterPresenter.init();
filmsPresenter.init();
footerPresenter.init();
profilePresenter.init();
api.getFilms()
.then((films) => moviesModel.setFilms(films))
.catch(() => moviesModel.setFilms([]));


