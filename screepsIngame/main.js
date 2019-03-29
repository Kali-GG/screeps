/*var pt = require('prototypes');

global.battleCon = require('battleController');
global.strategyCon = require('strategyController');
global.adminCon = require('administrativeController');
global.systemCon = require('systemController');
global.empire = {
    structuresLastTick: null
};
global.playerName = 'Kali';


 */

global.playerName = 'Kali';
global.version = '20190327_5';

global.ClassMission = require('classMission');
global.systemCon = require('systemController');


systemCon.init(version);


module.exports.loop = function () {

    Object.keys(Game.rooms).forEach(function (key) {
        Game.rooms[key].enemies = Game.rooms[key].find(FIND_HOSTILE_CREEPS);
    });

    if (missions['strategyController']) {
        missions['strategyController'].exe();
    }
    console.log(JSON.stringify(missions));
};