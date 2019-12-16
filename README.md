# Elevator_Simulation

## Programming Challenge Tasks/Implementation

## Initialize the elevator simulation with the desired number of elevators, and the desired number of floors. Assume ground/min of 1.
* init.js: line-5 & line-7: javascript prompt input window will ask for the number of elevators and desired number floors
* init.js: line-102: render the ui on the screen with the desired number of elevators and floors

## Each elevator will report as it moves from floor to floor.
* entity/Elevator.js: line-152: triggering the event "ELEVATOR-REACHED-NEXT-FLOOR"
* init.js: line-130: listing the event "ELEVATOR-REACHED-NEXT-FLOOR" and changing the elevator color and showing elevator keys

## Each elevator will report when it opens or closes its doors.
* entity/Door.js: line-23 & line-32: triggering the events "DOOR-OPENED" and "DOOR-CLOSED"
* init.js: line-124 & line-129: listening on the events "DOOR-OPENED" and "DOOR-CLOSED"

## An elevator cannot proceed above the top floor.
* entity/Elevator.js: line-103: checking for the valid floor

## An elevator cannot proceed below the ground floor (assume 1 as the min)
* entity/Elevator.js: line-103: checking for the valid floor

## An elevator request can be made at any floor, to go to any other floor.
* entity/Elevator.js: line-103: checking for the valid floor

## When an elevator request is made, the unoccupied elevator closest to it will answer the call, unless an occupied elevator is moving and will pass that floor on its way. The exception is that if an unoccupied elevator is already stopped at that floor, then it will always have the highest priority answering that call.
* init.js: line-15: calling schedular function

## The elevator should keep track of how many trips it has made, and how many floors it has passed. The elevator should go into maintenance mode after 100 trips, and stop functioning until serviced, therefore not be available for elevator calls.
* entity/Elevator.js: line-163: adding the trip object in trips array

## Technoligies Used
* Javascript
* Html5
* Css3

## Salient Features
* ES6/ES7 features implemented like class, arrow functiona, set, and spread operator etc.
* EventTarget class has been implemented for event/signal based system integration.
* Taken the classes name as real world entity like Elevator, Door, Fan, Light, etc.
* UI has been implemented for clear view.

## How To Run the Application
* run index.html in any server environment
