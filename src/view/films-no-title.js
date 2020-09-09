import Abstract from "./abstract";

export default class TitleNoFilmsView extends Abstract {
  createTemplate() {
    return `<h2 class="films-list__title">There are no movies in our database</h2>`;
  }
}
