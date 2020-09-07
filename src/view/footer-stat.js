
export default class FooterStatView {
  constructor(count) {
    this._count = count;
    this._element = null;
  }
  get element() {
    if (!this._element) {
      this._element = this.createElement();
    }
    return this._element;
  }
  createElement() {
    const div = document.createElement(`div`);
    div.innerHTML = this.createTemplate();
    return div.firstChild;
  }
  removeElement() {
    this._element = null;
  }
  createTemplate() {
    return `<section class="footer__statistics">
    <p>${this._count.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1 `)} movies inside</p>
  </section>`;
  }
}

