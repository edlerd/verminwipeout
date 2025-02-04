'use strict';

var config = require('./baseConfig');
var gameConfig = require('./game.conf');
var times = require('lodash/times');

function yWayPoints(count) {
  return function (startPosition) {
    return times(count, function (i) {
      if (i === 0) {
        return -500 + startPosition.y;
      }
      if (i === count-1) {
        return gameConfig.height + 500 + startPosition.y;
      }
      return startPosition.y + row(i, count-2);
    });
  };
}

var wayPoints = {
  straight: function (count) {
    return function (startPosition) {
      return {
        x: times(count, function () {
          return startPosition.x;
        }),
        y: yWayPoints(count)(startPosition)
      };
    };
  },
  zickZack: function (count) {
    return function (startPosition) {
      return {
        x: times(count, function (i) {
          return startPosition.x + (i % 2 ? 0 : 80);
        }),
        y: yWayPoints(count)(startPosition)
      };
    };
  }
};

var formations = {
  v: function (xOffset, xDistance, yDistance) {
    return function (count) {
      var centerIndex = Math.floor(count / 2);
      return times(count, function (i) {
        return {
          x: xOffset + i * xDistance,
          y: -Math.abs(centerIndex - i) * yDistance
        };
      });
    }
  },
  horizontal: function (xOffset, xDistance) {
    return function (count) {
      return times(count, function (i) {
        return {
          x: xOffset + i * (xOffset + xDistance),
          y: 0
        };
      });
    }
  },
  vertical: function (xOffset, yDistance) {
    return function (count) {
      return times(count, function (i) {
        return {
          x: xOffset,
          y: i * yDistance
        };
      });
    }
  }
};

function col(which, from) {
  return Math.floor(gameConfig.width / from * (which - 1));
}
function row(which, from) {
  return Math.floor(gameConfig.height / from * (which - 1));
}

function createEnemyWave(config) {
  var wave = {};
  wave.type = config.type;
  wave.spawnTime = config.spawnTime;
  var startPositions = config.formation(config.creatureCount);
  wave.objects = startPositions.map(function (startPos) {
    var waveObj = config.wayPoints(startPos);
    waveObj.time = config.durationToReachNextWayPoint * waveObj.y.length;
    return waveObj;
  });
  return wave;
}


module.exports = config({
  images: {
    background: '/images/backgrounds/background.jpg',
    healthBarBackground: '/images/interface/healthbar-background.png',
  },
  backgroundSpeed: 2,

  healthBarWidth: 33,
  healthBgPaddingY: 57, // keep in sync with player.conf: healthPaddingY

  debrisSpawnRatio: 500,

  waves: [

      createEnemyWave({
        type: 'cutterfly',
        spawnTime: 500,
        durationToReachNextWayPoint: 800,
        formation: formations.vertical(50, 150),
        creatureCount: 5,
        wayPoints: wayPoints.straight(6)
      }),

      createEnemyWave({
        type: 'cutterfly',
        spawnTime: 501,
        durationToReachNextWayPoint: 800,
        formation: formations.vertical(200, 150),
        creatureCount: 5,
        wayPoints: wayPoints.straight(6)
      }),

      createEnemyWave({
        type: 'cutterfly',
        spawnTime: 1200,
        durationToReachNextWayPoint: 800,
        formation: formations.vertical(350, 150),
        creatureCount: 3,
        wayPoints: wayPoints.straight(6)
      }),

      createEnemyWave({
        type: 'cutterfly',
        spawnTime: 1400,
        durationToReachNextWayPoint: 800,
        formation: formations.vertical(500, 150),
        creatureCount: 3,
        wayPoints: wayPoints.straight(6)
      }),

      createEnemyWave({
        type: 'cutterfly',
        spawnTime: 1600,
        durationToReachNextWayPoint: 800,
        formation: formations.vertical(650, 150),
        creatureCount: 3,
        wayPoints: wayPoints.straight(6)
      }),

      createEnemyWave({
        type: 'cutterfly',
        spawnTime: 3000,
        durationToReachNextWayPoint: 800,
        formation: formations.horizontal(50, 50),
        creatureCount: 8,
        wayPoints: wayPoints.straight(6)
      }),

      createEnemyWave({
        type: 'jizzler',
        spawnTime: 3300,
        durationToReachNextWayPoint: 800,
        formation: formations.horizontal(50, 50),
        creatureCount: 7,
        wayPoints: wayPoints.straight(6)
      }),

      createEnemyWave({
        type: 'jizzler',
        spawnTime: 33000,
        durationToReachNextWayPoint: 800,
        formation: formations.vertical(650, 150),
        creatureCount: 7,
        wayPoints: wayPoints.straight(6)
    })
  ]
});
