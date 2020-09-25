
import SortView from "../view/sort";
import FilmsListView from "../view/films-list";
import TitleView from "../view/films-title";
import TitleNoFilmsView from "../view/films-no-title";
import FilmsBoardView from "../view/films-board";
import {RenderPosition, render, remove} from "../utils/render";
import FilmsListRatedView from "../view/films-list-extra-rated";
import FilmsListCommentedView from "../view/films-list-extra-commented";
import PopupPresenter from "./popup-presenter";
import FilmsListPresenter from "./films-list-presenter";

const EXTRA_CARD_COUNT = 2;
const SHOWN_CARDS_COUNT = 5;
const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`
};
const userCommentAction = {
  DELETE: `delete`,
  ADD: `add`
};
const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};
const filmsFilterType = {
  isFavorite: `favorites`,
  isWatched: `history`,
  isInWatchlist: `watchlist`,
};

export default class MovieList {
  constructor(movieListContainer, popupContainer, moviesModel, commentsModel, filtersModel) {
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._filtersModel = filtersModel;
    this._movieListContainer = movieListContainer;
    this._popupContainer = popupContainer;
    this._currentSortType = SortType.DEFAULT;
    this._shownCardsCount = SHOWN_CARDS_COUNT;
    this._extraCardsCount = EXTRA_CARD_COUNT;
    this._filmsBoard = new FilmsBoardView();
    this._filmsList = new FilmsListView();
    this._filmsTitle = new TitleView();
    this._filmsNoTitle = new TitleNoFilmsView();
    this._filmsListRated = new FilmsListRatedView();
    this._filmsListCommented = new FilmsListCommentedView();
    this._sort = new SortView();
    this._sortClickHandler = this._sortClickHandler.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onCommentChange = this._onCommentChange.bind(this);
    this._onCommentModelChange = this._onCommentModelChange.bind(this);
    this._onFilmModelChange = this._onFilmModelChange.bind(this);
    this._onFilterModelChange = this._onFilterModelChange.bind(this);
    this._onOpenPopupClick = this._onOpenPopupClick.bind(this);
    this._getFilms = this._getFilms.bind(this);
    this._getCommentedFilms = this._getCommentedFilms.bind(this);
    this._getRatedFilms = this._getRatedFilms.bind(this);

  }
  _getFilms() {
    const filter = this._filtersModel.getFilter();
    const films = this._moviesModel.getFilms();
    const getFilterFilms = (filterType, filmsForFilter) => {
      switch (filterType) {
        case FilterType.ALL:
          filmsForFilter = filmsForFilter.slice();
          break;
        case FilterType.HISTORY:
          filmsForFilter = filmsForFilter.slice().filter((it) => it.isWatched);
          break;
        case FilterType.FAVORITES:
          filmsForFilter = filmsForFilter.slice().filter((it) => it.isFavorite);
          break;
        case FilterType.WATCHLIST:
          filmsForFilter = filmsForFilter.slice().filter((it) => it.isInWatchlist);
          break;
      }
      return filmsForFilter;
    };
    const filteredFilms = getFilterFilms(filter, films);

    switch (this._currentSortType) {
      case SortType.RATING:
        return filteredFilms.slice().sort((a, b) => b.rating - a.rating);
      case SortType.DATE:
        return filteredFilms.slice().sort((a, b) => b.releaseDate.valueOf() - a.releaseDate.valueOf());
      case SortType.DEFAULT:
        return filteredFilms.slice();
    }
    return filteredFilms;
  }
  _getCommentedFilms() {
    return this._moviesModel.getFilms().slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, EXTRA_CARD_COUNT);
  }
  _getRatedFilms() {
    return this._moviesModel.getFilms().slice().sort((a, b) => b.rating - a.rating).slice(0, EXTRA_CARD_COUNT);
  }

  init() {
    this._moviesModel.addObserver(this._onFilmModelChange);
    this._commentsModel.addObserver(this._onCommentModelChange);
    this._filtersModel.addObserver(this._onFilterModelChange);

    this._popupPresenter = new PopupPresenter(this._popupContainer, this._onDataChange, this._onCommentChange, this._commentsModel);
    this._filmsCommentedPresenter = new FilmsListPresenter(this._filmsListCommented, EXTRA_CARD_COUNT, this._getCommentedFilms, this._onDataChange, this._onOpenPopupClick);
    this._filmsRatedPresenter = new FilmsListPresenter(this._filmsListRated, EXTRA_CARD_COUNT, this._getRatedFilms, this._onDataChange, this._onOpenPopupClick);
    this._filmsListPresenter = new FilmsListPresenter(this._filmsList, SHOWN_CARDS_COUNT, this._getFilms, this._onDataChange, this._onOpenPopupClick);

    this._renderSort();
    this._renderFilmsBoardContainer();
    this._renderFilmsList();
    this._renderFilmsTitle();
    this._filmsListPresenter.init();
    this._renderMostCommentedFilms();
    this._renderTopRatedFilms();
  }

  _sortClickHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._closePopup();
    this._currentSortType = sortType;
    this._filmsListPresenter.updateList(true);
  }

  _renderSort() {
    render(this._movieListContainer, this._sort, RenderPosition.BEFOREEND);
    this._sort.clickHandler = this._sortClickHandler;
  }
  _updateFilms(newFilmData, id) {
    this._filmsListPresenter.updateFilms(newFilmData, id);
    this._filmsRatedPresenter.updateFilms(newFilmData, id);
    this._filmsCommentedPresenter.updateFilms(newFilmData, id);
  }

  _onDataChange(newFilmData, update) {
    this._moviesModel.updateFilm(newFilmData, update);
  }

  _onCommentChange(actionType, idFilm, idComment, newData) {
    switch (actionType) {
      case userCommentAction.DELETE:
        this._commentsModel.deleteComment(idComment, idFilm);
        break;
      case userCommentAction.ADD:
        this._commentsModel.addComment(newData, idFilm);
        break;
    }
  }

  _onCommentModelChange(id) {
    const filmData = this._moviesModel.getFilms().slice().find((it) => it.id === id);
    this._updateFilms(filmData, id);
    this._popupPresenter.update(null, true);
  }

  _onFilmModelChange(updatedData, update) {
    if (this._popupPresenter.isPopup) {
      this._popupPresenter.update(updatedData, false);
    }
    this._updateFilms(updatedData, updatedData.id);

    const updateFieldName = Object.keys(update)[0];
    if (!update[updateFieldName] && filmsFilterType[updateFieldName] === this._filtersModel.getFilter()) {
      this._filmsListPresenter.updateList();
      this._removeTitle();
      this._renderFilmsTitle();
    }
  }

  _onFilterModelChange() {
    this._currentSortType = SortType.DEFAULT;
    this._closePopup();
    this._filmsListPresenter.updateList();
    this._removeTitle();
    this._renderFilmsTitle();
  }

  _onOpenPopupClick(film) {
    this._popupPresenter.resetPopupView();
    this._popupPresenter.init(film);
  }

  _renderFilmsList() {
    render(this._filmsBoard, this._filmsList, RenderPosition.AFTERBEGIN);
  }

  _renderFilmsBoardContainer() {
    render(this._movieListContainer, this._filmsBoard, RenderPosition.BEFOREEND);
  }

  _renderFilmsTitle() {
    if (!this._getFilms().length) {
      render(this._filmsList, this._filmsNoTitle, RenderPosition.AFTERBEGIN);
      return;
    }
    render(this._filmsList, this._filmsTitle, RenderPosition.AFTERBEGIN);
  }
  _removeTitle() {
    remove(this._filmsTitle);
    remove(this._filmsNoTitle);
  }

  _renderMostCommentedFilms() {
    const films = this._getCommentedFilms();

    if (films && films.some((it) => it.comments.length > 0)) {
      render(this._filmsBoard, this._filmsListCommented, RenderPosition.BEFOREEND);
      this._filmsCommentedPresenter.init();
    }
  }
  _renderTopRatedFilms() {
    const films = this._getRatedFilms();

    if (films && films.some((it) => it.rating > 0)) {
      render(this._filmsBoard, this._filmsListRated, RenderPosition.BEFOREEND);
      this._filmsRatedPresenter.init();
    }
  }
}

