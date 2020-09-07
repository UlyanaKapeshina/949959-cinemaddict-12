import FilterView from "./view/filter";


import FilmsListExtraView from "./view/films-list-extra";

import ButtonView from "./view/button";
import FooterStatView from "./view/footer-stat";
import TitleNoFilmsView from "./view/no-films-title";


import {createFilm} from "./mock/film-mock";
import {getRandomInteger, render, RENDER_POSITION, remove} from "./util";
import ProfileView from "./view/profile";

import FilmView from "./view/film";
import {getFilterItems} from "./mock/filters-mock";
import SortView from "./view/sort";

import {getRatingName} from "./mock/profile-mock";
import TitleView from "./view/title";
import FilmPopupView from "./view/film-popup";
import FilmsBoardView from "./view/films-board";
import FilmsListView from "./view/films-list";
import FilmsListContainerView from "./view/films-list-container";
import {TITLE_EXTRA} from "./mock/extra-mock";


const CARD_COUNT = 20;
const EXTRA_CARD_COUNT = 2;
const SHOWN_CARDS_COUNT = 5;
const filmsData = new Array(CARD_COUNT).fill().map(createFilm);
const filtersItems = getFilterItems(filmsData);
const profileRatingName = getRatingName(filmsData);
const moviesCount = getRandomInteger(100, 1000000);

const main = document.querySelector(`main`);
const footer = document.querySelector(`footer`);
const header = document.querySelector(`.header`);
const body = document.querySelector(`body`);


const renderFilm = (film, filmsListContainer) => {
  const FilmCardComponent = new FilmView(film);
  const FilmPopupViewComponent = new FilmPopupView(film);

  const cardTitle = FilmCardComponent.element.querySelector(`.film-card__title`);
  const cardPoster = FilmCardComponent.element.querySelector(`.film-card__poster`);
  const cardComments = FilmCardComponent.element.querySelector(`.film-card__comments`);
  const closeButton = FilmPopupViewComponent.element.querySelector(`.film-details__close-btn`);

  const closeFilmPopup = () => {
    remove(body, FilmPopupViewComponent.element);
    FilmPopupViewComponent.remove();
    closeButton.removeEventListener(`click`, closeFilmPopup);
  };
  const openFilmPopup = () => {
    render(footer, FilmPopupViewComponent.element, RENDER_POSITION.AFTEREND);
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
  render(filmsListContainer, FilmCardComponent.element, RENDER_POSITION.BEFOREEND);
};

const renderExtraList = (container) => {
  const topRatedFilmsData = filmsData.slice().sort((a, b) => b.rating - a.rating);
  const mostCommentedFilmsData = filmsData.slice().sort((a, b) => b.comments.length - a.comments.length);

  const renderExtraFilms = (extraFilmsData, title) => {
    if (extraFilmsData) {
      const filmsListExtraComponent = new FilmsListExtraView(title);
      const FilmsListContainerExtraComponent = new FilmsListContainerView();
      render(container, filmsListExtraComponent.element, RENDER_POSITION.BEFOREEND);
      render(filmsListExtraComponent.element, FilmsListContainerExtraComponent.element, RENDER_POSITION.BEFOREEND);
      extraFilmsData.slice(0, EXTRA_CARD_COUNT).map((it) => {
        renderFilm(it, FilmsListContainerExtraComponent.element);
      });
    }
  };
  renderExtraFilms(topRatedFilmsData, TITLE_EXTRA.topRated);
  renderExtraFilms(mostCommentedFilmsData, TITLE_EXTRA.mostCommented);
};

const renderBoard = () => {
  const BoardComponent = new FilmsBoardView();
  const filmsListComponent = new FilmsListView();


  const FilmsListContainerComponent = new FilmsListContainerView();

  render(main, BoardComponent.element, RENDER_POSITION.BEFOREEND);
  render(BoardComponent.element, filmsListComponent.element, RENDER_POSITION.BEFOREEND);

  if (!filmsData) {
    render(filmsListComponent.element, new TitleNoFilmsView(filmsData.length).element, RENDER_POSITION.AFTERBEGIN);
    return;
  }
  render(filmsListComponent.element, FilmsListContainerComponent.element, RENDER_POSITION.BEFOREEND);
  filmsData.slice(0, SHOWN_CARDS_COUNT).map((it)=> {
    renderFilm(it, FilmsListContainerComponent.element);
  });

  render(filmsListComponent.element, new TitleView(filmsData.length).element, RENDER_POSITION.AFTERBEGIN);
  renderExtraList(BoardComponent.element);

  if (filmsData.length > SHOWN_CARDS_COUNT) {
    let shownCards = SHOWN_CARDS_COUNT;
    const buttonComponent = new ButtonView();
    render(FilmsListContainerComponent.element, buttonComponent.element, RENDER_POSITION.AFTEREND);

    buttonComponent.element.addEventListener(`click`, function () {
      filmsData.slice(shownCards, shownCards + SHOWN_CARDS_COUNT).map((it)=> {
        renderFilm(it, filmsListComponent.element.querySelector(`.films-list__container`));
      });
      shownCards = shownCards + SHOWN_CARDS_COUNT;
      if (shownCards >= CARD_COUNT) {
        buttonComponent.element.remove();
        buttonComponent.removeElement();
      }
    });
  }
};
render(header, new ProfileView(profileRatingName).element, RENDER_POSITION.BEFOREEND);
render(main, new FilterView(filtersItems).element, RENDER_POSITION.BEFOREEND);
render(main, new SortView().element, RENDER_POSITION.BEFOREEND);

renderBoard();


render(footer, new FooterStatView(moviesCount).element, RENDER_POSITION.BEFOREEND);


