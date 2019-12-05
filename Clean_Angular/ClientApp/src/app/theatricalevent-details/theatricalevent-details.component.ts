import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AfishaService } from '../services/afisha.service';
import { ScheduledEvent } from '../models/scheduledevent';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-theatricalevent-details',
  templateUrl: './theatricalevent-details.component.html',
  styleUrls: ['./theatricalevent-details.component.css']
})
export class TheatricaleventDetailsComponent implements OnInit {

    scheduledevent: ScheduledEvent;
    event = {
        id: 0,
    };
    datesSelected: NgbDateStruct[] = [];

    constructor(private dataService: AfishaService, private route: ActivatedRoute, private router: Router, private calendar: NgbCalendar) {
        route.params.subscribe(p => {
            this.event.id = +p['id'];
        }, err => {
            if (err.status == 404)
                this.router.navigate(['/afisha']);
        });
    }

    isDisabled = (date: NgbDate, current: { month: number }) => date.month !== current.month;
    isWeekend = (date: NgbDate) => this.datesSelected.includes({ year: date.year, month: date.month, day: date.day });
    isDateSelected(date: NgbDateStruct) {
        return (this.datesSelected.findIndex(f => f.day == date.day && f.month == date.month && f.year == date.year) >= 0);
    }
        /*function (date) {
        this.dateSelected.forEach(element => {
            if (element == date)
                return true;
            else
                return false;
        });
    };*/
        //this.datesSelected.includes({ year: date.year, month: date.month, day: date.day });

    ngOnInit() {
        this.loadTheatricalEvent(this.event.id);
    }

    loadTheatricalEvent(id: number) {
        this.dataService.getTheatricalEvent(id)
          .subscribe((data: ScheduledEvent) => {
              this.scheduledevent = data;
              if (data.dates) {

                  this.datesSelected = data.dates.map(function (x) {
                      x = new Date(x);
                      return { year: x.getFullYear(), month: x.getMonth() + 1, day: x.getDate() }
                  });
              }
          });
    }

}
