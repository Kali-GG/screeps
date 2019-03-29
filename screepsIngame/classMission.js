class Mission {
    constructor(data = {}) {
        this.id = data.id;
        this.active = true;
        this.parent = data.parent;
        this.children = [];
    }
    exe() {
        this.run();

        this.children.forEach(function(key) {
            if (missions[key]) {
                missions[key].exe();
            }
        }, this);
    }

    run () {

    }
}
class Plan extends Mission {
    exe () {

    }
}

class roomAdmin extends Mission {
    constructor (data = {}) {
        super(data);
        this.plan = undefined;
        this.roomName = data.roomName;
    }
    run () {
        console.log('roomAdmin executed');
        console.log(this.plan);
    }
}

class strategyController extends Mission {
    run () {
        //spawn admin mission for owned rooms
        Object.keys(Game.rooms).forEach(function (key) {
            if (Game.rooms[key].controller && Game.rooms[key].controller.my) {
                if (!missions[key+'_admin']) {
                    let newMission = spawn({id: key+'_admin', type: 'roomAdmin', parent: this.id, roomName: key});
                    if (newMission) {
                        missions[key+'_admin'] = newMission;
                        this.children.push(key+'_admin');
                    }
                }
            }
        }, this);

    }
}

function spawn(data) {
    switch(data.type) {
        case 'strategyController':
            return new strategyController(data);
            break;
        case 'roomAdmin':
            return new roomAdmin(data);
            break;
        default:
            return false;
    }
}

module.exports = {
    spawn: spawn,
    Plan: Plan,
    strategyController: strategyController,
    roomAdmin: roomAdmin
};