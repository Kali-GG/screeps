module.exports = {
    init: function(newVersion) {
        if (Memory[Game.shard.name] && Memory[Game.shard.name].version == newVersion && Object.keys(Game.structures).length > 1) {
            softInit();
            fullInit(newVersion);
        } else {
            softInit();
            fullInit(newVersion);
        }
    }
};

function softInit() {
    global.missions = {};
    global.lastReset = Game.time;
}

function fullInit(newVersion) {
    Memory[Game.shard.name] = {
        version: newVersion,
        missions: {}
    }
    missions['strategyController'] = ClassMission.spawn({id: 'strategyController', type: 'strategyController'});
}