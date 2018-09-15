var MongoClient = require('../screepsServer/node_modules/mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'screeps_db';

let shards = [0,1];
let empires = {};

var empireController = require('./empireController');
var dbClass = require('./dbController');

startEmpireController();

async function startEmpireController() {
    MongoClient.connect(url, function(err, client) {

        if (err) {
            console.log('err while connecting to db');
        }
        else {
            console.log("Connected successfully to server");

            global.db = new dbClass (client.db(dbName));
            shards.forEach(key => {
                empires[key] = new empireController(key);
            });

            db.db.on('close', function () {
                startEmpireController();
            });
        }
    });
}
















