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
import Film from "./film";

const EXTRA_CARD_COUNT = 2;
const SHOWN_CARDS_COUNT = 5;
const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`
};

export default class MovieList {
  constructor(movieListContainer, popupContainer) {
    this._movieListContainer = movieListContainer;
    this._popupContainer = popupContainer;
    this._filmsBoard = new FilmsBoardView();
    this._sort = new SortView();
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
    this._onPopupOpen = this._onPopupOpen.bind(this);
    this._filmPresenter = [];
  }
  init(filmsData) {
    this._filmsData = filmsData.slice();

    this._filmsDataTopRated = filmsData.slice().sort((a, b) => b.rating - a.rating);
    this._filmsDataMostCommented = filmsData.slice().sort((a, b) => b.comments.length - a.comments.length);
    this._renderSort();
    this._renderFilmsBoard();
    this._renderFilmsList();

    if (!this._filmsData) {
      this._renderFilmsNoTitle();
      return;
    }
    this._renderFilmsTitle();
    this._renderFilmsListContainer();
    this._renderFilms(this._filmsData, 0, SHOWN_CARDS_COUNT, this._filmsListContainer);
    if (this._filmsData.length > SHOWN_CARDS_COUNT) {
      this._renderButton();
    }
    if (this._filmsDataTopRated && this._filmsDataTopRated.some((it) => it.rating > 0)) {
      this._renderFilmsListExtra(this._filmsDataTopRated, TITLE_EXTRA.topRated);
    }
    if (this._filmsDataMostCommented && this._filmsDataMostCommented.some((it) => it.comments.length > 0)) {
      this._renderFilmsListExtra(this._filmsDataMostCommented, TITLE_EXTRA.mostCommented);
    }

  }
  _removeFilms(container) {
    container.element.innerHTML = ``;
    this._shownCardsCount = SHOWN_CARDS_COUNT;
  }

  _sortFilms(currentSortType) {
    this._currentSortType = currentSortType;

    switch (currentSortType) {
      case SortType.RATING:
        this._sortFilmsData = this._filmsData.slice().sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DATE:
        this._sortFilmsData = this._filmsData.slice().sort((a, b) => b.releaseDate.valueOf() - a.releaseDate.valueOf());
        break;
      case SortType.DEFAULT:
        this._sortFilmsData = this._filmsData.slice();
        break;
    }
  }
  _sortClickHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._removeFilms(this._filmsListContainer);
    this._renderFilms(this._sortFilmsData, 0, SHOWN_CARDS_COUNT, this._filmsListContainer);
  }
  _renderSort() {
    render(this._movieListContainer, this._sort, RenderPosition.BEFOREEND);
    this._sort.clickHandler = this._sortClickHandlerBind;
  }
  _onDataChange(newFilmData, id) {
    this._filmsData.slice().forEach((it) => {
      if (it.id === id) {
        it = Object.assign({}, it, newFilmData);
      }
    });


  }
  _onPopupOpen() {
    this._filmPresenter.forEach((it) => {
      Object.values(it)[0].resetPopupView();
    });
  }

  _renderFilm(filmData, container) {
    const film = new Film(container, this._popupContainer, this._onDataChange, this._onPopupOpen);
    film.init(filmData);
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
    this._renderFilms(this._filmsData, this._shownCardsCount, this._shownCardsCount + SHOWN_CARDS_COUNT, this._filmsListContainer);
    this._shownCardsCount += SHOWN_CARDS_COUNT;
    if (this._shownCardsCount >= this._filmsData.length) {
      remove(this._button);

    }
  }

  _renderButton() {
    render(this._filmsList, this._button, RenderPosition.BEFOREEND);
    this._button.setClickHandler(this._handleButtonClickBind);
  }

  _renderFilmsListExtra(data, title) {
    const filmsListExtraComponent = new FilmsListExtraView(title);
    const FilmsListContainerExtraComponent = new FilmsListContainerView();
    render(this._filmsBoard, filmsListExtraComponent, RenderPosition.BEFOREEND);
    render(filmsListExtraComponent, FilmsListContainerExtraComponent, RenderPosition.BEFOREEND);
    this._renderFilms(data, 0, EXTRA_CARD_COUNT, FilmsListContainerExtraComponent);
  }

  _renderFilmsBoard() {
    render(this._movieListContainer, this._filmsBoard, RenderPosition.BEFOREEND);
  }
}

