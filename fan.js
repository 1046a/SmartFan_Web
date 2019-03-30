class Fan {
    constructor(client) {
        this.power = false;
        this.mode = 0;
        this.rpm = 0;
        this.refresh();
        client.on('connect', () => {
            this.client = client
        })
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
            //TODO: Do some stuff
            console.log(`Power Value: ${this.power}`)
            if (this.client) this.client.publish('mqtt/fan', (this.power ? 1 : 0).toString())
            else console.log("mqtt is not ready")
        }
    }

    setMode(value) { // set 
        if (typeof value === "number") {
            this.mode = value; // 0 1 2
            //TODO: Do some stuff
            console.log(`Mode: ${this.mode}`)
            if (this.client) this.client.publish('mqtt/fan', this.mode.toString())
            else console.log("mqtt is not ready")
        }
    }

    setRPM(value) {
        if (typeof value === "number") {
            this.rpm = value; // mode of rpm, 0 1 2
            //TODO: Do some stuff
            console.log(`Mode of RPM: ${this.rpm}`)
            if (this.client) this.client.publish('mqtt/fan', this.rpm.toString())
            else console.log("mqtt is not ready")
        }
    }
}

module.exports = Fan;