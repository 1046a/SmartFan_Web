const ffi = require('ffi');
const ref = require('ref');
const debug = require('debug')('SmartFan_Web:fan');
const repeat = require('repeat').default;

const doublePtr = ref.refType('double');

const smartfan = ffi.Library(__dirname + '/libsmartfan', {
    'power_up': ['bool', []],
    'power_off': ['bool', []],
    'state': ['int', [doublePtr]],
    'set_iter': ['void', ['int']],
    'set_idleness': ['void', ['int']],
    'set_theta': ['void', ['double']],
})

class Fan {
    constructor(client) {
        var _this = this;
        this.power = false;
        this.mode = 0;
        this.rpm = 0;
        this.running = false;
        this.task = repeat().do(() => {
            _this._detect_loop();
        });
        this.refresh();
        client.on('connect', () => {
            this.client = client
        })
        smartfan.set_iter(5);
        smartfan.set_idleness(10);
        smartfan.set_theta(Math.PI / 4.0);
        //console.log(`smartfan: ${smartfan.power_up()}`);
    }

    getjson() {
        return {
            power: this.power,
            mode: this.mode,
            rpm: this.rpm,
        }
    }

    refresh() { // update status
        //TODO: Do some stuff
    }

    setPower(value) { // on off
        if (typeof value === "boolean") {
            this.power = value; // true false

            if (this.power) {
                this._start_loop();
            } else {
                debug(`smartfan power_off(): ${smartfan.power_off()}`);
                this.running = false;
            }

            console.log(`Power Value: ${this.power}`)
            if (this.client) this.client.publish('fan/power', (this.power ? 1 : 0).toString())
            else console.log("mqtt is not ready")
        }
    }

    setMode(value) { // set
        if (typeof value === "number") {
            this.mode = value; // 0 1 2
            //TODO: Do some stuff
            console.log(`Mode: ${this.mode}`)
            if (this.client) this.client.publish('fan/mode', this.mode.toString())
            else console.log("mqtt is not ready")
        }
    }

    setRPM(value) {
        if (typeof value === "number") {
            this.rpm = value; // mode of rpm, 0 1 2
            //TODO: Do some stuff
            console.log(`Mode of RPM: ${this.rpm}`)
            if (this.client) this.client.publish('fan/rpm', this.rpm.toString())
            else console.log("mqtt is not ready")
        }
    }

    _start_loop() {
        let success = smartfan.power_up();
        debug(`smartfan power_up(): ${success}`);
        if (!success) {
            return;
        }
        this.running = true;
        this.task.every(3000);
    }

    _stop_loop() {
        debug(`smartfan power_off(): ${smartfan.power_off()}`);
        this.running = false;
        this.task.cancel();
    }

    _detect_loop() {
        debug("loop run...");
        let outTheta = ref.alloc('double');
        let status = smartfan.state(outTheta);
        debug(`status: ${status}`);
        if (status == 0) {
            //fan off
        } else if (status == 1) {
            //fan on
        } else if (status == 2) {
            //rotate
        } else if (status == 3) {
            //nothing
        }
    }
}

module.exports = Fan;