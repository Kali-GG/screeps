

module.exports = class dbController {
    constructor(db) {
        this.db = db;
    }

    test() {
        /*
        this.db.collection("0_empire").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });*/
    }

};

/*
this.dbo =  MongoClient.connect(url);

this.status =  this.dbo.then(function(){
   return true;
});
*/


/* //insert
var myobj = [{name: "Company Inc", address: "Highway 37"}];
/*dbo.collection("0_empire").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log(res.insertedCount + " document(s) inserted");
    console.log(res);
    db.close();
});*/

/* // find a row
dbo.collection("0_empire").find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
});
*/

/* //delete
var myquery = { address: 'Mountain 21' };
dbo.collection("customers").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
});
*/

/* //drop collection
dbo.collection("customers").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
});
 */

/* //update
var myquery = { address: "Valley 345" };
var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
});
*/