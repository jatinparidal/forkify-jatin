import View from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentelement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentelement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const prevBtn = `
          <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
      `;
    const nextBtn = `
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return nextBtn;
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return prevBtn;
    }

    // Other page
    if (currentPage < numPages) {
      return `
      ${prevBtn}
      ${nextBtn}
      `;
    }

    // Page 1, and there are no other page
    return '';
  }
}

export default new paginationView();
