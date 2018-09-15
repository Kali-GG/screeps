

module.exports = class dbController {
    constructor(db) {
        this.db = db;
    }

    async insert(collectionName, shard, dataObj) {
        let collection = this.db.collection(shard + '_' + collectionName);

        if (dataObj._id && (await this.find(collectionName,shard , {_id: dataObj._id}).length > 0)) { // update
            collection.insertOne(dataObj, function(err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Inserted ' + result + ' documents into ' + collectionName);
                }
            });
        }
        else {
            collection.updateOne({_id: dataObj.id}, {$set: dataObj}, function(err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Updated ' + result + ' documents in ' + collectionName);
                }
            });
        }
    }



    find(collectionName,shard , searchQuery = {}){
        const collection = this.db.collection(shard + '_' + collectionName);
        return new Promise(
            function(resolve, reject) {
                // Find some documents
                collection.find(searchQuery).toArray(function (err, docs) {
                    if (err) {
                        console.log(err);
                        reject (err);
                    }
                    else {
                        resolve (docs);
                    }
                });
            }
        );
    }
};
