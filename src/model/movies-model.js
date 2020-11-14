
import Observer from "./observer";

export default class MoviesModel extends Observer {
  constructor() {
    super();
    this._films = [];
  }
  setFilms(films) {
    this._films = films.slice().map(MoviesModel.adaptFilmToClient);
    this.notify(`init`);
  }
  getFilms() {
    return this._films;
  }
  updateFilm(updateData, update) {

    for (let film of this._films) {
      if (film.id === updateData.id) {
        Object.assign(film, updateData);
        this.notify(`update`, Object.assign({}, film), update);
        break;
      }
    }

  }

  static adaptFilmToClient(film) {
    return {
      id: film.id,
      poster: film.film_info.poster,
      name: film.film_info.title,
      originalName: film.film_info.alternative_title,
      rating: film.film_info.total_rating,
      director: film.film_info.director,
      writers: film.film_info.writers,
      actors: film.film_info.actors,

      releaseDate: film.film_info.release.date,
      runtime: film.film_info.runtime,
      country: film.film_info.release.release_country,
      genres: film.film_info.genre,

      description: film.film_info.description,
      watchingDate: film.user_details.watching_date,
      comments: film.comments,
      old: film.film_info.age_rating,
      isWatched: film.user_details.already_watched,
      isInWatchlist: film.user_details.watchlist,
      isFavorite: film.user_details.favorite
    };
  }
  static adaptFilmToServer({id, poster, name, originalName, rating, director, writers, actors, releaseDate, runtime, country, genres, description, watchingDate, comments, old, isWatched, isInWatchlist, isFavorite}) {
    return {
      id,
      comments,
      [`film_info`]: {
        title: name,
        [`alternative_title`]: originalName,
        [`total_rating`]: rating,
        poster,
        [`age_rating`]: old,
        director,
        writers,
        actors,
        release: {
          date: releaseDate,
          [`release_country`]: country
        },
        runtime,
        genre: genres,
        description},
      [`user_details`]: {
        watchlist: isInWatchlist,
        [`already_watched`]: isWatched,
        [`watching_date`]: watchingDate,
        favorite: isFavorite
      }
    };
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
