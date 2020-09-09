import Abstract from "./abstract";

export default class ProfileView extends Abstract {
  constructor(ratingName) {
    super();
    this._ratingName = ratingName;
  }

  createTemplate() {
    return `${this._ratingName ? `<section class="header__profile profile"><p class="profile__rating">${this._ratingName}</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>` : ``}
    `;
  }
}
