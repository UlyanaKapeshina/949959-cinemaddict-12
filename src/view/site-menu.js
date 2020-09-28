import Abstract from "./abstract";

export default class SiteMenu extends Abstract {


  createTemplate() {
    return `<nav class="main-navigation">
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
  }
}
