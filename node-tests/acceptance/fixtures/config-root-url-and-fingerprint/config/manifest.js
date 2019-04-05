'use strict';

module.exports = function() {
  return {
    name: 'foo',
    icons: [
      {
        src: 'pio.png',
      }, {
        src: 'pio.png',
        element: 'square150x150logo',
        targets: ['ms'],
      }, {
        src: 'pio.png',
        sizes: '32x32',
        type: 'image/png',
        targets: ['apple']
      }
    ],
  }
}
