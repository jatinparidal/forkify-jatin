// import icons from '../img/icons.svg'; // this is done in parcel 1
import icons from 'url:../../img/icons.svg'; // this is done in parcel 2

export default class View {
  _data;

  _clear() {
    this._parentelement.innerHTML = '';
  }

  /**
   * This is used to render the received object to the DOM
   * @param {Object || Object[]} data the data will be sent to rendered e.g. recipe object
   * @param {boolean} [render = true] if false, create a markup string instead of rendering it to DOM
   * @returns
   * @author Jatin Paridal
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentelement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * this implements a optimes algo. for the DOM updation
   * @param {Object} data this will take the data and compare and update the object markup
   */
  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentelement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}.svg#icon-loader"></use>
            </svg>
          </div>
    `;
    this._clear();
    this._parentelement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorRecipe) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentelement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentelement.insertAdjacentHTML('afterbegin', markup);
  }
}
