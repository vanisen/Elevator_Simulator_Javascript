export default (function() {
    const _eventTarget = new EventTarget();
    const EventSignal = {
        on: (eventType, callback, ) => { // To Register an Event
            _eventTarget.addEventListener(eventType, (e) => {
                callback(e);
            })
        },
        trigger: (eventType, detail) => { // To Dispatch an Event
            const event = new CustomEvent(eventType, {detail});
            _eventTarget.dispatchEvent(event)
        }
    }
    return EventSignal;
})();