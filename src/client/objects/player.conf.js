'use strict';

var config = require('../baseConfig');
module.exports = config({
  images: {
    ship: '/images/ship/ship.png',
    shipLeft: '/images/ship/ship-left.png',
    shipRight: '/images/ship/ship-right.png'
  },
  sprites: {
    shield: {
      animationName: 'ship-shield',
      imageSrc: '/images/ship/ship-shield.png',
      frames: [1, 2, 3, 4, 5, 6, 7],
      width: 214,
      height: 200,
      frameRate: 15
    }
  },
  width: 78,
  height: 90,
  speed: 10
});
