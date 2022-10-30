var el = require('./element.js');
var ul = el('div', { id: 'vdom' }, [
  el('p', {}, ['Virtual DOM']),
  el('ul', { id: 'list' }, [
    el('li', { class: 'item' }, ['Item 1']),
    el('li', { class: 'item' }, ['Item 2']),
    el('li', { class: 'item' }, ['Item 3']),
  ]),
  el('div', {}, ['Hello World']),
]);

console.log(ul);
