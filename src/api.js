import CommentsModel from "./model/comments-model";
import MoviesModel from "./model/movies-model";

export default class API {
  constructor(url, auth) {
    this._url = url;
    this._auth = auth;
  }
  getFilms() {
    return fetch(`${this._url}/movies`, {
      method: `GET`,
      headers: {
        'Authorization': `${this._auth}`
      }
    })
    .then(this._checkResponse)
    .then((response) => response.json());
  }
  updateFilm(film) {
    return fetch(`${this._url}/movies/${film.id}`, {
      method: `PUT`,
      body: JSON.stringify(MoviesModel.adaptFilmToServer(film)),
      headers: {
        'Authorization': `${this._auth}`,
        "Content-Type": `application/json`
      }
    })
    .then(this._checkResponse)
    .then((response) => response.json())
    .then((response) => MoviesModel.adaptFilmToClient(response));

  }
  getComments(id) {
    return fetch(`${this._url}/comments/${id}`, {
      method: `GET`,
      headers: {
        'Authorization': `${this._auth}`
      }
    }
    )
    .then(this._checkResponse)
    .then((response) => response.json())
    .then((response) => response.slice().map(CommentsModel.adaptCommentToClient));

  }
  addComment(id, comment) {
    const body = JSON.stringify(CommentsModel.adaptCommentToServer(comment));
    return fetch(`${this._url}/comments/${id}`, {
      method: `POST`,
      body,
      headers: {
        'Authorization': this._auth,
        "Content-Type": `application/json`
      }
    })
    .then(this._checkResponse)
    .then((response) => response.json())
    .then((response) => {
      response.comments = response.comments.map((it) => CommentsModel.adaptCommentToClient(it));
      return response;

    });
  }
  deleteComment(id) {
    return fetch(`${this._url}/comments/${id}`, {
      method: `DELETE`,
      headers: {
        'Authorization': this._auth
      }
    })
    .then(this._checkResponse);
  }

  _checkResponse(response) {
    if (response.ok) {
      return response;
    } else {
      throw new Error(response.status);
    }
  }
}
