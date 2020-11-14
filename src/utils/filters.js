const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

const filmsToFilterMap = {
  [`All movies`]: (films) => films.length,
  Watchlist: (films) => films.filter((it) => it.isInWatchlist).length,
  History: (films) => films.filter((it) => it.isWatched).length,
  Favorites: (films) => films.filter((it) => it.isFavorite).length,
};

export const getFilterItems = (films) => {
  const filters = Object.keys(filmsToFilterMap).map((it) => {

    return {
      name: it,
      count: filmsToFilterMap[it](films),
      id: it.split(` `)[0].toLowerCase()
    };
  });
  return filters;
};
export const getFilterFilms = (filterType, filmsForFilter) => {
  switch (filterType) {
    case FilterType.ALL:
      filmsForFilter = filmsForFilter.slice();
      break;
    case FilterType.HISTORY:
      filmsForFilter = filmsForFilter.slice().filter((it) => it.isWatched);
      break;
    case FilterType.FAVORITES:
      filmsForFilter = filmsForFilter.slice().filter((it) => it.isFavorite);
      break;
    case FilterType.WATCHLIST:
      filmsForFilter = filmsForFilter.slice().filter((it) => it.isInWatchlist);
      break;
  }
  return filmsForFilter;
};


