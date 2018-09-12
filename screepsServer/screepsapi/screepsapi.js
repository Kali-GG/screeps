module.exports = {
    apiRequest: function(apiReq) {
        var https = require('https');

        sendRequest(prepareRequestObj(apiReq));
        console.log('req sent');

        function prepareRequestObj(type) {
            var reqObj = {};
            switch (type) {
                case 'getMemory':
                    reqObj.path = '/api/user/memory';
                    reqObj.method= 'GET';
                    reqObj.data = undefined;
                    break;
                default:
                    reqObj.path = '/api/user/memory';
                    reqObj.method= 'GET';
                    reqObj.data = undefined;
                    break;
            }
            return reqObj;
        }

        function sendRequest(reqObj) {
            var email = 'flo.hoefler@gmail.com';
            var password = 'mgygax12';
            /*data = {
                branch: 'upload',
                modules: moduleContent
            };*/

            var options = {
                hostname: 'screeps.com',
                port: 443,
                path: reqObj.path, //'/api/user/code',
                method: reqObj.method, //'POST',
                auth: email + ':' + password,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };

            var req = https.request(options, (res) => {
                console.log('statusCode:', res.statusCode);
                console.log('headers:', res.headers);

                res.on('data', (d) => {
                    process.stdout.write(d);
                });

                req.on('error', (e) => {
                    console.error(e);
                });
            });

            req.write(JSON.stringify(reqObj.data));
            req.end();
        }
    }
};

