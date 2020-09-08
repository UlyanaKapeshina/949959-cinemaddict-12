import Abstract from "./abstract";

export default class TitleView extends Abstract {

  createTemplate() {
    return `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
  }
}

