module.exports = {
    run: function() {
        if (Object.keys(Game.structures).length + Object.keys(Game.constructionSites).length != empire.structuresLastTick) {
            Object.keys(Game.rooms).forEach(key => {
                Game.rooms[key].spawnQueue = [];
                Game.rooms[key].myStructures = {
                    spawn: [],
                    extension: [],
                    controller: [],
                    link: [],
                    storage: [],
                    tower: [],
                    observer: [],
                    powerBank: [],
                    extractor: [],
                    lab: [],
                    terminal: [],
                    container: [],
                    nuker: []
                };
            });

        }

    }
};