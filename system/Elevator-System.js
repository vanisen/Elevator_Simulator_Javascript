// Add depencies classes
import Elevator from '../entity/Elevator.js'; // for Elevator Entity
import EventSignal from './integration/Event-Signal.js'; // // for System Integration

export default class ElevatorSystem {

    // Elevator System Initialization
    constructor(elevatorsCount=1, floorsCount=5) {
        this._elevatorsCount = elevatorsCount; //default 1
        this._floorsCount = floorsCount //default 5 
        this._eventSignal = EventSignal; // event signal

        // initialize elevators
        this._elevators = [];
        for(let i = 0; i<this.elevatorsCount; i++)
            this._elevators.push(new Elevator(this.floorsCount, Elevator.STATE.IDLE, Elevator.MODE.ACTIVE, this._eventSignal));

        // initialize floors
        this.floors = [];
        for(let i = this.floorsCount-1; i >= 0; i--)
            this.floors.push(i);
    }

    /*--- GETTER methods---*/
    // get elevators count
    get elevatorsCount() {
        return this._elevatorsCount;
    }
    // get integrated elevators
    get elevators() {
        return this._elevators;
    }
    // get integrated floors count2
    get floorsCount() {
        return this._floorsCount;
    }
    // get eventSignal reference
    get eventSignal() {
        return this._eventSignal;
    }

    /*---Elevator System Methods---*/
    scheduleFloorRequest(direction, onFloor) {
        const elevator = this._findClosestElevator();
        elevator.direction = direction; // set the Elevator Direction 
        elevator.floorRequest(onFloor, onFloor); // set the floor in queue
    }

    _findClosestElevator() {
        // algorithm to find the closest elevator and the reference of it
        
        //return <<closest elevator reference;
    }
}
ElevatorSystem.count = 0; // default 0