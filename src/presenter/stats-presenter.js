import {render, remove, RenderPosition} from "../utils/render";
import Stats from "../view/stats";


export default class StatsPresenter {
  constructor(container) {
    this._container = container;
    this._stats = null;
  }

  init(films) {
    this._stats = new Stats(films);
    render(this._container, this._stats, RenderPosition.BEFOREEND);
  }
  destroy() {
    remove(this._stats);
    this._stats = null;
  }
  get stats() {
    return this._stats;
  }
}
