import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AfishaService } from '../services/afisha.service';
import { TheatricalEvent } from '../models/theatricalevent';
import { ScheduledEvent } from '../models/scheduledevent';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-afisha',
    templateUrl: './afisha.component.html',
    styleUrls: ['./afisha.component.css'],
    providers: [AfishaService, DatePipe]
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

    hoveredDate: NgbDate;
    fromDate: NgbDate;
    toDate: NgbDate;

    filter: any = {};

    constructor(private dataService: AfishaService,
        private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, public datepipe: DatePipe)
    {
    }

    ngOnInit() {
        this.loadTheatricalEvents();
    }

    loadTheatricalEvents() {
        this.dataService.getTheatricalEvents(this.filter)
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

    filterAfisha() {
        var fromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
        var toDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
        this.filter = {
            "fromDate": this.datepipe.transform(fromDate, "yyyy'-'MM'-'dd'T'HH':'mm':'ssZ"),
            "toDate": this.datepipe.transform(toDate, "yyyy'-'MM'-'dd'T'HH':'mm':'ssZ")
        };
        this.loadTheatricalEvents();
    }

    cancelfilterAfisha() {
        this.fromDate = this.toDate = undefined;
        this.filter = {};
        this.loadTheatricalEvents();
    }

    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && (date.after(this.fromDate) || date.equals(this.fromDate))) {
            this.toDate = date;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
    }

    isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
        return date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
        return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
    }

    validateInput(currentValue: NgbDate, input: string): NgbDate {
        const parsed = this.formatter.parse(input);
        return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }
}
