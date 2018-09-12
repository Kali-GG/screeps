/*var test = require('./screepsapi');

console.log(test({
    type: 'room-terrain',
    room: 'W67S26',
    shard: 'shard0',
    segment: '0',
    encoded: false,
    ptr: false,
    data: {
        segment: '0',
        data: 'neu1'
    }
}));*/

let x = {
    type: 'room-terrain',
    room: 'W67S26',
    shard: 'shard0',
    segment: '0',
    encoded: false,
    ptr: false,
    data: {
        segment: '0',
        data: 'neu1'
    }
};
//console.log(JSON.stringify(x));

let shards = [0,1];
let empires = {};

var MongoClient = require('../screepsServer/node_modules/mongodb').MongoClient;
var empireController = require('./empireController');

MongoClient.connect("mongodb://localhost:27017/screeps_db", function(err, database) {
    if(err) throw err;

    console.log("DB up and running");

    shards.forEach(key => {
        empires[key] = new empireController(key, database);
    });

});











