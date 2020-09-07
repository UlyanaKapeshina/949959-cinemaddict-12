export default class ProfileView {
  constructor(ratingName) {
    this._ratingName = ratingName;
    this._element = null;
  }
  get element() {
    if (!this._element) {
      this._element = this.createElement();
    }
    return this._element;
  }
  createElement() {
    const div = document.createElement(`div`);
    div.innerHTML = this.createTemplate();
    return div.firstChild;
  }
  removeElement() {
    this._element = null;
  }
  createTemplate() {

    return `${this._ratingName ? `<section class="header__profile profile"><p class="profile__rating">${this._ratingName}</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>` : ``}
    `;
  }
}
