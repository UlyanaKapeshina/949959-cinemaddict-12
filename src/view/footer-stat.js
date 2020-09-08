import Abstract from "./abstract";

export default class FooterStatView extends Abstract {
  constructor(count) {
    super();
    this._count = count;
  }

  createTemplate() {
    return `<section class="footer__statistics">
    <p>${this._count.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1 `)} movies inside</p>
  </section>`;
  }
}

