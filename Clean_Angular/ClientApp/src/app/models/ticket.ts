import { ScheduledEvent } from "./scheduledevent";

export class Ticket {
    constructor(
        public id?: number,
        public theatricalEvent?: ScheduledEvent,
        public dates?: Date[]
    ) { }
}
