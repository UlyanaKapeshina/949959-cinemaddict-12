
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
import LoadinfTitleView from "../view/films-title-loading";
import {getFilterFilms} from "../utils/filters";

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

const filmsFilterType = {
  isFavorite: `favorites`,
  isWatched: `history`,
  isInWatchlist: `watchlist`,
};

export default class MovieList {
  constructor(movieListContainer, popupContainer, moviesModel, commentsModel, filtersModel, api) {
    this._api = api;
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
    this._loadingTitle = new LoadinfTitleView();
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
    this._popupPresenter = new PopupPresenter(this._popupContainer, this._onDataChange, this._onCommentChange, this._commentsModel);
    this._filmsCommentedPresenter = new FilmsListPresenter(this._filmsListCommented, EXTRA_CARD_COUNT, this._getCommentedFilms, this._onDataChange, this._onOpenPopupClick);
    this._filmsRatedPresenter = new FilmsListPresenter(this._filmsListRated, EXTRA_CARD_COUNT, this._getRatedFilms, this._onDataChange, this._onOpenPopupClick);
    this._filmsListPresenter = new FilmsListPresenter(this._filmsList, SHOWN_CARDS_COUNT, this._getFilms, this._onDataChange, this._onOpenPopupClick);
    this._isLoading = true;
  }

  _getFilms() {
    const filter = this._filtersModel.getFilter();
    const films = this._moviesModel.getFilms();

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
    this._renderSort();
    this._renderFilmsBoard();
    this._renderFilmsList();
    this._renderFilmsTitle();
    if (!this._isLoading) {
      this._filmsListPresenter.init();
      this._renderMostCommentedFilms();
      this._renderTopRatedFilms();
    }

  }
  destroy() {
    this._moviesModel.removeObserver(this._onFilmModelChange);
    this._commentsModel.removeObserver(this._onCommentModelChange);
    this._filtersModel.removeObserver(this._onFilterModelChange);

    remove(this._filmsBoard);
    remove(this._sort);
    remove(this._filmsList);
    this._removeTitle();
    this._filmsListPresenter.destroy();
    this._filmsCommentedPresenter.destroy();
    this._filmsRatedPresenter.destroy();
    this._popupPresenter.resetPopupView();

    this._currentSortType = SortType.DEFAULT;
  }


  _sortClickHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._popupPresenter.resetPopupView();
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

  _onDataChange(newFilmData, update, onError) {
    this._api.updateFilm(newFilmData)
    .then((data) => this._moviesModel.updateFilm(data, update))
    .catch(() => onError());
  }

  _onCommentChange(actionType, film, idComment, newComment, onError, onSubmitSuccess) {
    switch (actionType) {
      case userCommentAction.DELETE:
        this._api.deleteComment(idComment)
        .then(this._commentsModel.deleteComment(idComment))
        .then(() => this._moviesModel.updateFilm(film))
        .catch(() => onError(idComment));
        break;
      case userCommentAction.ADD:
        this._api.addComment(film.id, newComment)
        .then((data) => {
          this._commentsModel.updateComments(data.comments);
          this._moviesModel.updateFilm(data.movie);
        })
        .then(onSubmitSuccess())

        .catch(() => onError());
        break;
    }
  }

  _onCommentModelChange(id) {
    const filmData = this._moviesModel.getFilms().find((it) => it.id === id);
    this._popupPresenter.init(filmData);
  }

  _onFilmModelChange(actionType, updatedData, update) {
    switch (actionType) {
      case `init`:
        this._isLoading = false;
        remove(this._loadingTitle);
        this._filmsListPresenter.init();
        this._renderMostCommentedFilms();
        this._renderTopRatedFilms();
        break;
      case `update`:
        if (this._popupPresenter.isPopup) {
          this._popupPresenter.update(updatedData);
        }
        this._updateFilms(updatedData, updatedData.id);

        const updateFieldName = Object.keys(update)[0];
        if (!update[updateFieldName] && filmsFilterType[updateFieldName] === this._filtersModel.getFilter()) {
          this._filmsListPresenter.updateList();
          this._removeTitle();
          this._renderFilmsTitle();
        }
        break;

    }
  }


  _onFilterModelChange() {
    this._currentSortType = SortType.DEFAULT;
    this._popupPresenter.resetPopupView();
    this._filmsListPresenter.updateList();
    this._removeTitle();
    this._renderFilmsTitle();
  }

  _onOpenPopupClick(film) {
    this._popupPresenter.resetPopupView();
    this._api.getComments(film.id)

    .then((comments) => this._commentsModel.setComments(comments, film.id))
    .catch(() => this._commentsModel.setComments([], film.id));

  }

  _renderFilmsList() {
    render(this._filmsBoard, this._filmsList, RenderPosition.AFTERBEGIN);
  }

  _renderFilmsBoard() {
    render(this._movieListContainer, this._filmsBoard, RenderPosition.BEFOREEND);
  }

  _renderFilmsTitle() {
    if (this._isLoading) {
      render(this._filmsList, this._loadingTitle, RenderPosition.AFTERBEGIN);
      return;
    }
    if (!this._moviesModel.getFilms().length) {
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

