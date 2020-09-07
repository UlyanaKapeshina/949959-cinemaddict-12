export const RATING = {
  no: {
    max: 0,
    min: 0,
    name: ``
  },
  novice: {
    max: 10,
    min: 1,
    name: `Novice`,
  },
  fan: {
    max: 20,
    min: 11,
    name: `Fan`,
  },
  movieBuff: {
    max: Infinity,
    min: 21,
    name: `Movie Buff`,
  },
};
export const getRatingName = (films) => {
  const watchedFilms = films.filter((it) => it.isWatched).length;
  const key = Object.keys(RATING).find((it) => RATING[it].min <= watchedFilms && RATING[it].max >= watchedFilms);
  return RATING[key].name;
};
