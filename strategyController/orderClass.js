var room = require('./roomClass');

class order {
    constructor(data) {
        this.id = data.id;
        this.type = data.type;
        this.res = {};
        this.status = 'unresolved';

        this.generateReq(data);
    }

    generateReq(data) {
        this.req = {
            id: data.id,
            type: data.type
        }
    }

    update(data = {}) {
        return ': standard update procedure';
    }

    incCom (data) {

    }
}

class statusReport extends order {

    update (data = {}) {
        return ': specific statusReport update procedure ';
    }

    incCom (apiRes, empire) {
        // ----------------------------
        // Expected return:
        // {id: 123, type: 'statusReport', res: {claimedRooms: ['W67S33', 'W55S35'], unfinishedOrders: ['id123', 'id234']} }
        // ----------------------------
        try {
            apiRes.res.claimedRooms.forEach(roomName => {
                if (empire.rooms[roomName]) {
                    console.log(empire.logEntry() + roomName + ' in empire.rooms');
                }
                else {
                    console.log(empire.logEntry() + roomName + ' not in empire.rooms');
                    empire.rooms[roomName] = new room(roomName, empire);
                }
            });
        }
        catch (err) {
            console.log(empire.logEntry() + err);
        }
    }

}

class test extends order {

}

module.exports = {
    statusReport: statusReport,
    test: test
}
