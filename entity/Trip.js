export default class Trip {
    constructor(fromFloor, toFloor) {
        this.date = new Date();
        this._fromFloor = fromFloor;
        this._toFloor = toFloor;
    }
}