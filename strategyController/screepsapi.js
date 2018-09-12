module.exports = function(reqObj) {

    /*
    var reqObj = {
        type: 'post-memory-segment',
        room: 'W67S26',
        shard: 'shard0',
        segment: '0',
        encoded: 'true',
        ptr: false,
        data: {
            segment: '0',
            data: 'neu1'
        }
    }
    */
    return new Promise(
        function(resolve, reject) {


            var https = require('https');

            var options = {
                hostname: 'screeps.com',
                port: 443,
                ptr: reqObj.ptr,
                headers: {
                    'X-Token': '341a9add-8745-4d9e-ac49-982ed2c3cb65',
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };

            switch (reqObj.type) {
                case 'get-memory-segment':
                    options.path = '/api/user/memory-segment?segment=' + reqObj.segment + '&shard=shard' + reqObj.shard;
                    options.method = 'GET';
                    break;
                case 'post-memory-segment':
                    options.path = '/api/user/memory-segment?shard=shard' + reqObj.shard;
                    console.log(options.path);
                    options.method = 'POST';
                    break;
                case 'room-terrain':
                    options.path = '/api/game/room-terrain?room=' + reqObj.room + '&shard=shard' + reqObj.shard;
                    if (reqObj.encoded == true) {
                        options.path += '&encoded=true';
                    }
                    console.log(options.path);
                    options.method = 'GET';
                    break;
                default:
                    return false;
            }


            var req = https.request(options, (res) => {
                //console.log('statusCode:', res.statusCode);
                //console.log('headers:', res.headers);

                res.on('data', (d) => {
                    //process.stdout.write(d);
                    let response = JSON.parse(d);
                    if (response.data) {resolve (response.data);}
                    if (response.terrain) {resolve (response.terrain);}
                });
            });

            req.on('error', (e) => {
                //console.error(e);
                reject ('error');
            });

            if (options.method == 'POST') {
                req.write(JSON.stringify(reqObj.data));
            }
            req.end();
        }
    );
}
