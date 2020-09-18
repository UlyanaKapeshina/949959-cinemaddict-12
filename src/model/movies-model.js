import Observer from "./observer";

export default class MoviesModel extends Observer {
  constructor() {
    super();
    this._films = [];
  }
  setFilms(films) {
    this._films = films;
  }
  getFilms() {
    return this._films;
  }
  updateFilm(id, update) {

    for (let film of this._films) {
      if (film.id === id) {
        film = Object.assign({}, film, update);
        break;
      }
    }
    this.notify();
  }
}
