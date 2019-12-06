import { ScheduledEvent } from "./scheduledevent";

export class Ticket {
    constructor(
        public id?: number,
        public scheduledEvent?: ScheduledEvent
    ) { }
}
