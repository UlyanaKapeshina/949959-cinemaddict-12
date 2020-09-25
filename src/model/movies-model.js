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
  updateFilm(updateData, update) {

    for (let film of this._films) {
      if (film.id === updateData.id) {
        Object.assign(film, update);
        this.notify(Object.assign({}, film), update);
        break;
      }
    }

  }
}
// updateFilm(updateData, update) {

//   for (let film of this._films) {
//     if (film.id === updateData.id) {
//       film = Object.assign({}, film, update);
//       // Object.assign({}, film)
//       const a = Object.assign({}, film);
//       console.log(a)
//       // console.log(film)
//       this.notify(a, update);
//       break;
//     }
//   }

// }
