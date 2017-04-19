'use strict';

var config = require('./baseConfig');
module.exports = config({
  images: {
    background: '/images/backgrounds/background.jpg'
  },
  backgroundWidth: 2000,
  backgroundHeight: 4992,
  backgroundSpeed: 4,

  waves: [{
    type: 'enemy',
    spawnAt: 50,
    objects: [
      { x: 240, y: -100 },
      { x: 340, y: -120 },
      { x: 440, y: -140 },
      { x: 540, y: -160 }
    ]
  }, {
    type: 'debris',
    spawnAt: 400,
    objects: [
      { x: 940, y: -220 },
      { x: 300, y: -230 },
      { x: 710, y: -260 },
      { x: 340, y: -270 }
    ]
  }, {
    type: 'debris',
    spawnAt: 800,
    objects: [
      { x: 300, y: -130 },
      { x: 940, y: -320 },
      { x: 340, y: -370 },
      { x: 710, y: -460 }
    ]
  }]
});
