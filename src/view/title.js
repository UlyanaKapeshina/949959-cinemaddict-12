export const getTitleTemplate = (filmsData) => {

  return `${filmsData.length ? `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>` : `<h2 class="films-list__title">There are no movies in our database</h2>`}`;
};
