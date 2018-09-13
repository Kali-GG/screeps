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
var db;

MongoClient.connect("mongodb://localhost:27017/screeps_db", function(err, database) {

    db = database;

    try {
        db.collection("0_empire").insertMany(myobj, function(err, res) {
            if (err) throw err;
            console.log(res.insertedCount + " document(s) inserted");
            console.log(res);
            db.close();
        });
    }
    catch (damn) {
        console.log(damn);
    }

    if(err) {
        //throw err;
        console.log('Error while connecting to db: ' + err);
    }
    else {
        console.log("DB up and running");

        shards.forEach(key => {
            empires[key] = new empireController(key, database);
        });
    }
});











