// Add dependencies
import Door from "./Door.js";
import Trip from "./Trip.js";

// Add accessories dependencies
// Fan
// Music
// CCTV
// Light

export default class Elevator {
	// Initializing the Elevator
    constructor(floorsCount=5, state=0, mode=1, EventSignal) {
        this._id = ++Elevator.ID; // Generate Elevator ID starting from 1
        this._floorsCount = floorsCount; // default => 5
        this._state = state; // default => IDLE
        this._mode = mode; // default => ACTIVE
        this._direction = Elevator.DIRECTION.UP; // default UP
        this._floor = 0; // default Ground Floor
        this._eventSignal = EventSignal; // EventSignal reference
        this._floorRequestPriorityQueue = []; // Priority queue for requested floors

        // INITIALIZE DOOR
        this._door = new Door(this, EventSignal);
        
        // Initialize Door Keys - Available inseide the Elevator
        this._doorKeys = [];       
        Object.keys(Door.KEY).forEach(key => this._doorKeys.push(key));

        // Initialize floor keys - Available inside the Elevator
        this._floorKeys = [];
        for(let i=0; i<this.floorsCount; i++)
            this._floorKeys.push(i);

        // Initialize trips
        this._trips = [];
    }

    /*---GETTER & SETTER Methods---*/
    get floorsCount() {
        return this._floorsCount;
    }

    get floor() {
        return this._floor;
    }

    set floor(floor) {
        if (floor < this.floorsCount)
            this._floor = floor;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;
        this._eventSignal.trigger('ELEVATOR-STATE-CHANGED', this);
    }

    get mode() {
        return this._mode;
    }

    set mode(mode) {
        this._mode = mode;
        this._eventSignal.trigger('ELEVATOR-MODE-CHANGED', this);
    }

    get doorKeys() {
        return this._doorKeys;
    }

    get floorKeys() {
        return this._floorKeys;
    }
    get id() {
        return this._id;
    }

    get door() {
        return this._door;
    }

    get direction() {
        return this._direction;
    }

    set direction(direction) {
        this._direction = direction;
    }

    get trips() {
        return this._trips;
    }
	
	/*---//GETTER & SETTER Methods---*/

    /*---Elevator Methods---*/
	// Trigger when required emergency STOP
    emergencyStop() {
        // send the emergency stop signal
    }
    /*---//Elevator Methods---*/

    // Play the beep sound
    beep() {
        // start beep
    }

    // Stop the been sound
    stopBeep() {
        // stop beep
    }

    // To resume the service when it is in the maintenance mode
    resumeService() {
        this._trips = [];
        this.mode = Elevator.MODE.ACTIVE;
    }
	/*---Elevator Methods---*/
}
Elevator.ID = 0;
Elevator.STATE = {
    "IDLE": 0,
    "GOING_DOWN": -1,
    "GOING_UP": 1,
};
Elevator.MODE = {
    "ACTIVE": 1,
    "MAINTENANCE": 0,
};

Elevator.DIRECTION = {
    "UP": 1,
    "DOWN": 0,
    "NONE": -1
};