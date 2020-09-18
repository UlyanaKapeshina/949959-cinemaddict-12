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
    // return this._comments.filter((it) => it.id === id);
    return this._comments;
  }
  // updateComment(id, update) {
  //   for (let comment of this._comments) {
  //     if (comment.id === id) {
  //       comment = Object.assign({}, comment, update);
  //       break;
  //     }
  //   }
  // }
  deleteComment(id) {
    this._comments = this._comments.filter((it) => it.id !== id);
  }
  addComment(newComment) {
    const comment = {
      id: this._idGenerator++,
      author: `ololo`,
      comment: newComment.text,
      date: newComment.date,
      emotion: newComment.emotion
    };
    this._comments = Object.assign({}, this._comments, comment);
  }
}
