
import Abstract from "./abstract";

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  _restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
  _updateElement() {
    let prevView = this.element;
    const parent = prevView.parentElement;
    this.removeElement();
    const newView = this.element;
    parent.replaceChild(newView, prevView);
    prevView = null;
    this._restoreHandlers();

  }
  _updateData(newData, isUpdateElement = true) {
    if (!newData) {
      return;
    }
    this._data = Object.assign({}, this._data, newData);
    if (isUpdateElement) {

      this._updateElement();
    }
  }
}

