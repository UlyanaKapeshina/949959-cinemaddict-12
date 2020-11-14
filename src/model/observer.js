export default class Observer {
  constructor() {
    this._observers = [];
  }
  addObserver(observer) {
    this._observers.push(observer);
  }
  removeObserver(observer) {
    this._observers = this._observers.filter((it) => observer !== it);
  }

  notify(...update) {
    this._observers.forEach((observer) => observer(...update));
  }
}
