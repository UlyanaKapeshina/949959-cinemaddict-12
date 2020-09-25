import {render, RenderPosition, remove} from "../utils/render";
import FilmsListContainerView from "../view/films-list-container";
import Film from "./film-presenter";
import ButtonView from "../view/button";

export default class FilmsListPresenter {
  constructor(container, showCount, getFilms, onDataChange, onOpenPopupClick) {
    this._container = container;
    this._getFilms = getFilms;
    this._onDataChange = onDataChange;
    this._onOpenPopupClick = onOpenPopupClick;
    this._filmsListContainerView = new FilmsListContainerView();
    this._filmPresenters = [];
    this._shownCardsCount = showCount;
    this._cardsCount = showCount;
    this._handleButtonClickBind = this._handleButtonClick.bind(this);
    this._button = new ButtonView();
  }

  init() {
    this._renderFilmsContainer();
    this._renderFilms(0, this._cardsCount);
  }
  _renderFilm(filmData) {
    const film = new Film(this._filmsListContainerView, this._onDataChange, this._onOpenPopupClick);
    film.init(filmData);
    this._filmPresenters.push(film);
    this._renderButton();
  }
  _renderFilmsContainer() {
    render(this._container, this._filmsListContainerView, RenderPosition.BEFOREEND);
  }
  _renderFilms(from, to) {
    this._getFilms().slice(from, to)
    .forEach((it)=> {
      this._renderFilm(it);
    });
  }
  _removeFilms() {
    this._filmPresenters.forEach((it) => it.destroy());
    this._filmPresenters = [];
  }
  updateFilms(data, id) {

    const updatedFilms = this._filmPresenters.filter((it) => it.id === id);
    updatedFilms.forEach((it) => it.update(data));
  }
  updateList(isListOpen) {
    if (!isListOpen) {
      this._shownCardsCount = this._cardsCount;
    }
    this._removeFilms();
    remove(this._button);
    this._renderFilms(0, this._shownCardsCount);
    this._renderButton();
  }
  _handleButtonClick() {
    this._renderFilms(this._shownCardsCount, this._shownCardsCount + this._cardsCount);
    this._shownCardsCount += this._cardsCount;
    if (this._shownCardsCount >= this._getFilms().length) {
      remove(this._button);
    }
  }

  _renderButton() {
    if (this._getFilms().length > this._shownCardsCount) {
      render(this._container, this._button, RenderPosition.BEFOREEND);
      this._button.setClickHandler(this._handleButtonClickBind);
    }
  }
}
