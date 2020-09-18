import SortView from "../view/sort";
import FilmsListView from "../view/films-list";
import FilmsListContainerView from "../view/films-list-container";
import TitleView from "../view/films-title";
import TitleNoFilmsView from "../view/films-no-title";
import ButtonView from "../view/button";
import FilmsListExtraView from "../view/films-list-extra";
import FilmsBoardView from "../view/films-board";


import {TITLE_EXTRA} from "../mock/extra-mock";
import {RenderPosition, render, remove} from "../utils/render";
import Film from "./film-presenter";


const EXTRA_CARD_COUNT = 2;
const SHOWN_CARDS_COUNT = 5;
const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`
};
const TypeAction = {
  DELETE: `delete`,
  ADD: `add`
};


export default class MovieList {
  constructor(movieListContainer, popupContainer, moviesModel, commentsModel) {
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._movieListContainer = movieListContainer;
    this._popupContainer = popupContainer;
    this._currentSortType = SortType.DEFAULT;
    this._filmsBoard = new FilmsBoardView();

    this._filmsList = new FilmsListView();
    this._filmsListContainer = new FilmsListContainerView();
    this._filmsTitle = new TitleView();
    this._filmsNoTitle = new TitleNoFilmsView();
    this._button = new ButtonView();
    this._filmsListExtra = new FilmsListExtraView();
    this._sort = new SortView();
    this._sortClickHandlerBind = this._sortClickHandler.bind(this);
    this._handleButtonClickBind = this._handleButtonClick.bind(this);
    this._shownCardsCount = SHOWN_CARDS_COUNT;
    this._extraCardsCount = EXTRA_CARD_COUNT;
    this._onDataChange = this._onDataChange.bind(this);
    this._onCommentChange = this._onCommentChange.bind(this);
    this._onPopupOpen = this._onPopupOpen.bind(this);
    this._filmPresenter = [];
    this._onModelChange = this._onModelChange.bind(this);
  }
  _getFilms() {
    switch (this._currentSortType) {
      case SortType.RATING:
        return this._moviesModel.getFilms().slice().sort((a, b) => b.rating - a.rating);
      case SortType.DATE:
        return this._moviesModel.getFilms().slice().sort((a, b) => b.releaseDate.valueOf() - a.releaseDate.valueOf());
    }
    return this._moviesModel.getFilms();
  }

  init() {
    this._moviesModel.addObserver(this._onModelChange);
    this._commentsModel.addObserver(this._onModelChange);

    this._renderSort();
    this._renderFilmsBoardContainer();
    this._renderFilmsBoard();


  }
  _clearFilmsBoard() {
    this._removeFilms(this._filmsListContainer);
    remove(this._filmsList);
    // remove(this._filmsListContainer);
    // remove(this._filmsListExtraComponent);
    // remove(this._filmsListContainerExtraComponent);
    remove(this._button);
    // this._filmPresenter.forEach((it) => Object.values(it)[0].destroy)
  }
  _renderFilmsBoard() {
    this._filmsCount = this._getFilms().length;
    this._renderFilmsList();

    if (!this._filmsCount) {
      this._renderFilmsNoTitle();
      return;
    }
    this._renderFilmsTitle();
    this._renderFilmsListContainer();

    this._renderFilms(this._getFilms(), 0, SHOWN_CARDS_COUNT, this._filmsListContainer);
    if (this._filmsCount > SHOWN_CARDS_COUNT) {
      this._renderButton();
    }
    // if (this._getTopRatedFilms() && this._getTopRatedFilms().some((it) => it.rating > 0)) {
    //   this._renderFilmsListExtra(this._getTopRatedFilms(), TITLE_EXTRA.topRated);
    // }
    // if (this._getMostCommentedFilms() && this._getMostCommentedFilms().some((it) => it.comments.length > 0)) {
    //   this._renderFilmsListExtra(this._getMostCommentedFilms(), TITLE_EXTRA.mostCommented);
    // }
  }
  _getTopRatedFilms() {
    return this._moviesModel.getFilms().slice().sort((a, b) => b.rating - a.rating);
  }
  _getMostCommentedFilms() {
    return this._moviesModel.getFilms().slice().sort((a, b) => b.comments.length - a.comments.length);
  }

  _removeFilms(container) {
    container.element.innerHTML = ``;
    this._shownCardsCount = SHOWN_CARDS_COUNT;
  }


  _sortClickHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._onPopupOpen();
    this._currentSortType = sortType;
    this._removeFilms(this._filmsListContainer);
    this._renderFilms(this._getFilms(), 0, SHOWN_CARDS_COUNT, this._filmsListContainer);
    if (!this._button.element) {
      this._renderButton();
    }

  }

  _renderSort() {

    render(this._movieListContainer, this._sort, RenderPosition.BEFOREEND);
    this._sort.clickHandler = this._sortClickHandlerBind;
  }

  _onDataChange(newFilmData, id) {
    this._moviesModel.updateFilm(id, newFilmData);

  }
  _onCommentChange(actionType, id, newData) {
    switch (actionType) {
      case TypeAction.DELETE:
        this._commentsModel.deleteComment(id);

        break;
      case TypeAction.ADD:
        this._commentsModel.addComment(newData);
    }
  }
  _onModelChange() {
    this._clearFilmsBoard();

    this._renderFilmsBoard();

  }


  _onPopupOpen() {
    this._filmPresenter.forEach((it) => {
      Object.values(it)[0].resetPopupView();
    });
  }

  _renderFilm(filmData, container) {
    const film = new Film(container, this._popupContainer, this._onDataChange, this._onPopupOpen, this._onCommentChange);
    film.init(filmData, this._commentsModel.getComments());
    this._filmPresenter.push({[filmData.id]: film});

  }

  _renderFilms(data, from, to, container) {
    data.slice(from, to)
    .forEach((it)=> {
      this._renderFilm(it, container);
    });
  }

  _renderFilmsList() {
    render(this._filmsBoard, this._filmsList, RenderPosition.BEFOREEND);
  }

  _renderFilmsListContainer() {
    render(this._filmsList, this._filmsListContainer, RenderPosition.BEFOREEND);
  }

  _renderFilmsTitle() {
    render(this._filmsList, this._filmsTitle, RenderPosition.AFTERBEGIN);
  }

  _renderFilmsNoTitle() {
    render(this._filmsList, this._filmsNoTitle, RenderPosition.AFTERBEGIN);
  }
  _handleButtonClick() {
    this._renderFilms(this._getFilms(), this._shownCardsCount, this._shownCardsCount + SHOWN_CARDS_COUNT, this._filmsListContainer);
    this._shownCardsCount += SHOWN_CARDS_COUNT;
    if (this._shownCardsCount >= this._filmsCount) {
      remove(this._button);

    }
  }

  _renderButton() {
    render(this._filmsList, this._button, RenderPosition.BEFOREEND);
    this._button.setClickHandler(this._handleButtonClickBind);
  }

  _renderFilmsListExtra(data, title) {
    this._filmsListExtraComponent = new FilmsListExtraView(title);
    this._filmsListContainerExtraComponent = new FilmsListContainerView();
    render(this._filmsBoard, this._filmsListExtraComponent, RenderPosition.BEFOREEND);
    render(this._filmsListExtraComponent, this._filmsListContainerExtraComponent, RenderPosition.BEFOREEND);
    // this._renderFilms(data, 0, EXTRA_CARD_COUNT, this._filmsListContainerExtraComponent);
  }

  _renderFilmsBoardContainer() {
    render(this._movieListContainer, this._filmsBoard, RenderPosition.BEFOREEND);
  }
}

