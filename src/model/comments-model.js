import Observer from "./observer";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = [];
    this._idGenerator = 11111;
  }
  setComments(comments) {
    this._comments = comments;
  }
  getCommentsById(id) {
    return this._comments.filter((it) => it.id === id);

  }
  getComments() {
    return this._comments;
  }

  deleteComment(commentId, filmId) {
    const newComments = this._comments.filter((it) => it.id !== commentId);
    this._comments = newComments;
    this.notify(filmId);
  }
  addComment([text, emotion, date], filmId) {
    const newComment = {
      id: `${this._idGenerator++}`,
      author: `ololo`,
      text,
      date,
      emotion,
    };
    this._comments = [...this._comments, newComment];
    this.notify(filmId);
  }
}
