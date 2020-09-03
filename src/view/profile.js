import {RATING} from "../constants";
const getRatingName = (watchedFilms) => {
  const key = Object.keys(RATING).find((it) => RATING[it].min <= watchedFilms && RATING[it].max >= watchedFilms);
  return RATING[key].name;
};

export const getProfileTemplate = (films) => {
  const watchedFilms = films.filter((it) => it.isWatched).length;
  const ratingName = getRatingName(watchedFilms);


  return `${ratingName ? `<section class="header__profile profile"><p class="profile__rating">${ratingName}</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>` : ``}
  `;
};
