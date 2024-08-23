type EventCallback = (...args: any[]) => void;

export class EventManager {
    private events: { [key: string]: EventCallback[] } = {};

    /**
     * Registers an event listener for a specific event.
     * @param eventName - The name of the event to listen for.
     * @param callback - The callback function to be executed when the event is emitted.
     */
    public on(eventName: string, callback: EventCallback): void {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    /**
     * Removes an event listener for a specific event.
     * @param eventName - The name of the event to remove the listener from.
     * @param callback - The callback function to remove.
     */
    public off(eventName: string, callback: EventCallback): void {
        if (!this.events[eventName]) return;

        this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }

    /**
     * Emits an event, triggering all registered listeners for that event.
     * @param eventName - The name of the event to emit.
     * @param args - Any arguments to pass to the event listeners.
     */
    public emit(eventName: string, ...args: any[]): void {
        if (!this.events[eventName]) return;

        this.events[eventName].forEach(callback => callback(...args));
    }

    /**
     * Removes all listeners for a specific event or all events.
     * @param eventName - (Optional) The name of the event to remove listeners from. 
     *                    If not provided, all listeners for all events will be removed.
     */
    public clear(eventName?: string): void {
        if (eventName) {
            delete this.events[eventName];
        } else {
            this.events = {};
        }
    }
}
