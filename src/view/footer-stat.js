
export const createFooterStatTemplate = (count) => {
  return `<section class="footer__statistics">
  <p>${count.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1 `)} movies inside</p>
</section>`;
};
