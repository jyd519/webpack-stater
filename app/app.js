import bar from './bar';
import _ from 'lodash';

require('bootstrap');
require('../assets/common.css');

bar();
bar();

//test
function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpack!']);

  return element;
}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept();
}

