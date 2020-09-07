// const filmsToFilterMap = [
//   {
//     name: `All movies`,
//     id: `all`,
//     count: (films) => films.length,
//   },
//   {
//     name: `Watchlist`,
//     id: `watchlist`,
//     count: (films) => films.filter((it) => it.isInWatchlist).length,
//   },
//   {
//     name: `History`,
//     id: `watched`,
//     count: (films) => films.filter((it) => it.isWatched).length,
//   },
//   {
//     name: `Favorites`,
//     id: `favorite`,
//     count: (films) => films.filter((it) => it.isFavorite).length,
//   },
// ];

// export const getFiltersCount = (films) => {
//   return filmsToFilterMap.map((it)=> it.count(films));
// };
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


