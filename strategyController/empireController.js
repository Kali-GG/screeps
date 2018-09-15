var screepsapi = require('./screepsapi');
var orderClass = require('./orderClass');
var roomClass = require('./roomClass');

module.exports= class empireController{

    constructor(shard) {
        this.shard = shard;
        this.tickIsRunning = false;
        this.status = 'unknown';
        this.orders = {};
        this.ordersUnfinished = [];
        this.orderCounter = 0;
        this.iteration = 0;
        this.rooms = {};

        this.run();
    }

    async run() {
        (await db.find('rooms', this.shard)).forEach(key => {
            if(key.name){
                this.rooms[key.name] = new roomClass(key.name, this, key);
                console.log(this.logEntry() + JSON.stringify(this.rooms[key.name]));
            }
        });
        //do same for orders

        while (this.iteration < 3) { //get rid of this condition // come up with a useful condition
            this.tick();
            await this.sleep(1000);
        }

        process.exit(); // shut down everything
    }

    async tick() {
        if (this.tickIsRunning == false) {
            this.tickIsRunning = true;

            // 1.) get communication from server & analyse it

            /*
            this.analyseIncCom(await screepsapi({
                type: 'get-memory-segment',
                segment: 2,
                shard: this.shard
            }));
            */
            this.analyseIncCom({"orders":[{"id":"0","res":{"claimedRooms":["W67S33"]}},{"id":"1","someatt":"some value"}]}); // test data w/o actual screeps api


            // 2.) recalc strategy
            this.strategyCalc();



            //this.giveOrders(empire);

            // 3.) issue orders
            //this.issueOrders(empire);

            this.iteration++;
            this.tickIsRunning = false;
        }
    }

    analyseIncCom(apiRes) {
        if (apiRes) {
            if (apiRes.orders) {
                apiRes.orders.forEach(incOrder => {
                    if (incOrder.id) {
                        if (this.orders[incOrder.id]) {
                            if (this.orders[incOrder.id].status == 'unresolved') {
                                this.orders[incOrder.id].incCom(incOrder, this);
                            }
                            else {
                                //console.log(this.logEntry() + 'incCom order with id ' + incOrder.id + ' already done');
                            }
                        }
                        else {
                            console.log(this.logEntry() + 'incCom order with id ' + incOrder.id + ' not found in empire.orders');
                        }
                    }
                    else {
                        console.log(this.logEntry() + 'incCom order without id ' + JSON.stringify(incOrder));
                    }
                });
            }
            if (apiRes.orderRequests) {
                //inc help req
            }
        }
    }

    strategyCalc() {
        if (this.status == 'unknown' && this.checkOrderIntegrity('statusReport')) {
            let orderId = this.getNewOrderId();
            this.orders[orderId] = new orderClass.statusReport({
                id: orderId,
                type: 'statusReport'
            });
            this.ordersUnfinished.push(orderId);
        }
        if (this.status == 'unknown' && this.checkOrderIntegrity('test')) { //debug
            let orderId = this.getNewOrderId();
            this.orders[orderId] = new orderClass.test({
                id: orderId,
                type: 'test'
            });
            this.ordersUnfinished.push(orderId);
        }
        if (this.status == 'unknown') { //testdata - get rid of this block
            let orderId = 0;
            this.orders[orderId] = new orderClass.statusReport({
                id: orderId,
                type: 'statusReport'
            });
            this.ordersUnfinished.push(orderId);
        }
        /* debug
        Object.keys(this.orders).forEach(key => { //debug
            console.log(this.logEntry() + key +  ' ' + this.orders[key].update());
        });
        */
    }


    checkOrderIntegrity(orderType) {
        if (orderType == undefined) { //invalid order
            return false;
        }
        for (let i = 0; i< this.ordersUnfinished.length; i++) { //duplicate
            if (this.orders[this.ordersUnfinished[i]].type == orderType && this.orders[this.ordersUnfinished[i]].status == 'unresolved') {
                return false;
            }
        }
        return true;
    }

    /*
    issueOrders(empire) {
        var data = [];

        empire.ordersUnfinished.forEach(key => {
           console.log('shard ' + empire.shard + ': ' + key + ' ' + empire.orders[key]);

        });

        console.log('shard ' + empire.shard + ': ' + 'issue orders');
    }*/

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getNewOrderId() {
        this.orderCounter ++;
        return this.getTime() + '_' + this.orderCounter;
    }

    getTime(formated = false) {
        let dateObj = new Date();

        let yyyy = dateObj.getFullYear();
        let mm = dateObj.getMonth() +1;
        let dd = dateObj.getDate();

        if(dd<10) {dd = '0' + dd;}
        if(mm<10) {mm = '0' + mm;}

        let h = dateObj.getHours();
        let min = dateObj.getMinutes();
        let sec = dateObj.getSeconds();
        let ms = dateObj.getMilliseconds();

        if (h < 10) {h = '0' + h;}
        if (min < 10) {min = '0' + min;}
        if (sec < 10) {sec = '0' + sec;}
        if (ms < 100) {
            if (ms < 10) {
                ms = '0' + ms;
            }
            ms = '0' + ms;
        }

        if (formated) {
            return yyyy + '/' + mm + '/' + dd + ' ' + h + ':' + min + ':' + sec + ':' + ms;
        } else {
            return yyyy + mm + dd + h + min + sec + ms;
        }
    }

    logEntry() {
        return 's' + this.shard + ' | t' + this.iteration + ' | ' + this.getTime(true) + ' | ';
    }
}

