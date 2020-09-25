import Observer from "./observer";

export default class FiltersModel extends Observer {
  constructor() {
    super();
    this._filter = `all`;
  }
  setFilter(filter) {
    this._filter = filter;
    this.notify(filter);
  }
  getFilter() {
    return this._filter;
  }

}
