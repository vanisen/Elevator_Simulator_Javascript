export default class Door {
    // Initializing the Door
    constructor(elevator, EventSignal) {
        this._state = Door.STATE.CLOSED; // default closed
        this._elevator = elevator; // Elevator reference
        this._eventSignal = EventSignal; // EventSignal reference
    }

    /*---GETTER Methods---*/
    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }
    /*---//GETTER Methods---*/

    /*---Door Methods---*/
    open() {
        this.state = Door.STATE.OPENING;
        setTimeout(() => {
            this.state = Door.STATE.OPENED;
            this._eventSignal.trigger('DOOR-OPENED', this._elevator); //send the signal
            this._elevator.state = this._elevator.constructor.STATE.IDLE;
        }, 500); // 
    }

    close() {
        this.state = Door.STATE.CLOSING;
        setTimeout(() => {
            this.state = Door.STATE.CLOSED;
            this._eventSignal.trigger('DOOR-CLOSED', this._elevator); //send the signal
        }, 1000); // closing the door in 1 second
    }
    /*---//Door Methods---*/
}

// Elevator Door Status
Door.STATE = {
    "OPENING": 2,
    "OPENED": 1,
    "CLOSING": 4,
    "CLOSED": 3
}

// Elevator Door Keys
Door.KEY = {
    "OPEN": "OPEN",
    "CLOSE": "CLOSE"
}