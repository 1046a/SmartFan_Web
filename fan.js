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

    refresh() {
        //TODO: Do some stuff
    }

    setPower(value) {
        if (value instanceof Boolean) {
            this.power = value;
            //TODO: Do some stuff
        }
    }

    setMode(value) {
        if (value instanceof Number) {
            this.mode = value;
            //TODO: Do some stuff
        }
    }

    setRPM(value) {
        if (value instanceof Number) {
            this.rpm = value;
            //TODO: Do some stuff
        }
    }
}

module.exports = Fan;