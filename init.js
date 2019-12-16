// Add depencies
import ElevatorSystem from './system/Elevator-System.js';

// Ask for count of elevators to be implemented
const elevators = prompt('ELEVATOR SIMULATOR - Initialization\n\nPlease enter no of elevators to be implemented') || 1; //default 1
// Ask for count of floors to service
const floors = prompt('ELEVATOR SIMULATOR - Initialization\n\nPlease enter number of floors to service') || 5; // default 5

// Initialize the Elevator System
const es = new ElevatorSystem(elevators,floors);


// REQUEST KEYS CLICK HANDLER
window.requestKeysHandler = (key, floor) => {
    es.scheduleFloorRequest(key, floor);
}

// DOOR KEYS CLICK HANDLER52
window.doorKeysHandler = (index, floor, key, elevator) => {
    switch(key) {
        case "OPEN":
            es.elevators[index].door.open();
            break;
        case "CLOSE":
            es.elevators[index].door.close();
            break;
        default:
            console.log('INVALID DOOR ACTION');
    }
}

// FLOOR KEY CLICK HANDLER
window.floorKeysHandler = (elevatorIndex, currentFloor, requestedFor) => {
    es.elevators[elevatorIndex].floorRequest(currentFloor, requestedFor);
}


// Floor Keys (0-9 or higher) HTML - Available inside the Elevator
const getFloorKeys = (elevator, floor, index) => {
    let floorKeysHtml = '';
    elevator.floorKeys.forEach(key => {
        floorKeysHtml += `<input type="button" value="${key}" onclick="floorKeysHandler('${index}', '${floor}', '${key}')" />`;
    });
    return floorKeysHtml;
}

// Door Keys (Open, Close) HTML - Available inside the Elevator
const getDoorKeys = (elevator, floor, index) => {
    let doorKeysHtml = '';
    elevator.doorKeys.forEach(key => {
        doorKeysHtml += `<input type="button" value="${key}" onclick="doorKeysHandler('${index}', '${floor}', '${key}')" />`;
    });
    return doorKeysHtml;
}

// Request Keys (Up, Down) - Available in the Elevator Lobby
const getRequestKeys = (floor, topFloor) => {
    let requestKeysHtml = '';
    if (floor != topFloor)
        requestKeysHtml += `<button onclick="requestKeysHandler('Up','${floor}')"><i class="fa fa-arrow-up fa-2x" aria-hidden="true"></i></button>`;
    if (floor != 0)
        requestKeysHtml += `<button onclick="requestKeysHandler('Down','${floor}')"><i class="fa fa-arrow-down fa-2x" aria-hidden="true"></i></button>`;
    return requestKeysHtml;
}

// Floor HTML
const getFloorHtml = (elevator, floors) => {
    let floorHtml = '';
    const topFloor = floors.length-1;
    floors.forEach((floor, index) => {
        floorHtml += `<div class="floor ${floor == elevator.floor?'active-floor':''}">
            <div class="wall indicator-panel">
                <i class="fa fa-arrow-up ${elevator.state == 1 || (elevator.state == 0 && elevator.floor == 0)?'fa-orange':''}" aria-hidden="true"></i>
                <i class="fa fa-arrow-down ${elevator.state == -1 || (elevator.state == 0 && elevator.floor == topFloor)?'fa-orange':''}" aria-hidden="true"></i>
                Floor-${floor==0?'G':floor}
            </div>
            <div class="elevator-container">
                <div class="wall left-panel ${floor == elevator.floor?'active':''}">
                    <div class="floor-keys">
                        ${getFloorKeys(elevator, floor, elevator.id-1)}
                    </div>
                    <br />
                    <div class="door-keys">
                        ${getDoorKeys(elevator, floor, elevator.id-1)}
                    </div>
                </div>
                <div class="elevator ${floor == elevator.floor?'active':''}">
                    <div>Elevator</div>
                </div>
                <div class="wall request-panel">
                    <div class="buttons">
                        ${getRequestKeys(floor, topFloor)}
                    </div>
                </div>
            </div>
        </div>`;
    });
    return floorHtml;
}

// Elevators HTML
const getElevatorsHtml = (elevators) => {
    let elevatorsHtml = '';
    elevators.forEach(elevator => {
        elevatorsHtml += `<div class="elevator-container">
            <div class="elevator-title"><h3>Elevator-${elevator.id} - ${elevator.mode ==1 ? 'IN SERVICE': 'OUT OF SERVICE'}</h3></div>
            ${getFloorHtml(elevator, es.floors)}
        </div>`;
    });
    return elevatorsHtml;
}


/*---render HTML---*/
const esElement = document.querySelector('.elevator-system');
const render = (esElement, elevators) => {
    esElement.innerHTML = getElevatorsHtml(elevators);
}
render(esElement, es.elevators); // INITIAL RENDER
/*---//render HTML---*/


/*--- EVENT/Signal Handlers---*/
es.eventSignal.on('DOOR-OPENED', e => {
    //const elevator = e.detail;
});

/*--- EVENT/Signal Handlers---*/
es.eventSignal.on('DOOR-CLOSED', e => {
    const elevator = e.detail;

    elevator.dispatch(elevator.floor);    
});

es.eventSignal.on('ELEVATOR-REACHED-NEXT-FLOOR', e => {
    //const elevator = e.detail;
    render(esElement, es.elevators);
})

es.eventSignal.on('ELEVATOR-TRIP-COMPLETED', e => {
    const elevator = e.detail;
    if (elevator.trips.length == 100) {
        elevator.mode = 0; // set Maintenance MODE
    }
    render(esElement, es.elevators);
    
    console.log(`Elevator-${elevator.id}: Total Trips Completed so far by : => ${elevator.trips.length}`);
});

es.eventSignal.on('ELEVATOR-STATE-CHANGED', e => {
     //const elevator = e.detail;
    render(esElement, es.elevators);
});

es.eventSignal.on('ELEVATOR-MODE-CHANGED', e => {
    //const elevator = e.detail;
   render(esElement, es.elevators);
});
/*--- EVENT/Signal Handlers---*/