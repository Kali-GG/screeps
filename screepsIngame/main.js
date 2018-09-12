var pt = require('prototypes');

global.battleCon = require('battleController');
global.strategyCon = require('strategyController');
global.adminCon = require('administrativeController');
global.systemCon = require('systemController');
global.empire = {
    structuresLastTick: null
};
global.playerName = 'Kali';

module.exports.loop = function () {

    systemCon.run();


};