import { TheatricalEvent } from "./theatricalevent";

export class ScheduledEvent {
    constructor(
        public id?: number,
        public theatricalEvent?: TheatricalEvent,
        public dates?: Date[]
    ) { }
}
