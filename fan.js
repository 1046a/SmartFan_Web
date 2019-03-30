const ffi = require('ffi');
const debug = require('debug')('SmartFan_Web:fan');

const smartfan = ffi.Library(__dirname + '/libsmartfan', {
    'power_up': ['bool', []],
    'power_off': ['bool', []],
    'detect': ['int', ['int']],
})

class Fan {
    constructor() {
        this.power = false;
        this.mode = 0;
        this.rpm = 0;
        this.refresh();
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
                debug(`smartfan power_up(): ${smartfan.power_up()}`);
            } else {
                debug(`smartfan power_off(): ${smartfan.power_off()}`);
            }

            console.log(`Power Value: ${this.power}`)

        }
    }

    setMode(value) { // set
        if (typeof value === "number") {
            this.mode = value; // 0 1 2
            //TODO: Do some stuff
            console.log(`Mode: ${this.mode}`)
        }
    }

    setRPM(value) {
        if (typeof value === "number") {
            this.rpm = value; // mode of rpm, 0 1 2
            //TODO: Do some stuff
            console.log(`Mode of RPM: ${this.rpm}`)
        }
    }
}

module.exports = Fan;