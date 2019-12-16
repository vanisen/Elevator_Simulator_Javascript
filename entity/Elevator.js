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
    // Accept the request for floor
    floorRequest(currentFloor, requestedFor) {
        if (this.mode == Elevator.MODE.ACTIVE) { // check Elevator is Active
            if (requestedFor >= 0 && requestedFor<= this.floorsCount-1) { // check requested for valid floor
                if (requestedFor != this.floor) { // check if requested for the same floor
                    if (this.state == Elevator.STATE.IDLE) { // check Elevator is IDLE
                        this._floorRequestPriorityQueue.push(requestedFor);
                        this._floorRequestPriorityQueue = [... new Set(this._floorRequestPriorityQueue)]; // Remove Duplicate

                        if (this._direction == Elevator.DIRECTION.DOWN) {// check if Elevator is set to DOWN Direction
                            this._floorRequestPriorityQueue.sort();
                            this._floorRequestPriorityQueue.reverse(); // Sort the Targets
                        } else {
                            this._floorRequestPriorityQueue.sort(); // Sort the Targets
                        }
                    } else {
                        // push in the queue based on priority
                    }
                } else {
                    console.log(`Elevator-${this.id} already on the requested floor ${requestedFor}`);
                }
            } else {
                console.log(`Elevator-${this.id} invalid floor requested`);
            }
        } else {
            console.log(`Elevator-${this.id} is under the maintenance!`);
        }
        console.log(this._floorRequestPriorityQueue);
        console.log('state: '+this.state);
        console.log('direction: '+this._direction);
    }
    // dispatch the Elevator
    dispatch(fromFloor) {
        if (this._floorRequestPriorityQueue.length) {
            if (this._direction == Elevator.DIRECTION.UP) {
                this.state = Elevator.STATE.GOING_UP;
            } else {
                this.state = Elevator.STATE.GOING_DOWN;
            }
            this._eventSignal.trigger('ELEVATOR-DISPATCHED', this);
            
            setTimeout(() => {
                if (this.state == Elevator.STATE.GOING_UP) {
                    this._floor++;
                } else {
                    this._floor--;
                }

                if (this._floorRequestPriorityQueue[0] == this.floor) {
                    this._floorRequestPriorityQueue.splice(0, 1);
                    this.tripCompleted(fromFloor, this.floor);
                } else {
                    this._eventSignal.trigger('ELEVATOR-REACHED-NEXT-FLOOR', this); //send the signal
                    this.dispatch(fromFloor); // dispatch to next floor
                }
            },500); // go to target floor in 3 seconds
        } else {
            this.state = Elevator.STATE.IDLE;
        }
    }

    // Trigger when trip completed
    tripCompleted(fromFloor, toFloor) {
        this._trips.push(new Trip(fromFloor, toFloor));
        this._eventSignal.trigger('ELEVATOR-TRIP-COMPLETED', this); // Send the trip completed signal

        if (this._floorRequestPriorityQueue.length) {
            this.dispatch(this.floor);
        } else {
            this.state = Elevator.STATE.IDLE;
            //console.log(this.floor+'  ==> '+this.floorsCount-1);
            if (this.floor == this.floorsCount-1) {
                this._direction = Elevator.DIRECTION.DOWN;
            } else if (this.floor == 0) {
                this._direction = Elevator.DIRECTION.UP;
            }
        }
    }

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