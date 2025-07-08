import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class bookmarksView extends View {
  _parentelement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    console.log(this._data);

    // here this._data is a array
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }

  // _generateMarkupPreview(result) {
  //   const id = window.location.hash.slice(1);
  //   return `
  //         <li class="preview">
  //           <a class="preview__link ${
  //             id === result.id ? 'preview__link--active' : ''
  //           }" href="#${result.id}">
  //             <figure class="preview__fig">
  //               <img src="${result.image}" alt="Test" />
  //             </figure>
  //             <div class="preview__data">
  //               <h4 class="preview__title">${result.title}</h4>
  //               <p class="preview__publisher">${result.publisher}</p>
  //             </div>
  //           </a>
  //         </li>
  //   `;
  // }
}

export default new bookmarksView();

// <div class="preview__user-generated">
//                   <svg>
//                     <use href="${icons}#icon-user"></use>
//                   </svg>
//                 </div>
