import {getRatingName} from "../utils/profile";
import {render, RenderPosition, replace} from "../utils/render";
import ProfileView from "../view/profile";

export default class ProfilePresenter {
  constructor(container, moviesModel) {
    this._container = container;
    this._profileComponent = null;
    this._moviesModel = moviesModel;
    this._onFilmsModelChange = this._onFilmsModelChange.bind(this);
  }

  init() {
    this._profileComponent = new ProfileView(this._getProfileData());
    this._moviesModel.addObserver(this._onFilmsModelChange);
    render(this._container, this._profileComponent, RenderPosition.BEFOREEND);
  }
  _update() {
    this._prevProfileComponent = this._profileComponent;
    this._profileComponent = new ProfileView(this._getProfileData());
    replace(this._profileComponent, this._prevProfileComponent);
    this._prevProfileComponent = null;
  }
  _onFilmsModelChange() {
    this._update();
  }

  _getProfileData() {
    const films = this._moviesModel.getFilms().slice();
    return getRatingName(films);
  }
}
