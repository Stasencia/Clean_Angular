import { Component, OnInit } from '@angular/core';
import { AfishaService } from '../services/afisha.service';
import { TheatricalEvent } from '../models/theatricalevent';
import { ScheduledEvent } from '../models/scheduledevent';

@Component({
    selector: 'app-afisha',
    templateUrl: './afisha.component.html',
    styleUrls: ['./afisha.component.css'],
    providers: [AfishaService]
})
export class AfishaComponent implements OnInit {

    theatricalevent: TheatricalEvent;
    theatricalevents: TheatricalEvent[];
    pageOfTheatricalevents: TheatricalEvent[];

    scheduledevent: ScheduledEvent;
    scheduledevents: ScheduledEvent[];
    pageOfScheduledevents: ScheduledEvent[];
    tableMode: boolean = true;
    dates: Date = new Date();

    constructor(private dataService: AfishaService) { }

    ngOnInit() {
        this.loadTheatricalEvents();
    }

    loadTheatricalEvents() {
        this.dataService.getTheatricalEvents()
            .subscribe((data: ScheduledEvent[]) => this.scheduledevents = data);
    }

    onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfScheduledevents = pageOfItems;
       // this.pageOfTheatricalevents = pageOfItems;
    }
    getDates(te: ScheduledEvent) {
        var dates = te.dates.sort();
        var minDate = new Date(dates[0]);
        var maxDate = new Date(dates[dates.length - 1]);
        return { minDate, maxDate };
    }

}
