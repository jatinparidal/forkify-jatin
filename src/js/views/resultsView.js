import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _parentelement = document.querySelector('.results');
  _errorMessage =
    'Recipe noe available for your query. Please try another dish..';
  _message = '';

  _generateMarkup() {
    console.log(this._data);

    // here this._data is a array
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
