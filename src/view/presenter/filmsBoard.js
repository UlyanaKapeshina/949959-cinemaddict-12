import SortView from "../sort";
import FilmsListView from "../films-list";
import FilmsListContainerView from "../films-list-container";
import TitleView from "../films-title";
import TitleNoFilmsView from "../films-no-title";
import ButtonView from "../button";
import FilmsListExtraView from "../films-list-extra";
import FilmsBoardView from "../films-board";
import {render, RENDER_POSITION, remove} from "../../util";
import FilmView from "../film";
import FilmPopupView from "../film-popup";
import {TITLE_EXTRA} from "../../mock/extra-mock";
const CARD_COUNT = 20;
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
    this._shownCards = SHOWN_CARDS_COUNT;
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
      render(this._popupContainer, FilmPopupViewComponent, RENDER_POSITION.BEFOREEND);
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
    render(container, FilmCardComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderFilms(data, from, to, container) {
    data.slice(from, to)
    .forEach((it)=> {
      this._renderFilm(it, container);
    });
  }

  _renderFilmsList() {
    render(this._filmsBoard, this._filmsList, RENDER_POSITION.BEFOREEND);
  }

  _renderFilmsListContainer() {
    render(this._filmsList, this._filmsListContainer, RENDER_POSITION.BEFOREEND);
  }

  _renderFilmsTitle() {
    render(this._filmsList, this._filmsTitle, RENDER_POSITION.AFTERBEGIN);
  }

  _renderFilmsNoTitle() {
    render(this._filmsList, this._filmsNoTitle, RENDER_POSITION.AFTERBEGIN);
  }
  _handleButtonClick() {

    this._renderFilms(this._filmsData, this._shownCards, this._shownCards + SHOWN_CARDS_COUNT, this._filmsListContainer);
    this._shownCards += SHOWN_CARDS_COUNT;
    if (this._shownCards >= CARD_COUNT) {
      remove(this._filmsList, this._button);
      this._button.removeElement();
    }
  }

  _renderButton() {
    render(this._filmsList, this._button, RENDER_POSITION.BEFOREEND);
    this._button.setClickHandler(this._handleButtonClickBind);
  }

  _renderFilmsListExtra(data, title) {
    const filmsListExtraComponent = new FilmsListExtraView(title);
    const FilmsListContainerExtraComponent = new FilmsListContainerView();
    render(this._filmsBoard, filmsListExtraComponent, RENDER_POSITION.BEFOREEND);
    render(filmsListExtraComponent, FilmsListContainerExtraComponent, RENDER_POSITION.BEFOREEND);
    this._renderFilms(data, 0, EXTRA_CARD_COUNT, FilmsListContainerExtraComponent);
  }

  _renderFilmsBoard() {
    render(this._movieListContainer, this._filmsBoard, RENDER_POSITION.BEFOREEND);
  }
}

