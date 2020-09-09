import Abstract from "./abstract";
import {SortType} from "../constants";
import {changeActiveClass} from "../utils/render";
const ACTIVE_CLASS = `sort__button--active`;

export default class SortView extends Abstract {
  constructor() {
    super();
    this._clickHandlerBind = this._clickHandler.bind(this);
  }

  setClickHandler(callback) {
    this._callback.changeSortType = callback;
    this.element.addEventListener(`click`, this._clickHandlerBind);
  }
  _clickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    this._callback.changeSortType(evt.target.dataset.sort);
    changeActiveClass(ACTIVE_CLASS, evt.target, this.element);
  }

  createTemplate() {
    const sortList = Object.keys(SortType).map((it, i) => {
      return `<li><a href="#" data-sort="${SortType[it]}" class="sort__button ${i === 0 ? `sort__button--active` : ``}">Sort by ${SortType[it]}</a></li>`;
    }).join(``);
    return `<ul class="sort">
    ${sortList}
  </ul>`;
  }
}
