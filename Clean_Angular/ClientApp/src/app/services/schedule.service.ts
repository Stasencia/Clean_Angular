import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScheduledEvent } from '../models/scheduledevent';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

    private url = "/api/admin-afisha/schedule";

    constructor(private http: HttpClient) { }

    getScheduledEvent(id: number) {
        return this.http.get(this.url + '/' + id);
    }

    createScheduledEvent(scheduledevent: ScheduledEvent) {
        return this.http.post(this.url, scheduledevent);
    }
    updateScheduledEvent(scheduledevent: ScheduledEvent) {

        return this.http.put(this.url + '/' + scheduledevent.id, scheduledevent);
    }
    deleteScheduledEvent(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
}
