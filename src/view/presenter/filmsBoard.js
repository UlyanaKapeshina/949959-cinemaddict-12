import SortView from "../sort";
import FilmsListView from "../films-list";
import FilmsListContainerView from "../films-list-container";
import TitleView from "../films-title";
import TitleNoFilmsView from "../films-no-title";
import ButtonView from "../button";
import FilmsListExtraView from "../films-list-extra";
import FilmsBoardView from "../films-board";

import FilmView from "../film";
import FilmPopupView from "../film-popup";
import {TITLE_EXTRA} from "../../mock/extra-mock";
import {RenderPosition, render, remove} from "../../utils/render";

const EXTRA_CARD_COUNT = 2;
const SHOWN_CARDS_COUNT = 5;

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
    this._handleButtonClickBind = this._handleButtonClick.bind(this);
    this._shownCardsCount = SHOWN_CARDS_COUNT;
    this._extraCardsCount = EXTRA_CARD_COUNT;
  }
  init(filmsData) {
    this._filmsData = filmsData.slice();
    this._filmsDataTopRated = filmsData.slice().sort((a, b) => b.rating - a.rating);
    this._filmsDataMostCommented = filmsData.slice().sort((a, b) => b.comments.length - a.comments.length);

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
    if (this._filmsDataTopRated) {
      this._renderFilmsListExtra(this._filmsDataTopRated, TITLE_EXTRA.topRated);
    }
    if (this._filmsDataMostCommented) {
      this._renderFilmsListExtra(this._filmsDataMostCommented, TITLE_EXTRA.mostCommented);
    }
  }

  _renderFilm(film, container) {

    const FilmCardComponent = new FilmView(film);
    const FilmPopupViewComponent = new FilmPopupView(film);

    const cardTitle = FilmCardComponent.element.querySelector(`.film-card__title`);
    const cardPoster = FilmCardComponent.element.querySelector(`.film-card__poster`);
    const cardComments = FilmCardComponent.element.querySelector(`.film-card__comments`);
    const closeButton = FilmPopupViewComponent.element.querySelector(`.film-details__close-btn`);

    const closeFilmPopup = () => {
      remove(this._popupContainer, FilmPopupViewComponent);
      FilmPopupViewComponent.remove();
      closeButton.removeEventListener(`click`, closeFilmPopup);
    };
    const openFilmPopup = () => {
      render(this._popupContainer, FilmPopupViewComponent, RenderPosition.BEFOREEND);
      closeButton.addEventListener(`click`, closeFilmPopup);
    };

    cardTitle.addEventListener(`click`, () => {
      openFilmPopup();
    });
    cardPoster.addEventListener(`click`, () => {
      openFilmPopup();
    });
    cardComments.addEventListener(`click`, () => {
      openFilmPopup();
    });
    const onEscPress = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeFilmPopup();
        document.removeEventListener(`keydown`, onEscPress);
      }
    };
    document.addEventListener(`keydown`, onEscPress);
    render(container, FilmCardComponent, RenderPosition.BEFOREEND);
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
      remove(this._filmsList, this._button);
      this._button.removeElement();
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

