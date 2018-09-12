
var fs = require('fs');
var path = require('path');
var https = require('https');

var moduleList = [];
var moduleContent = {};

getFiles();

moduleList.forEach(key => {
    let fileName = './' + key + '.js';
    fs.readFile(fileName, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        moduleContent[key] = data;

        if (moduleList.length == Object.keys(moduleContent).length) {
            deploy();
        }
    });
});

function getFiles() {
    const folder = './';
    fs.readdirSync(folder).forEach(file => {
        let fileInfo = path.parse(file);
        if (fileInfo.ext == '.js') {
            moduleList.push(fileInfo.name);
            console.log(fileInfo.name);
        }
    })
}

function deploy() {

    var email = 'flo.hoefler@gmail.com',
        password = 'xxx',
        data = {
            branch: 'upload',
            modules: moduleContent
        };

    var options = {
        hostname: 'screeps.com',
        port: 443,
        path: '/api/user/code',
        method: 'POST',
        auth: email + ':' + password,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };

    var req = https.request(options, (res) => {
        //console.log('statusCode:', res.statusCode);
        //console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
        });

        req.on('error', (e) => {
            console.error(e);
        });
    });

    req.write(JSON.stringify(data));
    req.end();
}


