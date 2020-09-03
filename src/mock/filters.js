export const FILTERS = {
  all: `All movies`,
  watchlist: `Watchlist`,
  watched: `History`,
  favorite: `Favorites`,
};

export const filterFilms = (films) => {
  return {
    all: films,
    watchlist: films.filter((it) => it.isInWatchlist),
    watched: films.filter((it) => it.isWatched),
    favorite: films.filter((it) => it.isFavorite),
  };
};

