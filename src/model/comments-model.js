import Observer from "./observer";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = [];

  }
  setComments(comments, id) {
    this._comments = comments;
    this.notify(id);
  }

  getComments() {
    return this._comments;
  }

  deleteComment(commentId) {
    this._comments = this._comments.filter((it) => it.id !== commentId);
  }
  updateComments(newComments) {
    this._comments = newComments;
  }
  static adaptCommentToClient({id, author, comment, date, emotion}) {
    return {
      id,
      author,
      text: comment,
      date,
      emotion
    };
  }
  static adaptCommentToServer([text, emotion, date]) {

    return {
      comment: text,
      emotion,
      date: new Date(date).toISOString()
    };
  }
}
