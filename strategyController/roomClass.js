var screepsapi = require('./screepsapi');

// comment from pc

module.exports = class room {

    constructor(roomName, empire) {
        this.name = roomName;
        this. status = 'updating';
        this.terrainUpdate(empire);

        //console.log(empire.logEntry() + 'this.terrain' + this.terrain);
    }

    async terrainUpdate(empire) {
        /*
        let apiRes = await screepsapi({
            type: 'room-terrain',
            shard: empire.shard,
            room: this.name,
            encoded: true
        });
        */

        let apiRes = {"_id":"57ef9c7a86f108ae6e60c3fb","room":"W67S33","terrain":"1111111111111110000000000000000111111111111111111111111111000000000000000000000000111100001111110011100111110000000000000000000000000111000001111000011001111100000000000000011100000001111000011110000110001111000000000000001111110000011111000111110001100000000011110000000111111100001111110011111110011000000001111111100011111111101111100000111111100110000000011111111111111111110111110000000111110001100000000111111111111111111111111000000001111000011100000001110000111111111111111100001100001100000111000000000000000111111111111110000111000000000001111000000000000001111111111111000000111010000000011100000000000000011111111110000000000111110000000111110000000000001111111100000000110001111100000011000000000000000011111111000000000000001111000011110011111110000001111111110000000111000000000001111100111000111000111111111110000001110000000000011111001111011110011111111111100000111110111000000011110011110011100111110011110000000111111111111110001100011100002200000000111100000000011111111111110001000111100222000000001111000011100000111111111000011001111022220011100001110001111110022011111111101110011110020001111100011000001111113220000111111111000111100010111111000000000000111111100000111111110001110000001111110000000022200011111100001111111100001000001111111100000000022000011111100111111111000110000000111111000000011300001111111111110000110011100000111111100000000000000011111111111000000111111100000010100000000000000001111110111100000001111110000000000000011001100000111111000110000000011111100000000000000111111100111110000000000000001111100000111110000001110011011111000000000000011111110000001111111100000000000111100000000001100111111110000001111110000000000111000000000000011000111111000000000000000000000111100000000000000000000111110000000000000000000011111000111000000000000001111000000000000000000001111110001111000001010101111110000000000000110000011111000011111000010111111111100000000000011110000111110000111110000100111111111000001110001111110000111100000100000000001111111111000011110111111000200033100000000000000011111111110001111101111111332000011101000000000111101111111111001110001111111330000001111000000011111011111111100000000000001111100000001110000000011010111111111000000000000011111000000000000000000000000111111100000000000000000000000000000000000000000000111111000000000011000000000000011100110000010011100111110001100000111100000000000111011110001110111111111110111100011111110011111111111111100111100111111111111111111111111111111111111111111111111001111111","type":"terrain"};

        if(apiRes.terrain) {
            this.terrain = apiRes.terrain;
            this.status = 'complete';
        }
        else {
            this.status = 'incomplete';
        }
    }

}